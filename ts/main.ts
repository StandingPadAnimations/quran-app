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
import { chapterLength, verseRange } from "./constants.js"; 
import { decreaseFontSize, increaseFontSize } from "./customization.js";
import { buildPage, rebuildVerses } from "./build-page.js";

function updateCSE(newChapter: number, newStart: number, countBismi: boolean): [number, number, number] {
  const chapter = newChapter > 0 ? newChapter : 1;
  const verseBase = newStart > 0 ? newStart : 1;
  const tmpEnd = verseBase + (verseRange - 1);
  const verseEnd = (tmpEnd <= chapterLength(chapter, countBismi)) ? tmpEnd : chapterLength(chapter, countBismi);
  return [chapter, verseBase, verseEnd];
}

let countBismi: boolean = true;
let chapter: number = 1;
let verseBase: number = 1;
let arabicFontSize: string = "4xl";
let transFontSize: string = "xl";

const tmpEnd = verseBase + (verseRange - 1);
let totalVerses: number = chapterLength(chapter, countBismi);
let verseEnd = (tmpEnd <= totalVerses) ? tmpEnd : totalVerses;

[chapter, verseBase, verseEnd] = readURLParams(verseRange, countBismi);
buildPage(chapter, verseBase, verseEnd, arabicFontSize, transFontSize, countBismi);

document.querySelectorAll(".nextBtn").forEach((itm) => {
    itm.addEventListener("click", () => {
    if (verseBase + verseRange <= chapterLength(chapter, countBismi)) {
      [chapter, verseBase, verseEnd] = updateCSE(chapter, verseBase+verseRange, countBismi);
      rebuildVerses(chapter, verseBase, verseEnd, arabicFontSize, transFontSize, countBismi);
    } else {
      [chapter, verseBase, verseEnd] = updateCSE(chapter+1, 1, countBismi);
      buildPage(chapter, verseBase, verseEnd, arabicFontSize, transFontSize, countBismi);
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
    if (verseBase === 1) {
      [chapter, verseBase, verseEnd] = updateCSE(chapter-1, verseBase, countBismi);
      buildPage(chapter, verseBase, verseEnd, arabicFontSize, transFontSize, countBismi);
    } else if (verseBase - verseRange >= 1) {
      [chapter, verseBase, verseEnd] = updateCSE(chapter, verseBase-verseRange, countBismi);
      rebuildVerses(chapter, verseBase, verseEnd, arabicFontSize, transFontSize, countBismi);
    } else {
      [chapter, verseBase, verseEnd] = updateCSE(chapter, 1, countBismi);
      rebuildVerses(chapter, verseBase, verseEnd, arabicFontSize, transFontSize, countBismi);
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
  
  const withContext = <HTMLInputElement>document.getElementById("withContext");
  if (withContext.checked) {
      [chapter, verseBase, verseEnd] = updateCSE(parseInt(chapterInput.value), parseInt(verseInput.value)-((verseRange/2)-1), countBismi);
  } else {
      [chapter, verseBase, verseEnd] = updateCSE(parseInt(chapterInput.value), parseInt(verseInput.value), countBismi);
  }

  await buildPage(chapter, verseBase, verseEnd, arabicFontSize, transFontSize, countBismi);

  const selectedVerse = document.getElementsByClassName(`verse-${verseInput.value}`);

  ["outline-2", "outline-offset-10", "outline-dark-main", "dark:outline-main", "rounded"].forEach((cls) => {
    selectedVerse[0].classList.toggle(cls, true);
  })

  selectedVerse[0].scrollIntoView({ behavior: "smooth", block: "center"});
}
