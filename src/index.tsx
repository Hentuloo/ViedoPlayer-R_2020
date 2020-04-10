import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'pages/Root';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'themes/GlobalStyles';
import theme from 'themes/mainTheme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Root />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
