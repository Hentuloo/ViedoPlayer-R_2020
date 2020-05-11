// test-utils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'store';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'themes/GlobalStyles';
import theme from 'themes/mainTheme';

const render = (ui: React.ReactElement, { ...renderOptions }) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );

  return rtlRender(ui, {
    wrapper: Wrapper as React.FunctionComponent,
    ...renderOptions,
  });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
