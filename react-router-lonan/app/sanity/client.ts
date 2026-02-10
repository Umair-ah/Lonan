import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "k9rryuyc",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});