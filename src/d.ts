import theme from './themes/mainTheme';

type CustomTheme = typeof theme;

declare module 'styled-components' {
  export type DefaultTheme = CustomTheme;
}
