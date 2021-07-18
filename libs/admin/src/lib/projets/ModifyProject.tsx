import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Collapse,
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
import React, { Fragment, useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
import CloseIcon from '@material-ui/icons/Close';

function Alertt(props: AlertProps) {
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

export interface row {
  _id: string;
  name: string;
  etat: string;
  progress: number;
  projectDetails: string;
  membersTasks: {
    searchMembers: { _id: string; name: string };
    tasks: string[];
  }[];
  tasksNumber: number;
}

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
/* eslint-disable-next-line */
export interface ModifyProjectProps {
  rowValue: row;
}

export const ModifyProject: React.FC<ModifyProjectProps> = ({ rowValue }) => {
  const history = useHistory();

  const initialValues = {
    _id: rowValue._id,
    name: rowValue.name,
    projectDetails: rowValue.projectDetails,

    membersTasks: rowValue.membersTasks,
    progress: rowValue.progress,
    etat: 'In Progress',
    tasksNumber: rowValue.tasksNumber,
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    history.push('/admin/projet/modifyProjet');
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/admin/projet');
  };
  const handleSubmit = (props) => {
    const pr =
      (props.progress / props.membersTasks.length) * initialValues.tasksNumber;

    const data = {
      _id: props._id,
      name: props.name,
      projectDetails: props.projectDetails,
      membersTasks: props.membersTasks,
      progress: '0',
      etat: 'In Progress',
      date: new Date().toLocaleDateString(),
      tasksNumber: props.membersTasks.length,
    };

    if (props === initialValues) {
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000);
    } else {
      setOpenLoading(true);
      axios({
        url: '/api/admin/projet/modifyProject',
        method: 'PUT',
        data: data,
      })
        .then(() => {
          history.push('/admin/projet');
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

  //IdMember
  const [IdMember, setIdMember] = useState<data[]>([]);
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
          Project has been modified !!
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
          <div>
            <Typography variant="h4">Add New Project</Typography>
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
                                        width: '35%',
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
    </React.Fragment>
  );
};
