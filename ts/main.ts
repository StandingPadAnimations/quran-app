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

import { readURLParams } from "./url.js";
import { chapterLength, defaultVerseRange, updateVerseRange } from "./constants.js"; 
import { decreaseFontSize, increaseFontSize } from "./customization.js";
import { buildPage, focusVerse, rebuildVerses } from "./build-page.js";

function updateCSE(newChapter: number, newStart: number, verseRange: number, countBismi: boolean): [number, number, number] {
  const chapter = newChapter > 0 ? newChapter : 1;
  const verseBase = newStart > 0 ? newStart : 1;
  const tmpEnd = verseBase + (verseRange - 1);
  const verseEnd = (tmpEnd <= chapterLength(chapter, countBismi)) ? tmpEnd : chapterLength(chapter, countBismi);
  return [chapter, verseBase, verseEnd];
}

let countBismi: boolean = true;
let arabicFontSize: string = "4xl";
let transFontSize: string = "xl";

let [chapter, verseBase, verseEnd, verseRange, focusedVerse] = readURLParams(countBismi);
buildPage(chapter, verseBase, verseEnd, focusedVerse, arabicFontSize, transFontSize, countBismi);

document.querySelectorAll(".nextBtn").forEach((itm) => {
  itm.addEventListener("click", () => {
    verseRange = updateVerseRange();
    if (verseBase + verseRange <= chapterLength(chapter, countBismi)) {
      [chapter, verseBase, verseEnd] = updateCSE(chapter, verseBase+verseRange, verseRange, countBismi);
      rebuildVerses(chapter, verseBase, verseEnd, focusedVerse, arabicFontSize, transFontSize, countBismi);
    } else {
      [chapter, verseBase, verseEnd] = updateCSE(chapter+1, 1, verseRange, countBismi);
      buildPage(chapter, verseBase, verseEnd, focusedVerse, arabicFontSize, transFontSize, countBismi);
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
});

document.querySelectorAll(".prevBtn").forEach((itm) => {
  itm.addEventListener("click", () => {
    verseRange = updateVerseRange();
    if (verseBase === 1) {
      [chapter, verseBase, verseEnd] = updateCSE(chapter-1, verseBase, verseRange, countBismi);
      buildPage(chapter, verseBase, verseEnd, focusedVerse, arabicFontSize, transFontSize, countBismi);
    } else if (verseBase - verseRange >= 1) {
      [chapter, verseBase, verseEnd] = updateCSE(chapter, verseBase-verseRange, verseRange, countBismi);
      rebuildVerses(chapter, verseBase, verseEnd, focusedVerse, arabicFontSize, transFontSize, countBismi);
    } else {
      [chapter, verseBase, verseEnd] = updateCSE(chapter, 1, verseRange, countBismi);
      rebuildVerses(chapter, verseBase, verseEnd, focusedVerse, arabicFontSize, transFontSize, countBismi);
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
});

document.getElementById("arabicFontDecr").addEventListener("click", () => {
  arabicFontSize = decreaseFontSize(arabicFontSize, 'arabic-verse');
});

document.getElementById("arabicFontIncr").addEventListener("click", () => {
  arabicFontSize = increaseFontSize(arabicFontSize, 'arabic-verse');
});

document.getElementById("transFontDecr").addEventListener("click", () => {
  transFontSize = decreaseFontSize(transFontSize, 'trans-verse');
});

document.getElementById("transFontIncr").addEventListener("click", () => {
  transFontSize = increaseFontSize(transFontSize, 'trans-verse');
});

const chapterInput = <HTMLInputElement>document.getElementById("chapter");
const verseInput = <HTMLInputElement>document.getElementById("verse");
const form = <HTMLFormElement>document.getElementById("cv_selection");

form.addEventListener("submit", (e) => CVLoad(e));

async function CVLoad(e: Event) {
  e.preventDefault();
  verseRange = updateVerseRange();
  
  const withContext = <HTMLInputElement>document.getElementById("withContext");
  if (withContext.checked) {
      const offset = verseRange % 2 == 0 ? verseRange/2 : (verseRange-1)/2;
      [chapter, verseBase, verseEnd] = updateCSE(parseInt(chapterInput.value), parseInt(verseInput.value)-offset, verseRange, countBismi);
  } else {
      [chapter, verseBase, verseEnd] = updateCSE(parseInt(chapterInput.value), parseInt(verseInput.value), verseRange, countBismi);
  }

  await buildPage(chapter, verseBase, verseEnd, focusedVerse, arabicFontSize, transFontSize, countBismi); 
  focusVerse(parseInt(verseInput.value));
}
