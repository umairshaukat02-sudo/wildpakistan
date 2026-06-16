GRANT INSERT ON public.contact_messages TO anon, authenticated;

CREATE POLICY "Anyone can submit contact message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(COALESCE(name, '')) BETWEEN 1 AND 150
  AND length(COALESCE(email, '')) BETWEEN 3 AND 255
  AND length(COALESCE(message, '')) BETWEEN 1 AND 4000
  AND (subject IS NULL OR length(subject) <= 200)
);