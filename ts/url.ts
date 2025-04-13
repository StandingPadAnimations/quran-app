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

import { chapterLength, defaultVerseRange, updateVerseRange } from "./constants.js";

export function readURLParams(countBismi: boolean): [number, number, number, number, number] {
  const params = new URLSearchParams(window.location.search);
  const verseRange = parseInt(params.get("range")) || defaultVerseRange;
  const chapter = parseInt(params.get("chapter")) || 1;
  const verseBase = parseInt(params.get("start")) || 1;

  const tmpEnd = verseBase + (verseRange - 1);
  const totalVerses = chapterLength(chapter, countBismi);
  const verseEnd: number = parseInt(params.get("end")) || (tmpEnd <= totalVerses) ? tmpEnd : totalVerses;
  const focusedVerse: number = parseInt(params.get("focusedVerse")) || -1;

  return [chapter, verseBase, verseEnd, verseRange, focusedVerse]
}

export function updateURL(chapter: number, verseBase: number, verseEnd: number, countBismi: boolean) {
  const url = new URL(window.location.href);
  url.searchParams.set("chapter", chapter.toString());
  url.searchParams.set("start", verseBase.toString());
  url.searchParams.set("end", (verseEnd <= chapterLength(chapter, countBismi) ? verseEnd : chapterLength(chapter, countBismi)).toString());
  url.searchParams.set("range", updateVerseRange().toString());
  window.history.pushState({}, "", url);
}

export function setFocusedVerse(focusedVerse: number) {
  const url = new URL(window.location.href);
  url.searchParams.set("focusedVerse", focusedVerse.toString());
  window.history.pushState({}, "", url);
}
