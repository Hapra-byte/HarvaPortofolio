/**
 * Helper function to get localized text
 * Reduces repetitive ternary operations throughout the codebase
 */
export function getLocalizedText(
  text: { id: string; en: string },
  language: "id" | "en" = "id"
): string {
  return text[language] || text.id;
}