import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Collapse,
  createStyles,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import ListAltIcon from '@material-ui/icons/ListAlt';
import TodayIcon from '@material-ui/icons/Today';
import TimerIcon from '@material-ui/icons/Timer';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    date: {
      verticalAlign: 'bottom',
      marginRight: theme.spacing(1),
    },
    grid: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    border: {
      textAlign: 'center',
      border: '2px solid #bdbdbd',
      borderRadius: '5px',
      padding: '10px',
      '&:hover': {
        borderColor: '#009688',
      },
    },
  })
);

export interface row {
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
export interface meetingDetailsProps {
  rowValue: row;
}

export const MeetingDetails: React.FC<meetingDetailsProps> = ({ rowValue }) => {
  const classes = useStyles();

  const [buttonDisplay, setButtonDisplay] = useState<string>('none');

  const [open, setOpen] = useState<boolean>(false);

  const history = useHistory();

  const [tache, setTache] = useState<string>('');

  //alert

  const [openAlert, setOpenAlert] = useState<boolean>(false);

  //alertError

  const [openAlertError, setOpenAlertError] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
    history.push('/admin/meeting/details');
  };

  const handleClose = () => {
    setOpen(false);
    setButtonDisplay('none');
    history.push('/admin/meeting');
  };

  //loading
  const [openLoading, setOpenLoading] = React.useState(false);
  const handleCloseLoading = () => {
    setOpenLoading(false);
  };
  const handleToggleLoading = () => {
    setOpenLoading(!open);
  };
  return (
    <div>
      <IconButton size="small" onClick={handleClickOpen}>
        <ListAltIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        fullWidth
        maxWidth="md"
      >
        <IconButton
          color="primary"
          style={{ marginLeft: '95%' }}
          onClick={handleClose}
        >
          <CancelIcon color="secondary" fontSize="inherit" />
        </IconButton>
        <DialogContent>
          <Backdrop
            className={classes.backdrop}
            open={openLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Collapse in={openAlert}>
            <Alert
              severity="success"
              action={
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Updated success!!
            </Alert>
          </Collapse>
          <Collapse in={openAlertError}>
            <Alert
              severity="error"
              action={
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlertError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              error!!
            </Alert>
          </Collapse>
          <Typography variant="h4" align="center">
            Meeting: {rowValue.meetingName}
          </Typography>
          <Grid container className={classes.grid}>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Typography variant="h6" align="center">
                <TodayIcon
                  className={classes.date}
                  fontSize="large"
                  color="primary"
                />
                {rowValue.date}
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Typography variant="h6" align="center">
                <TimerIcon
                  className={classes.date}
                  fontSize="large"
                  color="primary"
                />
                {rowValue.begin}
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Typography variant="h6" align="center">
                <TimerOffIcon
                  className={classes.date}
                  fontSize="large"
                  color="primary"
                />
                {rowValue.end}
              </Typography>
            </Grid>
          </Grid>
          <div>
            <Typography variant="h6"> Members: </Typography>
            {rowValue.members.map((member) => {
              if (member.state === '')
                return (
                  <span key={member._id} style={{ fontSize: '18px' }}>
                    {' '}
                    {member.name} /{' '}
                  </span>
                );
              return '';
            })}
          </div>

          <Grid container spacing={4} style={{ marginBottom: '3px' }}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography variant="h5" align="center">
                Absent List
                <ClearIcon
                  fontSize="large"
                  style={{ verticalAlign: 'bottom' }}
                />
              </Typography>
              <div className={classes.border}>
                {rowValue.members.map((member) => {
                  if (member.state === 'absent')
                    return (
                      <div key={member._id}>
                        <Typography variant="h6"> {member.name}</Typography>
                      </div>
                    );
                  return '';
                })}
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography variant="h5" align="center">
                Present List
                <DoneIcon
                  fontSize="large"
                  style={{ verticalAlign: 'bottom' }}
                />
              </Typography>
              <div className={classes.border}>
                {rowValue.members.map((member) => {
                  if (member.state === 'present')
                    return (
                      <div key={member._id}>
                        <Typography variant="h6"> {member.name}</Typography>
                      </div>
                    );
                  return '';
                })}
              </div>
            </Grid>
          </Grid>

          <Typography variant="h6" style={{ marginBottom: '3px' }}>
            Les Taches apres la Reunion:
          </Typography>
          <TextField
            multiline
            fullWidth
            defaultValue={rowValue.taches}
            rows={7}
            variant="outlined"
            style={{ marginBottom: '20px' }}
            onChange={(e) => {
              setTache(e.target.value);
              if (e.target.value !== rowValue.taches) {
                setButtonDisplay('block');
              } else {
                setButtonDisplay('none');
              }
            }}
          />
          <div style={{ textAlign: 'center', display: buttonDisplay }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={(props) => {
                setOpenLoading(true);
                axios({
                  url: '/api/admin/meeting/details',
                  method: 'PUT',
                  data: { _id: rowValue._id, taches: tache },
                })
                  .then(() => {
                    setOpenLoading(false);
                    setOpenAlert(true);
                    setTimeout(() => {
                      setOpenAlert(false);
                    }, 2000);
                  })
                  .catch((err) => {
                    console.log(err);
                    setOpenLoading(false);
                    setOpenAlertError(true);
                    setTimeout(() => {
                      setOpenAlertError(false);
                    }, 2000);
                  });
              }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
