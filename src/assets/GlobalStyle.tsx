import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyle = createGlobalStyle`
${reset}
:root {
  /* Color styles */
--main-color1: #7b9bdb;
--main-color2: #4b557c;

--main-color1-1: #293147;

--main-color2-0: #a6adce;
--main-color2-1: #7a82a8;
--main-color2-2: #3d446a;
--main-color2-3: #4a4e5f;
--main-color2-4: #2b3151;
--main-color2-5: #151a35;

--color-white: #fff;
--color-black: #000;

--color-gray0: #c9c9c9;
--color-gray1: #aaaaaa;
--color-gray2: #7d7d7d;
--color-gray3: #515151;

--color-red: #ff5d55;

--color-yellow: #ffda99;

--color-orange: #ff9d76;

--color-green: #35aaa4;

--base-size: 10px;
--font-family-lato: 'Lato', sans-serif;
--font-family: '맑은고딕', 'Malgun Gothic', serif;
}

html {
  font-size: var(--base-size);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  list-style: none;
  margin: 0;
  padding: 0;
}

body {
  font: 1.6rem/1.15 var(--font-family-lato);
  width: 100%;
  color: var(--color-black);
  background: var(--color-white);
}

a,
a::before,
a::before {
  color: inherit;
  text-decoration: none;
}

a img {
  vertical-align: middle;
}

button {
  font-size: inherit;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}

li {
  list-style: none;
}

.screenReader {
  position: absolute;
  width: 1;
  height: 1;
  margin: -1;
  overflow: hidden;
  clip-path: polygon(0 0, 0 0, 0 0);
}
`

export default GlobalStyle
