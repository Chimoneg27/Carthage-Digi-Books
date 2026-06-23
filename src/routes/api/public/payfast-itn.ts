import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "crypto";

export const Route = createFileRoute("/api/public/payfast-itn")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        const params = new URLSearchParams(raw);
        const data: Record<string, string> = {};
        params.forEach((v, k) => {
          data[k] = v;
        });

        const received = data.signature;
        delete data.signature;

        const passphrase = process.env.PAYFAST_PASSPHRASE ?? "";
        const mode = (process.env.PAYFAST_MODE ?? "sandbox").toLowerCase();

        // 1. Signature check — rebuild from the same key order PayFast posted.
        const qs = Object.keys(data)
          .map(
            (k) =>
              `${k}=${encodeURIComponent(data[k]).replace(/%20/g, "+")}`,
          )
          .join("&");
        const signString = passphrase
          ? `${qs}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`
          : qs;
        const expected = createHash("md5").update(signString).digest("hex");
        if (expected !== received) {
          return new Response("Invalid signature", { status: 401 });
        }

        // 2. Postback to PayFast to confirm the notification is genuine.
        const validateUrl =
          mode === "live"
            ? "https://www.payfast.co.za/eng/query/validate"
            : "https://sandbox.payfast.co.za/eng/query/validate";
        const verify = await fetch(validateUrl, {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          body: raw,
        });
        const verifyText = (await verify.text()).trim();
        if (verifyText !== "VALID") {
          return new Response("Not valid", { status: 400 });
        }

        // 3. Mark order paid.
        if (data.payment_status === "COMPLETE" && data.m_payment_id) {
          const { supabaseAdmin } = await import(
            "@/integrations/supabase/client.server"
          );
          await supabaseAdmin
            .from("orders")
            .update({ status: "paid", paid_at: new Date().toISOString() })
            .eq("payment_reference", data.m_payment_id);
        }

        return new Response("ok");
      },
    },
  },
});
