import React from 'react';
import './App.global.css';

import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import store from './redux';
import Main from './pages/Main';
import { colors } from '../constant/exchanges';

const theme = extendTheme({
  colors: {
    primary: {
      ...colors.primary,
    },
    secondary: {
      ...colors.secondary,
    },
  },
});

export default function App() {
  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <ChakraProvider theme={theme}>
          <Main />
        </ChakraProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
}
