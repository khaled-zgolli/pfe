import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GestionCompte } from '@pfe/admin';
import { Layout } from '@pfe/layout';
import { Home, Projects, Meetings, Chat } from '@pfe/membre';
import HomeIcon from '@material-ui/icons/Home';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import avatar from './avatar.jpg';
import { useLocation } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';

import './membre.module.css';
import { Call } from '@material-ui/icons';

/* eslint-disable-next-line */
export interface MembreProps {}

export function Membre({ memberInfo }) {
  const location = useLocation();
  const menuItems: {
    text: string;
    icon: JSX.Element;
    path: string;
  }[] = [
    {
      text: 'Home',
      icon: <HomeIcon color="primary" />,
      path: '/membre',
    },
    {
      text: 'Projects',
      icon: <FormatListBulletedIcon color="primary" />,
      path: '/membre/projetcs',
    },
    {
      text: 'Meetings',
      icon: <Call color="primary" />,
      path: '/membre/meeting',
    },
    {
      text: 'Chat',
      icon: <ChatIcon color="primary" />,
      path: '/membre/chat',
    },
  ];
  if (memberInfo === undefined) {
    return <div></div>;
  } else {
    return (
      <div>
        <Layout
          id={memberInfo._id}
          menuItems={menuItems}
          admin={'Member'}
          name={memberInfo.name}
          avatar={memberInfo.img}
          path="/membre/settings"
        >
          <Route path="/membre" exact component={Home} />
          <Route
            path="/membre/chat"
            component={(props) => <Chat memberInfo={memberInfo} {...props} />}
          />
          <Route
            path="/membre/meeting"
            component={(props) => (
              <Meetings memberInfo={memberInfo._id} {...props} />
            )}
          />
          <Route
            path="/membre/projetcs"
            component={(props) => (
              <Projects memberInfo={memberInfo} {...props} />
            )}
          />
          <Route
            path="/membre/settings"
            component={(props) => (
              <GestionCompte memberInfo={memberInfo} {...props} />
            )}
          />
        </Layout>
      </div>
    );
  }
}

export default Membre;
