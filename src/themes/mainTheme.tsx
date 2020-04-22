const theme = {
  color: {
    brand: ['rgba(73, 127, 149, 1)', 'rgba(58, 107, 126, 1)'],
    white: ['rgb(255, 255, 255)', 'rgba(225, 225, 225, 1)'],
    black: [
      'rgba(58, 55, 55, 1)',
      'rgba(74, 66, 66, 0.5)',
      'rgba(50, 48, 48, 1)',
    ],
    gray: ['rgb(119, 119, 119)'],
    red: ['rgb(193, 36, 36)', 'rgb(211, 86, 86)'],
    gradients: [
      'linear-gradient(180deg, #618FA3 0%, #487292 0.01%, #232829 33.85%)',
      'linear-gradient(180deg, rgba(50, 48, 48, 0) 41.67%, #323030 100%);',
    ],
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
  fw: [400, 700],
  ff: [`'Roboto', sans-serif`],
};

export default theme;
