import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';

import Background from '../components/Background';
import Dashboard from './Dashboard';
// import Agreement from './Agreement';
import Login from './Login';
import useCheckLogin from '../hooks/useCheckLogin';
import { SocketContext, useSocket } from '../socket';

const Main = () => {
  useCheckLogin();
  const socket = useSocket();

  return (
    <SocketContext.Provider value={socket}>
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
            {socket ? <Dashboard /> : <Spinner size="xl" color="white" />}
          </Route>
        </Switch>
      </Flex>
    </SocketContext.Provider>
  );
};

export default Main;
