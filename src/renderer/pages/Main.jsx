import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import Background from '../components/Background';
import Dashboard from './Dashboard';
// import Agreement from './Agreement';
import Login from './Login';
import useCheckLogin from '../hooks/useCheckLogin';

const Main = () => {
  useCheckLogin();
  return (
    <>
      <Background />
      <Flex>
        <Switch>
          {/* <Route path="/index.html" exact>
            <Agreement />
            </Route>
          */}
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
        </Switch>
      </Flex>
    </>
  );
};

export default Main;
