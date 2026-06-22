import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  email: z.string().trim().email().max(255),
  source: z.string().max(50).optional(),
});

const orderSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  payment_reference: z.string().trim().min(3).max(100),
  notes: z.string().max(500).optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").insert({
      email: data.email,
      source: data.source ?? "landing",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("orders").insert({
      full_name: data.full_name,
      email: data.email,
      payment_reference: data.payment_reference,
      notes: data.notes ?? null,
      product: "The Online Income Playbook",
      amount_cents: 15000,
      currency: "ZAR",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
