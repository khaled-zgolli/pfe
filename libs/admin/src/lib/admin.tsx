import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Acceuil, Meetings, Membres, Projets, GestionCompte } from '@pfe/admin';
import { Layout } from '@pfe/layout';

import { NewsList } from './home/newsList';

import './admin.module.css';
import { AccountTree, Call, PeopleAlt, Home } from '@material-ui/icons';

import avatar from './avatar.jpg';
import axios from 'axios';
import { Backdrop, CircularProgress } from '@material-ui/core';
/* eslint-disable-next-line */
export interface AdminProps {}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Admin: React.FC = ({ memberInfo }) => {
  const menuItems: {
    text: string;
    icon: JSX.Element;
    path: string;
  }[] = [
    {
      text: 'Home',
      icon: <Home color="primary" />,
      path: '/admin',
    },
    {
      text: 'Members',
      icon: <PeopleAlt color="primary" />,
      path: '/admin/membre',
    },
    {
      text: 'Projects',
      icon: <AccountTree color="primary" />,
      path: '/admin/projet',
    },
    {
      text: 'Meetings',
      icon: <Call color="primary" />,
      path: '/admin/meeting',
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
          admin={'Admin'}
          name={memberInfo.name}
          avatar={memberInfo.img}
          path="/admin/settings"
        >
          <Route path="/admin" exact component={Acceuil} />
          <Route path="/admin/list" exact component={NewsList} />
          <Route path="/admin/membre" component={Membres} />
          <Route path="/admin/projet" component={Projets} />
          <Route path="/admin/meeting" component={Meetings} />
          <Route
            path="/admin/settings"
            component={(props) => (
              <GestionCompte memberInfo={memberInfo} {...props} />
            )}
          />
        </Layout>
      </div>
    );
  }
};

export default Admin;
