import {
  Backdrop,
  Button,
  CircularProgress,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  Snackbar,
  Theme,
} from '@material-ui/core';
import React, { useState } from 'react';

import { useHistory } from 'react-router';
import axios from 'axios';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/* eslint-disable-next-line */
export interface DeleteMemberProps {
  id: string;
}

export const DeleteNews: React.FC<DeleteMemberProps> = ({ id }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const classes = useStyles();

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
  //loading
  const [openLoading, setOpenLoading] = React.useState(false);
  const handleCloseLoading = () => {
    setOpenLoading(false);
  };
  const handleToggleLoading = () => {
    setOpenLoading(!open);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="warning">
          Mumber has been deleted !!
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
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText color="inherit">
            <Backdrop
              className={classes.backdrop}
              open={openLoading}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            Are you sure you want to delete this ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenLoading(true);
              axios({
                url: '/api/admin/deleteNews',
                method: 'delete',
                data: { _id: id },
              })
                .then(() => {
                  handleClickAlert();
                  setOpenLoading(false);
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                })
                .catch((err) => {
                  setOpenLoading(false);
                  handleClickAlertError();
                });
              console.log(id);
            }}
          >
            Delete
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
