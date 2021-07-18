import {
  Box,
  Container,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import React from 'react';

import { ProjectList } from './ProjectList';

import './projects.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
    },
  })
);

/* eslint-disable-next-line */
export interface ProjectsProps {}

export function Projects({ memberInfo }) {
  const classes = useStyles();

  return (
    <Container>
      <Paper className={classes.paper} elevation={5}>
        <ProjectList id={memberInfo._id} />
      </Paper>
    </Container>
  );
}

export default Projects;
