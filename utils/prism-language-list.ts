import prismComponents from "../data/prism/components.json";

// Get all language keys except 'meta'
export const PRISM_LANGUAGE_IDS = Object.keys(prismComponents.languages).filter(
  (key) => key !== "meta"
);

const languages = prismComponents.languages as Record<string, { title?: string }>;

// Get display names (title) if present, otherwise fallback to capitalized id
export const PRISM_LANGUAGES = PRISM_LANGUAGE_IDS.map((id) => ({
  id,
  label:
  languages[id]?.title ||
    id.charAt(0).toUpperCase() + id.slice(1),
}));
