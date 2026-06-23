import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  email: z.string().trim().email().max(255),
  source: z.string().max(50).optional(),
});

const orderSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
});

const PRICE_ZAR = 150;
const PRODUCT = "The Online Income Playbook";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").insert({
      email: data.email.toLowerCase(),
      source: data.source ?? "landing",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/**
 * Creates a pending order (one per email per product, enforced by unique index)
 * and returns a signed PayFast payload the client posts to PayFast's checkout.
 */
export const startPayfastCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = data.email.toLowerCase();

    // Block duplicate purchases — one book per email.
    const { data: existing } = await supabaseAdmin
      .from("orders")
      .select("id, paid_at, status")
      .eq("email", email)
      .eq("product", PRODUCT)
      .maybeSingle();

    if (existing?.paid_at) {
      throw new Error("This email has already purchased the book. Check your inbox for the download link.");
    }

    const reference = `CDB-${Date.now().toString(36).toUpperCase()}`;

    if (existing) {
      // Reuse the pending order, refresh its reference.
      const { error } = await supabaseAdmin
        .from("orders")
        .update({
          full_name: data.full_name,
          payment_reference: reference,
          status: "pending",
        })
        .eq("id", existing.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("orders").insert({
        full_name: data.full_name,
        email,
        payment_reference: reference,
        product: PRODUCT,
        amount_cents: PRICE_ZAR * 100,
        currency: "ZAR",
        status: "pending",
      });
      if (error) throw new Error(error.message);
    }

    // Also capture as a lead (best-effort, ignore conflicts).
    await supabaseAdmin.from("leads").insert({ email, source: "checkout" });

    const merchantId = process.env.PAYFAST_MERCHANT_ID;
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
    const passphrase = process.env.PAYFAST_PASSPHRASE ?? "";
    const mode = (process.env.PAYFAST_MODE ?? "sandbox").toLowerCase();
    const siteUrl = process.env.SITE_URL ?? "";

    if (!merchantId || !merchantKey) {
      throw new Error(
        "PayFast is not configured yet. Please add your PayFast credentials in project settings.",
      );
    }

    const [first_name, ...rest] = data.full_name.split(" ");
    const last_name = rest.join(" ") || first_name;

    const fields: Record<string, string> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${siteUrl}/?purchase=success`,
      cancel_url: `${siteUrl}/?purchase=cancelled`,
      notify_url: `${siteUrl}/api/public/payfast-itn`,
      name_first: first_name,
      name_last: last_name,
      email_address: email,
      m_payment_id: reference,
      amount: PRICE_ZAR.toFixed(2),
      item_name: PRODUCT,
    };

    // PayFast signature: urlencoded querystring of all non-empty fields in
    // order, with passphrase appended, then md5.
    const md5 = await import("crypto").then((m) => m.createHash("md5"));
    const qs = Object.entries(fields)
      .filter(([, v]) => v !== "")
      .map(
        ([k, v]) =>
          `${k}=${encodeURIComponent(v.trim()).replace(/%20/g, "+")}`,
      )
      .join("&");
    const signString = passphrase
      ? `${qs}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`
      : qs;
    const signature = md5.update(signString).digest("hex");

    const action =
      mode === "live"
        ? "https://www.payfast.co.za/eng/process"
        : "https://sandbox.payfast.co.za/eng/process";

    return { action, fields: { ...fields, signature } };
  });
