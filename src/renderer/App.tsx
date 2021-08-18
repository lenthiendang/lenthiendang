import React from 'react';
import './App.global.css';

import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import store from './redux';
import Main from './pages/Main';
import Background from './components/Background';

const theme = extendTheme({
  colors: {
    primary: {},
    secondary: {},
  },
});

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Background />
        <Main />
      </ChakraProvider>
    </ReduxProvider>
  );
}
