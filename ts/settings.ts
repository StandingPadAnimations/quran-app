export function saveFontSizeSettings(arabicFontSize: string, transFontSize: string) {
  localStorage.setItem("arabicFontSize", arabicFontSize);
  localStorage.setItem("transFontSize", transFontSize);
}

export function getFontSizeSettings(): [string, string] {
  return [localStorage.getItem("arabicFontSize") || "4xl", localStorage.getItem("transFontSize") || "xl"];  
}
