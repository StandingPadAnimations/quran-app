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

export type LanguageOptions = {
  en?: boolean;
  zk?: boolean;
  sc?: boolean;
  v5?: boolean;
  cn?: boolean;
  sp_en?: boolean;
  sp_ur?: boolean;
  ur?: boolean;
  ts?: boolean;
  fr?: boolean;
  es?: boolean;
  de?: boolean;
  it?: boolean;
  my?: boolean;
  bn?: boolean;
  nw?: boolean;
  sv?: boolean;
  f?: number;
  hover?: number;
};
export type VerseResponse = Record<string, { [lang: string]: string }>;

export async function getVerses(chapter: number, 
  startVerse: number, 
  endVerse: number, 
  languageOptions: LanguageOptions): Promise<VerseResponse[]> {
  const ranges: [number, number][] = [];

  for (let start = startVerse; start <= endVerse; start += 10) {
    const end = Math.min(start + 9, endVerse);
    ranges.push([start, end]);
  }
  
  const verses = await Promise.all(
    ranges.map(([start, end]) => getVerseBatch(chapter, start, end, languageOptions))
  );

  return verses;
}

export async function getVerseBatch(chapter: number, 
  startVerse: number, 
  endVerse: number, 
  languageOptions: LanguageOptions): Promise<VerseResponse> {
  const range = chapter + ":" + startVerse + "-" + endVerse;
  const url = `https://api.openquran.com/express/chapter/${range}`;

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(languageOptions),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const json: VerseResponse = await response.json();
  return json;
}

export type ChapterIntroResponse = {
  ar: string;
  [lang: string]: string; // allows translations too (if any)
};

export async function getChapterIntro(
  chapterNumber: number
): Promise<ChapterIntroResponse> {
  const url = `https://api.openquran.com/express/chapter/intro/${chapterNumber}`;

  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "omit",
    headers: {
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      "Priority": "u=4",
      "Pragma": "no-cache",
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error(`Intro fetch failed with status ${response.status}`);
  }

  const json: ChapterIntroResponse = await response.json();
  return json;
}

