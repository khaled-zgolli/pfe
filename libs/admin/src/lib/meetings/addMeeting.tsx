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
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      margin: theme.spacing(1),
      width: '70%',
    },
    textFieldDescription: {
      margin: theme.spacing(1),
    },
    button: {
      width: theme.spacing(20),
      margin: theme.spacing(2),
    },
    time: {
      margin: theme.spacing(1),
      width: theme.spacing(20),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);
const initialValues = {
  meetingName: '',
  date: '',
  begin: '',
  end: '',
  state: '',
  description: '',
  taches: '',
  members: [],
};

const validationSchema = Yup.object().shape({
  meetingName: Yup.string().required('Meeting Name is a required field'),
  date: Yup.string().required('Date is a required field'),
  begin: Yup.string().required('required field'),
  end: Yup.string().required('required field'),
  members: Yup.array().required('required field').min(1, 'required field'),
  description: Yup.string().required('required field'),
});

export const AddMeeting = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  //members
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getMembersData = async () => {
      await axios
        .get('/api/admin/project/name&id')
        .then((response) => {
          const data = response.data;
          setMembers(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMembersData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    history.push('/admin/meeting/addMeeting');
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/admin/meeting');
  };
  const handleSubmit = (props) => {
    const notifMember = [];
    props.members.map((member) => {
      notifMember.push(member._id);
      return notifMember;
    });
    const notif = {
      titre: 'reunion',
      text: 'New Meeting',
      name: props.meetingName,
      color: '#d7e360',
      membersId: notifMember,
      date: new Date().toLocaleDateString(),
    };
    axios({
      url: '/api/admin/Meeting/notif',
      method: 'post',
      data: notif,
    });

    setOpenLoading(true);
    axios({
      url: 'api/admin/meeting/addMeeting',
      method: 'post',
      data: props,
    })
      .then(() => {
        history.push('/admin/meeting');
        handleClickAlert();

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setOpenLoading(false);
        handleClickAlertError();
      });
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
    <div>
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
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          New meeting has been added !!
        </Alert>
      </Snackbar>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Meeting
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <Typography variant="h4" align="center">
            Add New Meeting
          </Typography>
          <Backdrop
            className={classes.backdrop}
            open={openLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Formik
            validateOnChange={false}
            validateOnBlur={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form noValidate autoComplete="off">
                <div style={{ textAlign: 'center' }}>
                  <Field
                    required
                    as={TextField}
                    name="meetingName"
                    variant="outlined"
                    label="MeetingName"
                    size="small"
                    className={classes.textField}
                    helperText={<ErrorMessage name="meetingName" />}
                    error={errors.meetingName && touched.meetingName}
                  />
                  <Field
                    as={TextField}
                    name="date"
                    required
                    type="date"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    helperText={<ErrorMessage name="date" />}
                    error={errors.date && touched.date}
                  />
                  <Box display="flex" justifyContent="center">
                    <Box>
                      <Field
                        as={TextField}
                        name="begin"
                        variant="outlined"
                        label="Begin"
                        type="time"
                        className={classes.time}
                        helperText={<ErrorMessage name="begin" />}
                        error={errors.begin && touched.begin}
                      />
                    </Box>
                    <Box>
                      <Field
                        name="end"
                        as={TextField}
                        variant="outlined"
                        label="End"
                        type="time"
                        className={classes.time}
                        helperText={<ErrorMessage name="end" />}
                        error={errors.end && touched.end}
                      />
                    </Box>
                  </Box>
                  <Autocomplete
                    onChange={(event, value) => {
                      setFieldValue('members', value);
                    }}
                    multiple
                    value={values.members}
                    options={members}
                    getOptionLabel={(option) => option._id}
                    renderInput={(params) => (
                      <TextField
                        className={classes.textField}
                        {...params}
                        variant="outlined"
                        label="Search for Member by Id"
                        helperText={<ErrorMessage name="members" />}
                        error={
                          (errors.members ? true : false) &&
                          (touched.members ? true : false)
                        }
                      />
                    )}
                  />
                  <Typography variant="body1" style={{ marginLeft: '5px' }}>
                    Members Names:{' '}
                    {values.members.map((member) => {
                      return <span key={member._id}>{member.name}, </span>;
                    })}{' '}
                  </Typography>
                </div>

                <Field
                  as={TextField}
                  className={classes.textFieldDescription}
                  required
                  fullWidth
                  multiline
                  rows={5}
                  name="description"
                  variant="outlined"
                  label="Meeting Description"
                  size="small"
                  helperText={<ErrorMessage name="description" />}
                  error={errors.description && touched.description}
                />

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
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};
