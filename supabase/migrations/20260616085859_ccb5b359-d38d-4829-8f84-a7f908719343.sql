CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;

REVOKE ALL ON public.profiles FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

REVOKE ALL ON public.user_roles FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

REVOKE ALL ON public.inquiries FROM PUBLIC, anon, authenticated;
GRANT INSERT ON public.inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;

REVOKE ALL ON public.contact_messages FROM PUBLIC, anon, authenticated;
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

REVOKE ALL ON public.tour_packages FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.tour_packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_packages TO authenticated;
GRANT ALL ON public.tour_packages TO service_role;

REVOKE ALL ON public.site_images FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.site_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_images TO authenticated;
GRANT ALL ON public.site_images TO service_role;

DROP POLICY IF EXISTS "public read published tours" ON public.tour_packages;
CREATE POLICY "public read published tours"
ON public.tour_packages
FOR SELECT
TO anon, authenticated
USING (published = true);

DROP POLICY IF EXISTS "admin read all tours" ON public.tour_packages;
CREATE POLICY "admin read all tours"
ON public.tour_packages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiry"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (user_id IS NULL OR user_id = auth.uid())
  AND length(COALESCE(customer_name, '')) BETWEEN 1 AND 200
  AND length(COALESCE(customer_email, '')) BETWEEN 3 AND 255
  AND length(COALESCE(destination, '')) BETWEEN 1 AND 100
  AND duration_days BETWEEN 1 AND 60
  AND adults BETWEEN 1 AND 50
  AND children BETWEEN 0 AND 50
  AND COALESCE(base_cost, 0) = 0
  AND COALESCE(accommodation_cost, 0) = 0
  AND COALESCE(transport_cost, 0) = 0
  AND COALESCE(activities_cost, 0) = 0
  AND COALESCE(taxes, 0) = 0
  AND COALESCE(service_charges, 0) = 0
  AND COALESCE(grand_total, 0) = 0
  AND status = 'pending'
  AND admin_notes IS NULL
);