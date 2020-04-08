import React from 'react';
import ReactDOM from 'react-dom';
import VideoPage from 'pages/VideoPage';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'themes/GlobalStyles';
import theme from 'themes/mainTheme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <VideoPage />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
