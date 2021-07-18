import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
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
import { ErrorMessage, Field, Form, Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { useHistory } from 'react-router';
import axios from 'axios';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    task: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    button: {
      width: theme.spacing(20),
      margin: theme.spacing(2),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

const initialValues = {
  name: '',
  projectDetails: '',

  membersTasks: [
    {
      searchMembers: { _id: '', name: '' },
      tasks: [''],
    },
  ],
  progress: '0',
  etat: 'In progress',
  date: new Date().toLocaleDateString(),
  tasksNumber: '0',
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name Project is a required field'),
  projectDetails: Yup.string().required('Project Details is a required field'),
  membersTasks: Yup.array().of(
    Yup.object().shape({
      searchMembers: Yup.object({
        _id: Yup.string().required('required field'),
        name: Yup.string().required('required field'),
      }),
      tasks: Yup.array().of(
        Yup.string().typeError('required field').required('required field')
      ),
    })
  ),
});
interface data {
  _id: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
  phone: number;
  gender: string;
  joinDate: string;
}

export const AddProjet = () => {
  const classes = useStyles();
  const history = useHistory();

  const [IdMember, setIdMember] = useState<data[]>([]);

  const [open, setOpen] = React.useState(false);

  //IdMember
  useEffect(() => {
    const getMembersData = async () => {
      await axios
        .get('/api/admin/project/name&id')
        .then((response) => {
          const data = response.data;
          setIdMember(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMembersData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    history.push('/admin/projet/addProject');
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/admin/projet');
  };
  const handleSubmit = (props) => {
    const notifMember = [];
    props.membersTasks.map((memberTask) => {
      notifMember.push(memberTask.searchMembers._id);
      return notifMember;
    });

    const notif = {
      titre: 'project',
      text: 'New Project',
      name: props.name,
      color: '#6fbf73',
      membersId: notifMember,
      date: new Date().toLocaleDateString(),
    };
    axios({
      url: '/api/admin/project/notif',
      method: 'post',
      data: notif,
    });

    const data = {
      name: props.name,
      projectDetails: props.projectDetails,
      membersTasks: props.membersTasks,
      progress: '0',
      etat: 'In Progress',
      date: new Date().toLocaleDateString(),
      tasksNumber: '' + props.membersTasks.length,
    };

    setOpenLoading(true);
    axios({
      url: 'api/admin/project/addProject',
      method: 'post',
      data: data,
    })
      .then(() => {
        history.push('/admin/projet');
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
    <Container>
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
          New Project has been added !!
        </Alert>
      </Snackbar>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add new Project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <div>
            <Backdrop
              className={classes.backdrop}
              open={openLoading}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Typography variant="h4">Add New Project</Typography>
            <Formik
              validateOnChange={false}
              validateOnBlur={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form noValidate autoComplete="off">
                  <Field
                    required
                    fullWidth
                    as={TextField}
                    name="name"
                    variant="outlined"
                    className={classes.textField}
                    label="Project Name"
                    size="small"
                    helperText={<ErrorMessage name="name" />}
                    error={errors.name && touched.name}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    label="Projet Details"
                    name="projectDetails"
                    className={classes.textField}
                    fullWidth
                    multiline
                    rows={4}
                    helperText={<ErrorMessage name="projectDetails" />}
                    error={errors.projectDetails && touched.projectDetails}
                  />

                  <FieldArray
                    name="membersTasks"
                    render={(array) => {
                      const { push, remove } = array;
                      const membersTasks = values.membersTasks;

                      return (
                        <React.Fragment>
                          {membersTasks.map(
                            (membersTask: string, index: number) => {
                              return (
                                <React.Fragment key={index}>
                                  <div style={{ display: 'flex' }}>
                                    <div
                                      style={{
                                        width: '40%',
                                        marginRight: '10px',
                                      }}
                                    >
                                      <Autocomplete
                                        size="small"
                                        options={IdMember}
                                        getOptionLabel={(option) =>
                                          option ? option._id : ''
                                        }
                                        getOptionSelected={(option, value) =>
                                          option.value === value.value
                                        }
                                        value={
                                          values.membersTasks[index]
                                            .searchMembers
                                        }
                                        onChange={(
                                          e: React.ChangeEvent,
                                          value
                                        ) => {
                                          setFieldValue(
                                            `membersTasks[${index}].searchMembers`,
                                            value || { _id: '', name: '' } || ''
                                          );
                                        }}
                                        renderInput={(params) => {
                                          return (
                                            <div>
                                              <Field
                                                as={TextField}
                                                helperText={
                                                  <ErrorMessage
                                                    name={`membersTasks[${index}].searchMembers._id`}
                                                  />
                                                }
                                                error={
                                                  (errors.membersTasks
                                                    ? errors.membersTasks[index]
                                                      ? errors.membersTasks[
                                                          index
                                                        ].searchMembers
                                                        ? errors.membersTasks[
                                                            index
                                                          ].searchMembers._id
                                                          ? true
                                                          : false
                                                        : false
                                                      : false
                                                    : false) &&
                                                  (touched.membersTasks
                                                    ? touched.membersTasks[
                                                        index
                                                      ]
                                                      ? touched.membersTasks[
                                                          index
                                                        ].searchMembers
                                                        ? touched.membersTasks[
                                                            index
                                                          ].searchMembers._id
                                                          ? true
                                                          : false
                                                        : false
                                                      : false
                                                    : false)
                                                }
                                                className={classes.textField}
                                                {...params}
                                                label="Search for Member by Id"
                                                variant="outlined"
                                              />
                                            </div>
                                          );
                                        }}
                                      />
                                      <Typography
                                        variant="body1"
                                        style={{ marginLeft: '5px' }}
                                      >
                                        Member Name:{' '}
                                        {
                                          values.membersTasks[index]
                                            .searchMembers.name
                                        }
                                      </Typography>
                                    </div>

                                    <FieldArray
                                      name={`membersTasks[${index}].tasks`}
                                      render={(fieldArrayProps) => {
                                        const {
                                          push,
                                          remove,
                                        } = fieldArrayProps;

                                        const memberTache =
                                          membersTasks[index].tasks;

                                        return (
                                          <div
                                            style={{
                                              width: '100%',
                                            }}
                                          >
                                            {memberTache.map(
                                              (
                                                membersTask: string,
                                                taskIndex: number
                                              ) => {
                                                return (
                                                  <React.Fragment
                                                    key={taskIndex}
                                                  >
                                                    <Field
                                                      as={TextField}
                                                      style={{
                                                        width: '85%',
                                                      }}
                                                      variant="outlined"
                                                      name={`membersTasks[${index}].tasks[${taskIndex}]`}
                                                      label={`Task ${
                                                        taskIndex + 1
                                                      }`}
                                                      size="small"
                                                      className={classes.task}
                                                      helperText={
                                                        <ErrorMessage
                                                          name={`membersTasks[${index}].tasks[${taskIndex}]`}
                                                        />
                                                      }
                                                      error={
                                                        (errors.membersTasks
                                                          ? errors.membersTasks[
                                                              index
                                                            ]
                                                            ? errors
                                                                .membersTasks[
                                                                index
                                                              ].tasks
                                                              ? errors
                                                                  .membersTasks[
                                                                  index
                                                                ].tasks[
                                                                  taskIndex
                                                                ]
                                                                ? true
                                                                : false
                                                              : false
                                                            : false
                                                          : false) &&
                                                        (touched.membersTasks
                                                          ? touched
                                                              .membersTasks[
                                                              index
                                                            ]
                                                            ? touched
                                                                .membersTasks[
                                                                index
                                                              ].tasks
                                                              ? touched
                                                                  .membersTasks[
                                                                  index
                                                                ].tasks[
                                                                  taskIndex
                                                                ]
                                                                ? true
                                                                : false
                                                              : false
                                                            : false
                                                          : false)
                                                      }
                                                    />

                                                    <IconButton
                                                      style={{
                                                        marginTop: '15px',
                                                      }}
                                                      size="small"
                                                      color="secondary"
                                                      onClick={() => {
                                                        if (taskIndex > 0) {
                                                          remove(taskIndex);
                                                        }
                                                      }}
                                                    >
                                                      <HighlightOffRoundedIcon />
                                                    </IconButton>
                                                    <IconButton
                                                      style={{
                                                        marginTop: '15px',
                                                      }}
                                                      size="small"
                                                      color="primary"
                                                      onClick={() => {
                                                        push(['']);
                                                      }}
                                                    >
                                                      <ControlPointIcon />
                                                    </IconButton>
                                                  </React.Fragment>
                                                );
                                              }
                                            )}
                                          </div>
                                        );
                                      }}
                                    />
                                  </div>

                                  <Button
                                    className={classes.textField}
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => {
                                      push({
                                        searchMembers: { _id: '', name: '' },
                                        tasks: [''],
                                      });
                                    }}
                                  >
                                    Add Member
                                  </Button>
                                  <Button
                                    className={classes.textField}
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => {
                                      if (index > 0) {
                                        remove(index);
                                      }
                                    }}
                                  >
                                    Remove Member
                                  </Button>
                                </React.Fragment>
                              );
                            }
                          )}
                        </React.Fragment>
                      );
                    }}
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
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
