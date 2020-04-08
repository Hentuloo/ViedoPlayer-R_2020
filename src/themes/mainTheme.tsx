const theme = {
  color: {
    brand: ['rgb(255, 146, 23)', 'rgb(255, 157, 47)'],
    white: ['rgb(255, 255, 255)'],
    black: ['#2D2D2D', 'rgba(74, 66, 66, 0.5)'],
    gray: ['rgb(119, 119, 119)'],
  },
  mediaQuery: {
    xs: '@media (min-width: 0px)',
    sm: '@media (min-width: 480px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    vlg: '@media (min-width: 1494px)',
    mobileKeyboard: ` @media screen and (min-device-aspect-ratio: 1/1) and (min-aspect-ratio: 1/1) and (max-width: 768px)`,
  },
  fs: {
    mini: '0.5em',
    xxxs: '0.7em',
    xxs: '0.9em',
    xs: '1.1em',
    s: '1.3em',
    m: '1.5em',
    l: '1.6em',
    xl: '1.8em',
    xxl: '2em',
    xxxl: '2.3em',
    large: '2.8em',
  },
  fw: [400],
  ff: [`'Roboto', sans-serif`],
};

export default theme;
