import slugify from "@sindresorhus/slugify";

export function generateSlug(str: string) {
  return slugify(str);
}
