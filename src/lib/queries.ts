import { queryOptions } from "@tanstack/react-query";
import { listSiteImages, listPublishedTours, getTourBySlug, listContactMessages, listAllTours } from "@/lib/api/cms.functions";

export const siteImagesQuery = queryOptions({
  queryKey: ["site-images"],
  queryFn: () => listSiteImages(),
  staleTime: 60_000,
});

export const publishedToursQuery = queryOptions({
  queryKey: ["published-tours"],
  queryFn: () => listPublishedTours(),
  staleTime: 60_000,
});

export const tourBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["tour", slug],
    queryFn: () => getTourBySlug({ data: { slug } }),
    staleTime: 60_000,
  });

export const adminContactMessagesQuery = queryOptions({
  queryKey: ["admin-contact-messages"],
  queryFn: () => listContactMessages(),
});

export const adminAllToursQuery = queryOptions({
  queryKey: ["admin-all-tours"],
  queryFn: () => listAllTours(),
});
