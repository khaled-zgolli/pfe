import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Collapse,
  createStyles,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  makeStyles,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { Redirect, useHistory } from 'react-router';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';

function AlertNotif(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    textFieldLeft: {
      width: theme.spacing(55),
      margin: theme.spacing(1),
    },

    button: {
      width: theme.spacing(20),
      margin: theme.spacing(2),
    },

    addMember: {
      margin: theme.spacing(3),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  birthday: '',
  phone: '',
  gender: '',
  joinDate: new Date().toLocaleDateString(),
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/,
      'Name shoud not contain numbers'
    )
    .required('Name is a required fields'),
  email: Yup.string().email().required('please enter a valid email'),

  password: Yup.string()
    .min(8, 'password must be between 8 and 20 characters')
    .required('No password provided.'),

  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('No password provided.'),

  birthday: Yup.string().required('Birthday field is required'),

  phone: Yup.string()
    .min(8, 'Phone number must be 8 digits')
    .max(8, 'Phone number must be 8 digits')
    .required('Phone number must be 8 digits'),

  gender: Yup.string().required(''),
});

export const AddMembreForm = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = (props) => {
    setOpenLoading(true);
    //chat Member
    const chat = {
      username: props.name,
      secret: props.birthday,
      email: props.email,
    };

    axios({
      url: '/api/admin/membre/addMember',
      method: 'post',
      data: props,
    })
      .then((msg) => {
        if (msg.data.msg === 'Email is already exists') {
          setOpenAlertEmail(true);
          setTimeout(() => {
            setOpenAlertEmail(false);
          }, 2000);
        } else {
          axios({
            url: 'https://api.chatengine.io/users/',
            method: 'post',
            headers: {
              'PRIVATE-KEY': '48564454-b150-482c-8019-9dd3c206d2a9',
            },
            data: chat,
          });

          history.push('/admin/membre');
          handleClickAlert();

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        setOpenLoading(false);
        console.log(err);
        handleClickAlertError();
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    history.push('/admin/membre/addMember');
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/admin/membre');
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

  //AlertEmail
  const [openAlertEmail, setOpenAlertEmail] = React.useState(false);
  return (
    <div>
      <Snackbar
        open={openAlertError}
        autoHideDuration={4000}
        onClose={handleCloseAlertError}
      >
        <AlertNotif onClose={handleCloseAlertError} severity="error">
          error!!
        </AlertNotif>
      </Snackbar>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <AlertNotif onClose={handleCloseAlert} severity="success">
          New mumber has been added !!
        </AlertNotif>
      </Snackbar>
      <Box display="flex">
        <Box>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add New Member
          </Button>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <Backdrop
            className={classes.backdrop}
            open={openLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div>
            <Collapse in={openAlertEmail}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenAlertEmail(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Email is already exists
              </Alert>
            </Collapse>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
              Add New Member
            </Typography>

            <Formik
              validateOnChange={false}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form noValidate autoComplete="off">
                  <div style={{ display: 'block ' }}>
                    <Field
                      required
                      as={TextField}
                      name="name"
                      variant="outlined"
                      label="Full Name"
                      size="small"
                      className={classes.textFieldLeft}
                      helperText={<ErrorMessage name="name" />}
                      error={errors.name && touched.name}
                    />
                    <Field
                      as={TextField}
                      required
                      name="email"
                      variant="outlined"
                      label="Email"
                      size="small"
                      className={classes.textFieldLeft}
                      helperText={<ErrorMessage name="email" />}
                      error={errors.email && touched.email}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      required
                      type="password"
                      name="password"
                      variant="outlined"
                      label="Password"
                      size="small"
                      className={classes.textFieldLeft}
                      helperText={<ErrorMessage name="password" />}
                      error={errors.password && touched.password}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      name="passwordConfirmation"
                      required
                      type="password"
                      variant="outlined"
                      label="Password"
                      size="small"
                      className={classes.textFieldLeft}
                      helperText={<ErrorMessage name="passwordConfirmation" />}
                      error={
                        errors.passwordConfirmation &&
                        touched.passwordConfirmation
                      }
                    />
                    <FormControl required fullWidth>
                      <FormLabel style={{ textAlign: 'left' }}>
                        Birthday
                      </FormLabel>
                      <Field
                        as={TextField}
                        name="birthday"
                        required
                        type="date"
                        variant="outlined"
                        size="small"
                        className={classes.textField}
                        helperText={<ErrorMessage name="birthday" />}
                        error={errors.birthday && touched.birthday}
                      />
                    </FormControl>
                    <Field
                      fullWidth
                      required
                      name="phone"
                      as={TextField}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      label="Phone Number"
                      placeholder="+216"
                      helperText={<ErrorMessage name="phone" />}
                      error={errors.phone && touched.phone}
                    />
                    <div style={{ textAlign: 'center' }}>
                      <FormControl required>
                        <FormLabel>Gender</FormLabel>
                        <Field as={RadioGroup} name="gender" row>
                          <FormControlLabel
                            value="Male"
                            control={<Radio color="primary" />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="Female"
                            control={<Radio color="primary" />}
                            label="Female"
                          />
                        </Field>
                      </FormControl>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type="submit"
                      >
                        Submit
                      </Button>
                      <Button
                        onClick={handleClose}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
