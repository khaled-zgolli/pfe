import {
  Badge,
  Box,
  Button,
  createStyles,
  Divider,
  IconButton,
  makeStyles,
  Paper,
  Popover,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CallIcon from '@material-ui/icons/Call';
import MessageIcon from '@material-ui/icons/Message';

import './layout.module.css';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconNotif: {
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
    },
  })
);

export const Notif = ({ idMember }) => {
  const classes = useStyles();
  const [notif, setNotif] = useState([
    {
      membersId: [''],
      titre: '',
      text: '',
      name: '',
      color: '',
      date: '',
    },
  ]);
  useEffect(() => {
    const getNotif = async () => {
      await axios
        .get('/api/admin/notif')
        .then((response) => {
          const data = response.data;
          setNotif(data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getNotif();
  }, []);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge variant="dot" color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div
          style={{
            maxHeight: '450px',
            marginBottom: '20px',
            marginTop: '10px',
            marginLeft: '10px',
          }}
        >
          <Typography variant="h5" align="center">
            Notifications
          </Typography>
          <Divider />
          {notif.map((notification) => {
            return notification.membersId.map((memberId, index) => {
              if (idMember === memberId) {
                return (
                  <div key={index}>
                    <Button>
                      <Box
                        style={{ margin: '5px', width: '250px' }}
                        display="flex"
                      >
                        <Box>
                          <Typography variant="h4">
                            <div
                              style={{ backgroundColor: notification.color }}
                              className={classes.iconNotif}
                            >
                              {notification.titre === 'project' ? (
                                <AccountTreeIcon fontSize="large" />
                              ) : notification.titre === 'reunion' ? (
                                <CallIcon fontSize="large" />
                              ) : (
                                <MessageIcon fontSize="large" />
                              )}
                            </div>
                          </Typography>
                        </Box>

                        <Box>
                          <Box>
                            <Typography
                              variant="inherit"
                              style={{ marginLeft: '10px' }}
                            >
                              {notification.text}
                            </Typography>
                            <Typography
                              variant="caption"
                              style={{ marginLeft: '10px' }}
                            >
                              {notification.date}
                            </Typography>
                          </Box>

                          <Box alignSelf="flex-end">
                            <span style={{ fontSize: '12px' }}>
                              {notification.name}
                            </span>
                          </Box>
                        </Box>
                      </Box>
                    </Button>
                    <Divider />
                  </div>
                );
              }
              return <div key={index}></div>;
            });
          })}
        </div>
      </Popover>
    </div>
  );
};
