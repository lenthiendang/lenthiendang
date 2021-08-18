import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
// import Agreement from './Agreement';
// import Login from './Login';

const Main = () => {
  return (
    // <Router>
    //   <Switch>
    //    <Route path="/index.html">
    //       <Agreement />
    //     </Route>
    //     <Route path="/login" exact>
    //       <Login />
    //     </Route>
    //     <Route path="/index.html" exact>
    <Dashboard />
    // </Route>
    //   </Switch>
    // </Router>
  );
};

export default Main;
