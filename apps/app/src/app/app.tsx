import React, { useEffect, useState } from 'react';

import styles from './app.module.css';
import { LogIn } from '@pfe/log-in';
import { ProtectedRouter, ProtectedRouterAdmin } from '@pfe/log-in';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blue, red, teal } from '@material-ui/core/colors';
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Admin } from '@pfe/admin';
import { Membre } from '@pfe/membre';
import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#f44336',
    },
  },
});

export function App() {
  const [isAuth, setIsAuth] = useState<boolean | undefined>();
  const [admin, setAdmin] = useState<boolean | undefined>();
  const [memberInfo, setMemberInfo] = useState<string | undefined>();

  useEffect(() => {
    const userAuthenticated = async () => {
      await axios
        .get('/api/isMemberAuth', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        })
        .then((res) => {
          if (res.data.auth === 'true' && res.data.admin === true) {
            setAdmin(true);
            setIsAuth(true);
            setMemberInfo(res.data.member);
          } else if (res.data.auth === 'true' && res.data.admin === false) {
            setIsAuth(true);
            setAdmin(false);
            setMemberInfo(res.data.member);
          } else {
            setIsAuth(false);
            setAdmin(false);
          }
        });
    };
    userAuthenticated();
  }, []);

  if (isAuth === undefined && admin === undefined && memberInfo === undefined) {
    return <div></div>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Route path="/" exact component={LogIn} />
          <ProtectedRouterAdmin
            path="/admin"
            component={(props) => <Admin memberInfo={memberInfo} {...props} />}
            isAdmin={admin}
          />
          <ProtectedRouter
            path="/membre"
            component={(props) => <Membre memberInfo={memberInfo} {...props} />}
            isAuth={isAuth}
          />
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
