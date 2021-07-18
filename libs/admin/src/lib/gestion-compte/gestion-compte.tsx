import {
  Button,
  Collapse,
  Container,
  createStyles,
  Divider,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import photo from '../avatar.jpg';
import * as EmailValidator from 'email-validator';

import FileBase from 'react-file-base64';

import './gestion-compte.module.css';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
    },
    image: {
      borderRadius: '50%',
      width: '150px',
      height: '150px',
      objectFit: 'contain',
    },
    center: {
      marginTop: '30px',
      textAlign: 'center',
    },
    textField: {
      width: '50%',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      verticalAlign: 'sub',
    },
    button: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  })
);

/* eslint-disable-next-line */
export interface GestionCompteProps {}

export const GestionCompte = ({ memberInfo }) => {
  useEffect(() => {
    const userAuthenticated = async () => {
      await axios
        .get('/api/isMemberAuth', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        })
        .then(async (res) => {
          await axios({
            url: 'api/findMember',
            method: 'post',
            data: { id: res.data },
          }).then((ress) => {
            setName(ress.data.name);
          });
        });
    };
    userAuthenticated();
  }, []);
  //name
  const [name, setName] = useState<string>(memberInfo.name);
  const [nameEdit, setnameEdit] = useState<boolean>(true);
  const [nameSave, setnamenameSave] = useState<string>('none');
  const [nameError, setNameError] = useState<boolean>(false);
  const [textName, setTextName] = useState<string>('');
  const nameValidation = /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/;
  const [openAlertName, setopenAlertName] = React.useState(false);

  //email
  const [email, setEmail] = useState<string>(memberInfo.email);
  const [emailEdit, setEmailEdit] = useState<boolean>(true);
  const [emailError, setemailError] = useState<boolean>(false);
  const [emailSave, setEmailSave] = useState<string>('none');
  const [emailtext, setEmailtext] = useState<string>('');
  const [openAlertEmail, setopenAlertEmail] = React.useState(false);

  //password
  const [password, setPassword] = useState<string>(memberInfo.password);
  const [confPassword, setConfPassword] = useState<string>(memberInfo.password);
  const [passwordSave, setPasswordSave] = useState<string>('none');
  const [passwordEdit, setPasswordEdit] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [textPassword, setTextPassword] = useState<string>('');
  const [openAlertPassword, setopenAlertPassword] = React.useState(false);

  //phone
  const [phone, setPhone] = useState<string>(memberInfo.phone);
  const [phoneEdit, setPhoneEdit] = useState<boolean>(true);
  const [phoneSave, setPhoneSave] = useState<string>('none');
  const phoneValidation = /^[0-9]{8}$/;
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [textPhone, setTextPhone] = useState<string>('');
  const [openAlertPhone, setopenAlertPhone] = React.useState(false);

  //image
  const [image, setImage] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>();
  const [preview, setPreview] = useState<string>();
  const [displayImg, setDisplayImg] = useState<string>('none');
  const [openAlertImg, setopenAlertImg] = React.useState(false);

  //error
  const [openAlertError, setopenAlertError] = React.useState(false);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(memberInfo.img); 
    }
  }, [image, memberInfo.img]);

  //new value
  const [valueAlert, setValurAlert] = useState<boolean>(false);

  const classes = useStyles();

  return (
    <Container>
      <Paper className={classes.paper} elevation={5}>
        {/* new value */}
        <Collapse in={valueAlert}>
          <Alert
            severity="warning"
            action={
              <IconButton
                color="inherit"
                size="small"
                onClick={() => {
                  setopenAlertImg(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            insert new value
          </Alert>
        </Collapse>
        {/* error */}
        <Collapse in={openAlertError}>
          <Alert
            severity="error"
            action={
              <IconButton
                color="inherit"
                size="small"
                onClick={() => {
                  setopenAlertImg(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            error
          </Alert>
        </Collapse>
        <Collapse in={openAlertImg}>
          <Alert
            action={
              <IconButton
                color="inherit"
                size="small"
                onClick={() => {
                  setopenAlertImg(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Image Updated
          </Alert>
        </Collapse>
        <Collapse in={openAlertName}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setopenAlertName(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Name Updated
          </Alert>
        </Collapse>
        <Collapse in={openAlertEmail}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setopenAlertEmail(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Email Updated
          </Alert>
        </Collapse>
        <Collapse in={openAlertPassword}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setopenAlertPassword(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Password Updated
          </Alert>
        </Collapse>
        <Collapse in={openAlertPhone}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setopenAlertPhone(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Phone Updated
          </Alert>
        </Collapse>
        {/* image  */}
        <div>
          <img
            src={preview}
            alt=""
            className={classes.image}
            // onClick={() => {
            //   setImage(null);
            // }}
          />
          <input
            name="img"
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files[0];
              if (file && file.type.substr(0, 5) === 'image') {
                setImage(file);
                setDisplayImg('');
              } else {
                setImage(null);
                setDisplayImg('none');
              }
            }}
          />
        </div>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            fileInputRef.current.click();
          }}
        >
          Select Profile Picture
        </Button>
        <Button
          style={{ display: displayImg }}
          variant="outlined"
          color="primary"
          size="small"
          className={classes.button}
          onClick={() => {
            if (preview === memberInfo.img) {
              setValurAlert(true);
              setTimeout(() => {
                setValurAlert(false);
              }, 1000);
            } else {
              axios({
                url: '/api/updateImg',
                method: 'PUT',
                data: { _id: memberInfo._id, img: preview },
              })
                .then(() => {
                  setDisplayImg('none');

                  setopenAlertImg(true);

                  setTimeout(() => {
                    setopenAlertImg(false);
                    window.location.reload(false);
                  }, 1000);
                })
                .catch((err) => {
                  setopenAlertError(true);
                  setTimeout(() => {
                    setopenAlertError(false);
                    window.location.reload(false);
                  }, 1000);
                });
            }

            // axios({
            //   url: '/api/updateImg',
            //   method: 'PUT',
            //   data: { _id: memberInfo._id, img: preview },
            // });
          }}
        >
          Save
        </Button>
        <Divider variant="middle" />
        <div className={classes.center}>
          <Typography variant="h5" style={{ marginBottom: '10px' }}>
            Account Settings
          </Typography>
          <div>
            <TextField
              onChange={(e) => {
                setName(e.target.value);
              }}
              disabled={nameEdit}
              className={classes.textField}
              defaultValue={name}
              variant="outlined"
              label="Full Name"
              error={nameError}
              helperText={textName}
            />
            <Button
              onClick={() => {
                setnameEdit(!nameEdit);
                setnamenameSave(nameEdit ? '' : 'none');
              }}
              variant="outlined"
              color="primary"
              size="large"
              className={classes.button}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                if (!name) {
                  setValurAlert(true);
                  setTimeout(() => {
                    setValurAlert(false);
                  }, 1000);
                } else {
                  if (nameValidation.test(name)) {
                    axios({
                      url: '/api/updateName',
                      method: 'PUT',
                      data: { _id: memberInfo._id, name: name },
                    })
                      .then(() => {
                        setnamenameSave('none');
                        setnameEdit(!nameEdit);
                        setopenAlertName(true);
                        setTimeout(() => {
                          setopenAlertName(false);
                          window.location.reload(false);
                        }, 1000);
                      })
                      .catch((err) => {
                        setopenAlertError(true);
                        setTimeout(() => {
                          setopenAlertError(false);
                        }, 1000);
                      });
                  } else {
                    setNameError(true);
                    setTextName(
                      'required field and Name shoud not contain numbers'
                    );
                  }
                }
              }}
              style={{ display: nameSave }}
              variant="outlined"
              color="primary"
              size="large"
              className={classes.button}
            >
              Save
            </Button>
          </div>
          <div>
            <TextField
              disabled={emailEdit}
              className={classes.textField}
              defaultValue={email}
              variant="outlined"
              label="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={emailError}
              helperText={emailtext}
            />
            <Button
              onClick={() => {
                setEmailEdit(!emailEdit);
                setEmailSave(emailEdit ? '' : 'none');
              }}
              variant="outlined"
              color="primary"
              size="large"
              className={classes.button}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              className={classes.button}
              style={{ display: emailSave }}
              onClick={() => {
                if (email === memberInfo.email) {
                  setValurAlert(true);
                  setTimeout(() => {
                    setValurAlert(false);
                  }, 1000);
                } else {
                  if (EmailValidator.validate(email)) {
                    axios({
                      url: '/api/updateEmail',
                      method: 'PUT',
                      data: { _id: memberInfo._id, email: email },
                    })
                      .then(() => {
                        setEmailSave('none');
                        setEmailEdit(!emailEdit);
                        setopenAlertEmail(true);
                        setTimeout(() => {
                          setopenAlertName(false);
                          window.location.reload(false);
                        }, 1000);
                      })
                      .catch((err) => {
                        setopenAlertError(true);
                        setTimeout(() => {
                          setopenAlertError(false);
                        }, 1000);
                      });
                  } else {
                    setemailError(true);
                    setEmailtext(
                      'required field and Name shoud not contain numbers'
                    );
                  }
                }
              }}
            >
              Save
            </Button>
          </div>
          {/* password */}
          <div>
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              disabled={passwordEdit}
              className={classes.textField}
              defaultValue={password}
              variant="outlined"
              label="Password"
              type="password"
              error={passwordError}
              helperText={textPassword}
            />
            <div style={{ display: passwordSave }}>
              <TextField
                onChange={(e) => {
                  setConfPassword(e.target.value);
                }}
                className={classes.textField}
                defaultValue={confPassword}
                variant="outlined"
                label="Password"
                type="password"
                error={passwordError}
                helperText={textPassword}
              />
            </div>

            <Button
              onClick={() => {
                setPasswordEdit(!passwordEdit);
                setPasswordSave(passwordSave ? '' : 'none');
              }}
              variant="outlined"
              color="primary"
              size="large"
              className={classes.button}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                if (password === memberInfo.password) {
                  setValurAlert(true);
                  setTimeout(() => {
                    setValurAlert(false);
                  }, 1000);
                } else {
                  if (
                    password.length >= 8 &&
                    password.length <= 20 &&
                    password === confPassword
                  ) {
                    axios({
                      url: '/api/updatePassword',
                      method: 'PUT',
                      data: { _id: memberInfo._id, password: password },
                    })
                      .then(() => {
                        setPasswordSave('none');
                        setPasswordEdit(!passwordEdit);
                        setopenAlertPassword(true);
                        setTimeout(() => {
                          setopenAlertPassword(false);
                          window.location.reload(false);
                        }, 1000);
                      })
                      .catch((err) => {
                        setopenAlertError(true);
                        setTimeout(() => {
                          setopenAlertEmail(false);
                        }, 1000);
                      });
                  } else {
                    setPasswordError(true);
                    setTextPassword(
                      'password must be between 8 and 20 characters'
                    );
                  }
                }
              }}
              variant="outlined"
              color="primary"
              size="large"
              className={classes.button}
              style={{ display: passwordSave }}
            >
              Save
            </Button>
          </div>

          <div>
            <TextField
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className={classes.textField}
              defaultValue={phone}
              disabled={phoneEdit}
              variant="outlined"
              label="Phone Number"
              error={phoneError}
              helperText={textPhone}
            />
            <Button
              variant="outlined"
              color="primary"
              size="large"
              className={classes.button}
              onClick={() => {
                setPhoneEdit(!phoneEdit);
                setPhoneSave(phoneSave ? '' : 'none');
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                if (phone === memberInfo.phone) {
                  setValurAlert(true);
                  setTimeout(() => {
                    setValurAlert(false);
                  }, 1000);
                } else {
                  if (phoneValidation.test(phone)) {
                    axios({
                      url: '/api/updatePhone',
                      method: 'PUT',
                      data: { _id: memberInfo._id, phone: phone },
                    })
                      .then(() => {
                        setPhoneSave('none');
                        setPhoneEdit(!phoneEdit);
                        setopenAlertPhone(true);
                        setTimeout(() => {
                          setopenAlertPhone(false);
                          window.location.reload(false);
                        }, 1000);
                      })
                      .catch((err) => {
                        setopenAlertPhone(true);
                        setTimeout(() => {
                          setopenAlertPhone(false);
                        }, 1000);
                      });
                  } else {
                    setPhoneError(true);
                    setTextPhone('Phone number must be 8 digits');
                  }
                }
              }}
              style={{ display: phoneSave }}
              variant="outlined"
              color="primary"
              size="large"
              className={classes.button}
            >
              Save
            </Button>
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default GestionCompte;
