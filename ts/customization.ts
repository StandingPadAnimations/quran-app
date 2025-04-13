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

// Tailwind font steps
const fontSteps: { [key: string]: [string, string] } = {
  "xs":   ["sm", "xs"],
  "sm":   ["base", "xs"],
  "base": ["lg", "sm"],
  "lg":   ["xl", "base"],
  "xl":   ["2xl", "lg"],
  "2xl":  ["3xl", "xl"],
  "3xl":  ["4xl", "2xl"],
  "4xl":  ["5xl", "3xl"],
  "5xl":  ["6xl", "4xl"],
  "6xl":  ["7xl", "5xl"],
  "7xl":  ["8xl", "6xl"],
  "8xl":  ["9xl", "7xl"],
  "9xl":  ["9xl", "8xl"], // TODO: Allow even further sizing increases
}

function increaseFontSizeKey(fontSize: string): string {
  return fontSteps[fontSize][0];
}

function decreaseFontSizeKey(fontSize: string): string {
  return fontSteps[fontSize][1];
}

export function increaseFontSize(oldFontSize: string, cls: string): string {
  const newFontSize = increaseFontSizeKey(oldFontSize);
  const items = document.getElementsByClassName(cls);
  for (let i = 0; i < items.length; i++) {
    items.item(i).classList.replace(`text-${oldFontSize}`, `text-${newFontSize}`);
  }
  return newFontSize;
}

export function decreaseFontSize(oldFontSize: string, cls: string): string {
  const newFontSize = decreaseFontSizeKey(oldFontSize);
  const items = document.getElementsByClassName(cls);
  for (let i = 0; i < items.length; i++) {
    items.item(i).classList.replace(`text-${oldFontSize}`, `text-${newFontSize}`);
  }
  return newFontSize;
}
