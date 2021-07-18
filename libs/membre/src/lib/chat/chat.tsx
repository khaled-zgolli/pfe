import React from 'react';

import './chat.module.css';
import { ChatEngine } from 'react-chat-engine';
import {
  Button,
  Container,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import axios from 'axios';

/* eslint-disable-next-line */
export interface ChatProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
    },
  })
);

export function Chat({ memberInfo }) {
  const classes = useStyles();

  const private_key = '48564454-b150-482c-8019-9dd3c206d2a9';

  return (
    <Container>
      <Paper className={classes.paper} elevation={5}>
        <ChatEngine
          height="80vh"
          projectID="44274829-64c0-4b9e-be11-82c98ee39cf0"
          userName={memberInfo.name}
          userSecret={memberInfo.birthday}
        />
      </Paper>
    </Container>
  );
}

export default Chat;
