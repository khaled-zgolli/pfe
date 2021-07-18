import {
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DuoIcon from '@material-ui/icons/Duo';

import './meetings.module.css';
import axios from 'axios';

import TimerIcon from '@material-ui/icons/Timer';
import TimerOffIcon from '@material-ui/icons/TimerOff';

/* eslint-disable-next-line */
export interface MeetingsProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
    },
    divider: {
      margin: theme.spacing(1),
    },
    ContactPhoneIcon: {
      verticalAlign: 'sub',
      marginRight: theme.spacing(1),
    },
  })
);
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

export function Meetings({ memberInfo }) {
  console.log(memberInfo);
  const [meetingData, setMeetingData] = useState<data[]>([
    {
      _id: '',
      meetingName: '',
      date: '',
      begin: 0,
      end: '',
      description: '',
      state: '',
      taches: '',
      members: [{ name: '', _id: '', state: '' }],
    },
  ]);
  useEffect(() => {
    const getMembersData = async () => {
      await axios
        .get('/api/admin/meeting')
        .then((response) => {
          const data = response.data;
          setMeetingData(data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMembersData();
  }, []);
  console.log(meetingData);

  const classes = useStyles();
  return (
    <Container>
      <Paper className={classes.paper} elevation={5}>
        <Typography variant="h4">
          <DuoIcon fontSize="large" className={classes.ContactPhoneIcon} />
          Meetings
        </Typography>
        <Divider className={classes.divider} />
        {meetingData.map((meeting) => {
          return meeting.members.map((member, index) => {
            if (member._id === memberInfo) {
              return (
                <div key={index}>
                  <Box display="flex">
                    <Box flexGrow={1}>
                      <Typography variant="h5">
                        Meeting name: {meeting.meetingName}
                      </Typography>
                      <Typography variant="subtitle2">
                        {meeting.begin}H \ {meeting.end}H
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2">
                        {meeting.date}
                      </Typography>
                    </Box>
                  </Box>
                  {member.state === '' ? (
                    <Box>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{ marginRight: '5px' }}
                        onClick={() => {
                          axios({
                            url: 'api/member/meeting/state',
                            method: 'post',
                            data: {
                              id: meeting._id,
                              state: 'present',
                              _id: member._id,
                            },
                          }).then(() => {
                            window.location.reload();
                          });
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => {
                          axios({
                            url: 'api/member/meeting/state',
                            method: 'post',
                            data: {
                              id: meeting._id,
                              state: 'absent',
                              _id: member._id,
                            },
                          }).then(() => {
                            window.location.reload();
                          });
                        }}
                      >
                        No
                      </Button>
                    </Box>
                  ) : member.state === 'present' ? (
                    <Typography color="primary">Present</Typography>
                  ) : (
                    <Typography color="secondary">Absent</Typography>
                  )}

                  <Typography variant="body1">{meeting.description}</Typography>

                  <Divider className={classes.divider} />
                </div>
              );
            }
            return <div key={index}></div>;
          });
        })}
      </Paper>
    </Container>
  );
}

export default Meetings;
