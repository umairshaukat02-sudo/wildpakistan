
DROP POLICY "Anyone can submit inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiry" ON public.inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(coalesce(customer_name, '')) BETWEEN 1 AND 200
    AND length(coalesce(customer_email, '')) BETWEEN 3 AND 255
    AND length(coalesce(destination, '')) BETWEEN 1 AND 100
    AND duration_days BETWEEN 1 AND 60
    AND adults BETWEEN 1 AND 50
    AND children BETWEEN 0 AND 50
  );

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
