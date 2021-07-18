import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Collapse,
  createStyles,
  Dialog,
  DialogContent,
  IconButton,
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
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { useHistory } from 'react-router';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

function Alertt(props: AlertProps) {
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

const validationSchema = Yup.object().shape({
  meetingName: Yup.string().required('Meeting Name is a required field'),
  date: Yup.string().required('Date is a required field'),
  begin: Yup.string().required('required field'),
  end: Yup.string().required('required field'),
  members: Yup.array().required('required field').min(1, 'required field'),
  description: Yup.string().required('required field'),
});

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
export interface EditMeetingProps {
  rowValue: row;
}

export const EditMeeting: React.FC<EditMeetingProps> = ({ rowValue }) => {
  const history = useHistory();
  const initialValues = {
    _id: rowValue._id,
    meetingName: rowValue.meetingName,
    date: rowValue.date,
    begin: rowValue.begin,
    end: rowValue.end,
    description: rowValue.description,
    members: rowValue.members,
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    history.push('/admin/meeting/modifyMeeting');
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/admin/meeting');
  };
  const handleSubmit = (props) => {
    if (props === initialValues) {
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000);
    } else {
      setOpenLoading(true);
      axios({
        url: '/api/admin/meeting/modifyMeeting',
        method: 'PUT',
        data: props,
      })
        .then(() => {
          history.push('/admin/meeting');
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
          Meeting has been modified !!
        </Alertt>
      </Snackbar>
      <IconButton color="primary" onClick={handleClickOpen} size="small">
        <EditIcon />
      </IconButton>
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
          <Typography variant="h4" align="center">
            Modify Meeting
          </Typography>
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
                    getOptionSelected={(option, value) =>
                      option._id === value._id
                    }
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
    </React.Fragment>
  );
};
