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

export const languageToName: { [key: string]: string } = {
  "en" : "— Maulawi Sher Ali",
  "zk" : "— Muhammad Zafrulla Khan",
  "sc" : "— Maulawi Sher Ali with Short Commentary",
  "v5" : "— Maulawi Sher Ali with 5 Volume Commentary"
}

// If the lengths of chapters in the Quran change, we 
// have serious problems beyond "this app no longer works
// properly"
//
// NOTE: This counts bismillah as the first verse
const chapterLengths: { [key: number]: number } = {
  1: 7, 2: 286, 3: 201, 4: 177, 5: 121, 6: 166,
  7: 207, 8: 76, 9: 129, 10: 110, 11: 124, 12: 112,
  13: 44, 14: 53, 15: 100, 16: 129, 17: 112, 18: 111,
  19: 99, 20: 136, 21: 113, 22: 79, 23: 119, 24: 65,
  25: 78, 26: 228, 27: 94, 28: 89, 29: 70, 30: 61,
  31: 35, 32: 31, 33: 74, 34: 55, 35: 46, 36: 84,
  37: 183, 38: 89, 39: 76, 40: 86, 41: 55, 42: 54,
  43: 90, 44: 60, 45: 38, 46: 36, 47: 39, 48: 30,
  49: 19, 50: 46, 51: 61, 52: 50, 53: 63, 54: 56,
  55: 79, 56: 97, 57: 30, 58: 23, 59: 25, 60: 14,
  61: 15, 62: 12, 63: 12, 64: 19, 65: 13, 66: 13,
  67: 31, 68: 53, 69: 53, 70: 45, 71: 29, 72: 29,
  73: 21, 74: 57, 75: 41, 76: 32, 77: 51, 78: 41,
  79: 47, 80: 43, 81: 81, 82: 20, 83: 37, 84: 26,
  85: 23, 86: 18, 87: 20, 88: 27, 89: 31, 90: 21,
  91: 16, 92: 22, 93: 12, 94: 9, 95: 9, 96: 20,
  97: 6, 98: 9, 99: 9, 100: 12, 101: 12, 102: 9,
  103: 4, 104: 10, 105: 6, 106: 5, 107: 8, 108: 4, 
  109: 7, 110: 4, 111: 6, 112: 5, 113: 6, 114: 7,
}

export function chapterLength(chapter: number, countBismi: boolean): number {
  if (!countBismi) {
    // Surah At-Taubah (Chapter 9) does not start with bismillah
    return chapter != 9 ? chapterLengths[chapter] - 1 : chapterLengths[chapter];
  }
  return chapterLengths[chapter]
}

// TODO: Make this changeable by the end user
export const defaultVerseRange: number = 10;
