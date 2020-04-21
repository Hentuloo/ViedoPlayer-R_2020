import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from 'pages/Root';

import { ThemeProvider } from 'styled-components';
import store from 'store';

import GlobalStyles from 'themes/GlobalStyles';
import theme from 'themes/mainTheme';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Root />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
