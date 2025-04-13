A Quran web app based on OpenQuran, written with HTML, CSS (+Tailwind), and Typescript.

## Building Steps
```sh
git clone "https://github.com/StandingPadAnimations/quran-app.git"

cd quran-app

npm i

npx @tailwindcss/cli -i ./css/globals.css -o ./css/globals-compiled.css

npx tsc

# Important static files are
# - index.html
# - js
# - css
# - static
npx serve
```

## License
```
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
```
