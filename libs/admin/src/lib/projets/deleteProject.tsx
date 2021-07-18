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
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import axios from 'axios';

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
export interface DeleteProjectProps {
  id: string;
}
export const DeleteProject: React.FC<DeleteProjectProps> = ({ id }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const history = useHistory();
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
    history.push('/admin/projet/deleteProject');
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/admin/projet');
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
          Project has been deleted !!
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
      <IconButton onClick={handleClickOpen} size="small">
        <DeleteIcon color="error" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <Backdrop className={classes.backdrop} open={openLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <DialogContentText color="inherit">
            Are you sure you want to delete this Project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenLoading(true);
              axios({
                url: '/api/admin/project/deleteProject',
                method: 'delete',
                data: { _id: id },
              })
                .then(() => {
                  handleClickAlert();

                  history.push('/admin/projet');
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                })
                .catch((err) => {
                  setOpenLoading(false);
                  console.log(err);
                  handleClickAlertError();
                });
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
