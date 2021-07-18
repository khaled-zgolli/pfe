import {
  Container,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { TableProjet } from './table';

import './projets.module.css';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
    },
  })
);
//rows
interface data {
  _id: string;
  name: string;
  etat: string;
  progress: number;
  projectDetails: string;
  membersTasks: {
    searchMembers: { _id: string; name: string };
    tasks: string[];
  }[];
}

//columns
interface column {
  id: string;
  label: string;
}
const columns: column[] = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'projet',
    label: 'Projet',
  },
  {
    id: 'etat',
    label: 'State',
  },
  {
    id: 'progress',
    label: 'Progress',
  },

  {
    id: 'details',
    label: 'Details',
  },
  {
    id: 'action',
    label: 'Action',
  },
];

/* eslint-disable-next-line */
export interface ProjetsProps {}

export function Projets(props: ProjetsProps) {
  const classes = useStyles();

  const [projectData, setProjectData] = useState<data[]>([]);

  useEffect(() => {
    const getMembersData = async () => {
      await axios
        .get('/api/admin/project')
        .then((response) => {
          const data = response.data;
          setProjectData(data);
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
        <TableProjet rows={projectData} columns={columns} />
      </Paper>
    </Container>
  );
}

export default Projets;
