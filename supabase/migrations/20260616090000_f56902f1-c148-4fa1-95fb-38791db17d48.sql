DROP POLICY IF EXISTS "Owner or admin can view" ON public.inquiries;
CREATE POLICY "Owners can view their own inquiries"
ON public.inquiries
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admin can update" ON public.inquiries;
DROP POLICY IF EXISTS "Admin can delete" ON public.inquiries;

CREATE POLICY "No direct client inquiry updates"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No direct client inquiry deletes"
ON public.inquiries
FOR DELETE
TO authenticated
USING (false);

DROP POLICY IF EXISTS "admin read contact" ON public.contact_messages;
DROP POLICY IF EXISTS "admin update contact" ON public.contact_messages;

CREATE POLICY "No direct client contact reads"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (false);

CREATE POLICY "No direct client contact updates"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "admin manage tours" ON public.tour_packages;
CREATE POLICY "No direct client tour edits"
ON public.tour_packages
FOR INSERT
TO authenticated
WITH CHECK (false);
CREATE POLICY "No direct client tour updates"
ON public.tour_packages
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);
CREATE POLICY "No direct client tour deletes"
ON public.tour_packages
FOR DELETE
TO authenticated
USING (false);

DROP POLICY IF EXISTS "admin manage site_images" ON public.site_images;
CREATE POLICY "No direct client image edits"
ON public.site_images
FOR INSERT
TO authenticated
WITH CHECK (false);
CREATE POLICY "No direct client image updates"
ON public.site_images
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);
CREATE POLICY "No direct client image deletes"
ON public.site_images
FOR DELETE
TO authenticated
USING (false);

REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO service_role;