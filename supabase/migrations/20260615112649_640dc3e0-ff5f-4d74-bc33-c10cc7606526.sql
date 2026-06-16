DROP POLICY IF EXISTS "anyone can submit contact" ON public.contact_messages;
REVOKE INSERT ON public.contact_messages FROM anon, authenticated;