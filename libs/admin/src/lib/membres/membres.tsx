import {
  CircularProgress,
  Container,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import axios from 'axios';

import React, { useEffect, useState } from 'react';

import './membres.module.css';

import { TableMembers } from './table';

  const columns = [
    {
      id: 'id',
      label: 'ID',
    },
    {
      id: 'email',
      label: 'Email',
    },
    {
      id: 'name',
      label: 'Name',
    },
    // {
    //   id: 'password',
    //   label: 'Password',
    // },
    {
      id: 'birthday',
      label: 'Birthday',
    },
    {
      id: 'phone',
      label: 'Phone',
    },
    {
      id: 'gender',
      label: 'Gender',
    },
    {
      id: 'join',
      label: 'Join',
    },
    {
      id: 'action',
      label: 'Action',
    },
  ];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
    },
  })
);

interface data {
  _id: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
  phone: number;
  gender: string;
  joinDate: string;
}

/* eslint-disable-next-line */
export interface MembresProps {}

export const Membres: React.FC<MembresProps> = () => {
  const classes = useStyles();
  const [MemeberData, setMemeberData] = useState<data[]>([]);

  useEffect(() => {
    const getMembersData = async () => {
      await axios
        .get('/api/admin/membre')
        .then((response) => {
          const data = response.data;
          const obj = data.filter((e) => {
            return e.admin !== true;
          });

          setMemeberData(obj);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMembersData();
  }, []);

  return (
    <Container>
      <Paper className={classes.paper} elevation={5}>
        <TableMembers rows={MemeberData} columns={columns} />
      </Paper>
    </Container>
  );
};

export default Membres;
