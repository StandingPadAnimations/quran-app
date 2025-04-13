/*
Copyright (C) 2025 Mahid Sheikh

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { LanguageOptions, VerseResponse } from "./api.js";
import { updateURL } from "./url.js";
import { getChapterIntro, getVerses } from "./api.js";
import { chapterLength, languageToName } from "./constants.js";

const activeLanguages: LanguageOptions = {
  en: true,
  zk: true,
  f: 1,
  hover: 0,
};

function buildChapterIntro(intro, chapter: number, verseBase: number, verseEnd: number, countBismi: boolean) {
  const chapterBody = document.getElementById("chapter-body");
  
  // Clear out old data
  chapterBody.innerHTML = '';

  const introFragment = document.createDocumentFragment();
  const chapterName = document.createElement("div");
  chapterName.textContent = `Chapter ${chapter}: ${intro["chapter_name"]}`;
  chapterName.className = "text-4xl mb-2"
  introFragment.appendChild(chapterName);

  const chapterVerseRange = document.createElement("div");
  chapterVerseRange.id = "chapterVerseRange";
  chapterVerseRange.textContent = `Verses ${verseBase}-${verseEnd <= chapterLength(chapter, countBismi) ? verseEnd : chapterLength(chapter, countBismi)}`;
  chapterVerseRange.className = "text-3xl mb-2";
  introFragment.appendChild(chapterVerseRange);

  const introDiv = document.createElement("details");
  introDiv.innerHTML = DOMPurify.sanitize("<summary>Chapter Details</summary>" + intro["intro_en"], { USE_PROFILES: { html: true } });
  introFragment.appendChild(introDiv);
  chapterBody?.appendChild(introFragment);
}

function buildVerses(verses: VerseResponse, arabicFontSize: string, transFontSize: string, countBismi: boolean) {
  const verseBody = document.getElementById("verse-body");

  // Clear old content
  verseBody.innerHTML = '';

  const verseFragment = document.createDocumentFragment();
  Object.values(verses).forEach((verse) => {
    const div = document.createElement("div");
    div.className = `verse-${!countBismi ? verse.v_ : verse.v} m-3`;

    // Arabic verses
    const arabicElement = document.createElement("p");
    arabicElement.textContent = verse.ar;
    arabicElement.className = `arabic-verse text-${arabicFontSize} font-arabic leading-loose text-right`
    arabicElement.setAttribute("dir", "rtl");
    div.appendChild(arabicElement);
  
    // Translations
    Object.entries(activeLanguages).forEach(([lang, isEnabled]) => {
      if (lang === "f" || lang === "hover" || !isEnabled) return;
      if (verse[lang]) {
        const transElement = document.createElement("p");
        transElement.innerHTML = DOMPurify.sanitize(verse[lang] + "<br/>" + `<div class="text-text-secondary dark:text-dark-text-secondary">${languageToName[lang]}</div>`, { USE_PROFILES: { html: true } });
        transElement.className = `trans-verse text-left text-${transFontSize} font-hyperlegible mb-5`;
        div.appendChild(transElement);
      }
    });

    const horizontalLine = document.createElement("hr")
    horizontalLine.className = "m-10 border-text-secondary dark:border-dark-text-secondary"
    verseFragment.appendChild(div);
    verseFragment.appendChild(horizontalLine)
  });
  
  verseBody?.appendChild(verseFragment);
}

export async function buildPage(chapter: number, verseBase: number, verseEnd: number, arabicFontSize: string, transFontSize: string, countBismi: boolean) {
  updateURL(chapter, verseBase, verseEnd, countBismi);

  const [intro, verses] = await Promise.all([
    getChapterIntro(chapter),
    getVerses(chapter, verseBase, (verseEnd <= chapterLength(chapter, countBismi) ? verseEnd : chapterLength(chapter, countBismi)), activeLanguages),
  ])

  buildChapterIntro(intro, chapter, verseBase, verseEnd, countBismi);
  buildVerses(verses.reduce((acc, val) => acc.concat(val), []), arabicFontSize, transFontSize, countBismi);
}

export async function rebuildVerses(chapter: number, verseBase: number, verseEnd: number, arabicFontSize: string, transFontSize: string, countBismi: boolean) {
  updateURL(chapter, verseBase, verseEnd, countBismi);
  
  const chapterVerseRange = document.getElementById("chapterVerseRange");
  chapterVerseRange.textContent = `Verses ${verseBase}-${verseEnd <= chapterLength(chapter, countBismi) ? verseEnd : chapterLength(chapter, countBismi)}`;
  
  const verses = await getVerses(chapter, verseBase, (verseEnd <= chapterLength(chapter, countBismi) ? verseEnd : chapterLength(chapter, countBismi)), activeLanguages);
  buildVerses(verses.reduce((acc, val) => acc.concat(val), []), arabicFontSize, transFontSize, countBismi);
}
