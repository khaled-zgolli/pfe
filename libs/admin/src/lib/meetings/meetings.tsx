import {
  Container,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { TableMeeting } from './Table';

import './meetings.module.css';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
    },
    Accordion: {
      padding: theme.spacing(2),
    },
    icon: {
      verticalAlign: 'sub',
      marginRight: theme.spacing(1),
    },
  })
);
export interface row {
  id: string;
  meetingName: string;
  date: string;
  begin: string;
  end: string;
  state: string;
  description: string;
  members: { id: string; name: string; state: string }[];
  taches: string;
}

//columns
export interface column {
  id: string;
  label: string;
}
const columns: column[] = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'meeting',
    label: 'Meeting',
  },

  {
    id: 'date',
    label: 'Date',
  },
  {
    id: 'begin',
    label: 'Begin',
  },
  {
    id: 'end',
    label: 'End',
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

interface data {
  _id: string;
  meetingName: string;
  date: string;
  begin: number;
  end: string;
  description: string;
  state: string;
  taches: string;
  members: { name: string; _id: string; state: string }[];
}

/* eslint-disable-next-line */
export interface MeetingsProps {}

export function Meetings(props: MeetingsProps) {
  const classes = useStyles();

  const [meetingData, setMeetingData] = useState<data[]>([]);

  useEffect(() => {
    const getMembersData = async () => {
      await axios
        .get('/api/admin/meeting')
        .then((response) => {
          const data = response.data;
          setMeetingData(data);
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
        <TableMeeting rows={meetingData} columns={columns} />
      </Paper>
    </Container>
  );
}

export default Meetings;
