import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';

import Background from '../components/Background';
import Dashboard from './Dashboard';
import Login from './Login';
import useCheckLogin from '../hooks/useCheckLogin';
import { SocketContext, useSocket } from '../socket';
import { useToggle } from 'react-use';
import { useSelector } from 'react-redux';
import Agreement from './Agreement';

const Main = () => {
  const socket = useSocket();

  const { accessToken } = useSelector((state) => state.auth);
  const [showAgreement, toggleAgreement] = useToggle(true);

  if (showAgreement) {
    return <Agreement toggleAgreement={toggleAgreement} />;
  }

  if (!accessToken) {
    return <Login />;
  }

  if (!socket) {
    return <Spinner size="xl" color="white" />;
  }

  return (
    <SocketContext.Provider value={socket}>
      <Dashboard />
    </SocketContext.Provider>
  );
  // return (
  //   <SocketContext.Provider value={socket}>
  //     <Background />
  //     <Flex>
  //       <Switch>
  //         <Route path="/login" exact>
  //           <Login />
  //         </Route>
  //         <Route path="/dashboard" exact>
  //           {socket ? <Dashboard /> : <Spinner size="xl" color="white" />}
  //         </Route>
  //       </Switch>
  //     </Flex>
  //   </SocketContext.Provider>
  // );
};

export default Main;
