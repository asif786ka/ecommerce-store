import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { store } from './store/store';
import queryClient from './queryClient';
import App from './App';
import GlobalStyle from './globalStyles';
import theme from './theme';
import './index.css';

// Render the app with Redux, React Query, and Theme providers
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
