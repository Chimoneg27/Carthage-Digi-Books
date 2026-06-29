DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
DROP POLICY IF EXISTS "Anyone can create an order" ON public.orders;
REVOKE INSERT ON public.leads FROM anon, authenticated;
REVOKE INSERT ON public.orders FROM anon, authenticated;