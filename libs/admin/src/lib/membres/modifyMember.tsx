import {
  Backdrop,
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
import React, { useState } from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { useHistory } from 'react-router';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';

function Alertt(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: theme.spacing(45),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    textFieldLeft: {
      width: theme.spacing(45),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
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
});

interface modifMember {
  _id: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
  phone: number;
  gender: string;
  joinDate: string;
}
/* eslint-disable-next-line */
export interface ModifyMemberFormProps {
  id: string;
  row: modifMember;
}
export const ModifyMemberForm: React.FC<ModifyMemberFormProps> = ({ row }) => {
  const initialValues = {
    _id: row._id,
    name: row.name,
    email: row.email,
    password: row.password,
    passwordConfirmation: row.password,
    birthday: row.birthday,
    phone: row.phone,
  };
  const classes = useStyles();
  const history = useHistory();
  const handleSubmit = (props) => {
    if (props === initialValues) {
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000);
    } else {
      setOpenLoading(true);
      axios({
        url: '/api/admin/membre/modifyMember',
        method: 'PUT',
        data: props,
      })
        .then(() => {
          history.push('/admin/membre');
          handleClickAlertModify();

          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((err) => {
          setOpenLoading(false);
          handleClickAlertError();
          console.log(err);
        });
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    history.push('/admin/membre/modifyMember');
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/admin/membre');
  };
  //Alert
  const [openAlert, setOpenAlert] = React.useState(false);
  //Alert success
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
        <Alert onClose={handleCloseAlertError} severity="error">
          error!!
        </Alert>
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
      <IconButton
        size="small"
        onClick={handleClickOpen}
        style={{ marginLeft: '18px' }}
      >
        <EditIcon color="primary" />
      </IconButton>

      <Dialog open={open} onClose={handleClose} scroll="body">
        <DialogContent>
          <Backdrop
            className={classes.backdrop}
            open={openLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h4">Modify member</Typography>
            <Collapse in={openAlert}>
              <Alert
                severity="warning"
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
                insert new Value!!
              </Alert>
            </Collapse>
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
                      required
                      type="password"
                      name="password"
                      variant="outlined"
                      label="New Password"
                      size="small"
                      className={classes.textFieldLeft}
                      helperText={<ErrorMessage name="password" />}
                      error={errors.password && touched.password}
                    />
                    <Field
                      as={TextField}
                      name="passwordConfirmation"
                      required
                      type="password"
                      variant="outlined"
                      label="Confirm Password"
                      size="small"
                      className={classes.textFieldLeft}
                      helperText={<ErrorMessage name="passwordConfirmation" />}
                      error={
                        errors.passwordConfirmation &&
                        touched.passwordConfirmation
                      }
                    />
                    <FormControl required>
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

                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type="submit"
                      >
                        Modify
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
    </React.Fragment>
  );
};
