/** Listing geography, never the visitor's location. Unknown/mixed areas stay nationwide. */
export function preparationRegion(area: string) {
  const osaka = /大阪|関西|近畿/.test(area);
  const nagoya = /名古屋|愛知|東海/.test(area);
  const nationwide = /全国|各地|不問|オンライン/.test(area);
  const tokyoOnly = /^(?:東京都?(?:内)?|都内|東京・関東近郊|東京近郊|東京中心)$/.test(area.trim());
  return {
    label: nationwide ? "" : osaka && nagoya ? "大阪・名古屋" : osaka ? "大阪" : nagoya ? "名古屋" : "",
    useWacca: tokyoOnly && !osaka && !nagoya && !nationwide
  };
}
