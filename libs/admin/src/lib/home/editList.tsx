import {
  Backdrop,
  Button,
  CircularProgress,
  Collapse,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  Snackbar,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router';
import axios from 'axios';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      margin: theme.spacing(0.5),
      width: '70%',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

function Alertt(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/* eslint-disable-next-line */
export interface DeleteNewsProps {
  newsDetails: {
    name: string;
    img: string;
    text: string;
    _id: string;
    date: string;
  };
}

export const EditNews: React.FC<DeleteNewsProps> = ({ newsDetails }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const history = useHistory();
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');

  const [imgError, setImgError] = useState(false);
  const [imgErrorMsg, setImgErrorMsg] = useState('');

  const [textError, setTextError] = useState(false);
  const [textErrorMsg, setTextErrorMsg] = useState('');

  const [alertValue, setAlertValue] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setNameError(false);
    setNameErrorMsg('');

    setImgError(false);
    setImgErrorMsg('');

    setTextError(false);
    setTextErrorMsg('');
    if (
      state.name === '' ||
      state.img === '' ||
      state.text === '' ||
      (state.name === newsDetails.name &&
        state.img === newsDetails.img &&
        state.text === newsDetails.text)
    ) {
      if (state.name === '') {
        setNameError(true);
        setNameErrorMsg('Required Field');
      }
      if (state.img === '') {
        setImgError(true);
        setImgErrorMsg('Required Field');
      }
      if (state.text === '') {
        setTextError(true);
        setTextErrorMsg('Required Field');
      }
      if (
        state.name === newsDetails.name &&
        state.img === newsDetails.img &&
        state.text === newsDetails.text
      ) {
        setAlertValue(true);
        setTimeout(() => {
          setAlertValue(false);
        }, 2000);
      }
    } else {
      setOpenLoading(true);

      axios({
        url: '/api/admin/updateNews',
        method: 'PUT',
        data: state,
      })
        .then(() => {
          handleClickAlertModify();
          setOpenLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch(() => {
          handleClickAlertModify();
          setOpenLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [state, setState] = useState({
    _id: newsDetails._id,
    name: newsDetails.name,
    text: newsDetails.text,
    img: newsDetails.img,
    date: new Date().toLocaleDateString(),
  });

  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const reader = new FileReader();
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState((prevState) => ({
          ...prevState,
          img: reader.result as string,
        }));
      };
      reader.readAsDataURL(image);
    } else {
      setPreview('');
    }
  }, [image]);

  const [openAlertModify, setOpenAlertModify] = React.useState(false);
  const handleClickAlertModify = () => {
    setOpenAlertModify(true);
  };
  const handleCloseAlertModify = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlertModify(false);
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
        open={openAlertError}
        autoHideDuration={4000}
        onClose={handleCloseAlertError}
      >
        <Alertt onClose={handleCloseAlertError} severity="error">
          error!!
        </Alertt>
      </Snackbar>
      <Snackbar
        open={openAlertModify}
        autoHideDuration={4000}
        onClose={handleCloseAlertModify}
      >
        <Alertt onClose={handleCloseAlertModify} severity="success">
          Mumber has been modified !!
        </Alertt>
      </Snackbar>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        style={{ marginRight: '10px' }}
        onClick={handleClickOpen}
      >
        Edit
      </Button>

      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Delete</DialogTitle> */}
        <DialogContent>
          <Backdrop
            className={classes.backdrop}
            open={openLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ textAlign: 'center' }}
          >
            <Collapse in={alertValue}>
              <Alert
                severity="warning"
                action={
                  <IconButton
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAlertValue(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                insert new Value!!
              </Alert>
            </Collapse>
            <Typography variant="h5">Edit</Typography>
            <div style={{ width: '100%' }}>
              <TextField
                defaultValue={newsDetails.name}
                className={classes.textField}
                required
                name="name"
                variant="outlined"
                label="Name"
                size="small"
                fullWidth
                onChange={handleChange}
                error={nameError}
                helperText={nameErrorMsg}
              />
              <input
                required
                accept="image/*"
                name="img"
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files[0];
                  if (file && file.type.substr(0, 5) === 'image') {
                    setImage(file);
                  } else {
                    setImage(null);
                  }
                }}
              />
              <TextField
                defaultValue={newsDetails.text}
                onChange={handleChange}
                className={classes.textField}
                required
                multiline
                rows={4}
                name="text"
                variant="outlined"
                label="Name"
                size="small"
                fullWidth
                error={textError}
                helperText={textErrorMsg}
              />

              <div>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    history.push('/admin/list');
                  }}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  style={{ marginLeft: '10px' }}
                >
                  Edit
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
