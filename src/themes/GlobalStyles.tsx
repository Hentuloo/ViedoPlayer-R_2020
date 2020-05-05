import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 html {
    font-size: 62.5%;
}

body {
    min-height: 100vh;
    margin: 0px;
    padding: 0px;
    overflow-x: hidden;
    font-family:${({ theme }) => theme.ff[0]};
    font-weight: ${({ theme }) => theme.fw[0]};
    font-size: ${({ theme }) => theme.fs.m};
    color:  ${({ theme }) => theme.color.black[0]}; 
    background: ${({ theme }) => theme.color.gradients[0]}; 

    ${({ theme }) => theme.mediaQuery.md}{
         font-size: 1.4rem;
    }
    ${({ theme }) => theme.mediaQuery.vlg}{
         font-size: 1.8rem;
    }
}
*,
*::after,
*::before {
    box-sizing: border-box;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.hide__mobile{
    display:none;
    ${({ theme }) => theme.mediaQuery.md} {
        display:block;
    }
}
.hide__deskop{
    display:block;
    ${({ theme }) => theme.mediaQuery.md} {
        display:none;
    }
}
html > div[style] {
  display: none !important;
}
.transformable-box{
    pointer-events:all;
    .moveable-line{
    display:none;
    }
    .moveable-line.moveable-rotation-line{
    display:block;
    }
    .moveable-control{
    width: calc(10 * var(--zoompx)) !important;
    height: calc(10 * var(--zoompx)) !important;
    margin-top: calc(-5 * var(--zoompx)) !important;
    margin-left: calc(-5 * var(--zoompx)) !important;
    }
}

`;
