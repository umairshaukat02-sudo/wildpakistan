
-- 1) Tighten inquiries INSERT policy: anon/authenticated cannot set costs, status, or admin_notes
DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.inquiries;

CREATE POLICY "Anyone can submit inquiry"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(COALESCE(customer_name, '')) BETWEEN 1 AND 200
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

-- 2) Revoke any write access to user_roles from client roles to prevent privilege escalation.
-- The has_role() SECURITY DEFINER function and supabaseAdmin (service_role) still work.
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated, PUBLIC;
GRANT ALL ON public.user_roles TO service_role;
