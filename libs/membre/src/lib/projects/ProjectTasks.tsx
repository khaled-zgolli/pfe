import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  createStyles,
  Dialog,
  DialogContent,
  makeStyles,
  Snackbar,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    div: {
      margin: theme.spacing(1),
    },
    task: {
      border: '1px solid ',
      borderColor: '#bdbdbd',
      margin: theme.spacing(1),
      verticalAlign: 'sub',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

/* eslint-disable-next-line */
export interface ProjectTasksProps {
  data: {
    tasks: string[];
    _id: string;
    searchMembers: {
      _id: string;
      name: string;
    };
  };
  id: string;
  projects: {
    _id: string;
    date: string;
    name: string;
    progress: number;
    tasksNumber: number;
    projectDetails: string;
    membersTasks: {
      tasks: string[];
      _id: string;
      searchMembers: {
        _id: string;
        name: string;
      };
    }[];
  };
}
export const ProjectTasks: React.FC<ProjectTasksProps> = ({
  data,
  id,
  projects,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //loading
  const [openLoading, setOpenLoading] = React.useState(false);
  //alert
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };
  //alert error
  const [openAlertError, setOpenAlertError] = React.useState(false);

  const handleClickAlertError = () => {
    setOpenAlertError(true);
  };

  const handleCloseAlertError = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlertError(false);
  };

  return (
    <div>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Success
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertError}
        autoHideDuration={4000}
        onClose={handleCloseAlertError}
      >
        <Alert onClose={handleCloseAlertError} severity="error">
          error!!
        </Alert>
      </Snackbar>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Tasks
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div>
            <Backdrop className={classes.backdrop} open={openLoading}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <Typography variant="h4" className={classes.margin}>
              You have {data.tasks.length} Tasks
            </Typography>
            {data.tasks.map((task, index) => {
              return (
                <div key={`task-${index}`} className={classes.div}>
                  <Box display="flex" className={classes.task}>
                    <Box flexGrow={1}>
                      <Typography variant="body1" className={classes.div}>
                        <ArrowRightIcon style={{ verticalAlign: 'middle' }} />{' '}
                        {task}
                      </Typography>
                    </Box>
                  </Box>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.div}
              onClick={() => {
                setOpenLoading(true);
                axios({
                  url: '/api/admin/updateMemberProject',
                  method: 'PUT',
                  data: {
                    id: id,
                    _id: data._id,
                    progress: projects.progress,
                    tasksNumber: projects.tasksNumber,
                  },
                })
                  .then(() => {
                    handleClickAlert();

                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  })
                  .catch((err) => {
                    setOpenLoading(false);
                    handleClickAlertError();
                  });
              }}
            >
              Complete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
