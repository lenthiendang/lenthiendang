import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import store from './redux';
import Dashboard from './pages/Dashboard';
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
        <Dashboard />
      </ChakraProvider>
    </ReduxProvider>
  );
}
