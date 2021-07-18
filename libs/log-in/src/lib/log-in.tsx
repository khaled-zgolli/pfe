import {
  Button,
  Checkbox,
  Collapse,
  Container,
  createStyles,
  FormControlLabel,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import logo from './logo-Proxym.png';

import './log-in.module.css';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('please enter a valid email'),

  password: Yup.string()
    .min(8, 'password must be between 8 and 20 characters')
    .required('No password provided.'),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(10),
      textAlign: 'center',
    },
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block',
    },
    logo: {
      width: 300,
    },

    link: {
      marginTop: 5,
      display: 'block',
    },
  })
);

/* eslint-disable-next-line */
export interface LogInProps {}

export const LogIn: React.FC<LogInProps> = () => {
  const classes = useStyles();

  //alert
  const [openAlert, setOpenAlert] = React.useState(false);

  //login
  const [loginStatus, setLoginStatus] = useState(false);

  // const userAuthenticated = () => {
  //   axios
  //     .get('/api/isMemberAuth', {
  //       headers: {
  //         'x-access-token': localStorage.getItem('token'),
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };

  const handelSubmit = (props) => {
    axios({
      url: '/api/login',
      method: 'POST',
      data: props,
    }).then((res) => {
      console.log(res);
      if (res.data.auth) {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        setLoginStatus(true);
        if (res.data.admin) {
          window.location.assign('/admin');
        } else {
          window.location.assign('/membre');
        }
      } else {
        setOpenAlert(true);
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.root}>
        <img src={logo} alt="fsfds" className={classes.logo} />
        <Typography variant="h5">Sign in</Typography>
        <Collapse in={openAlert}>
          <Alert
            severity="error"
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
            Email or Password is incorrect
          </Alert>
        </Collapse>
      </div>

      <Formik
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handelSubmit}
      >
        {({ errors, touched }) => (
          <Form noValidate autoComplete="off">
            <Field
              as={TextField}
              className={classes.field}
              variant="outlined"
              label="Email Address"
              type="email"
              fullWidth
              required
              name="email"
              helperText={<ErrorMessage name="email" />}
              error={errors.email && touched.email}
            />

            <Field
              as={TextField}
              className={classes.field}
              variant="outlined"
              label="Password"
              type="Password"
              fullWidth
              required
              name="password"
              helperText={<ErrorMessage name="password" />}
              error={errors.password && touched.password}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
            >
              Sign in
            </Button>
            {/* <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  style={{ marginBottom: 5 }}
                />
              }
              label="Remember me"
            /> */}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LogIn;
