import {
  Button,
  Collapse,
  createStyles,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      margin: theme.spacing(0.5),
      width: '70%',
    },
  })
);

// const initialValues = {
//   name: '',
//   text: '',
//   date: new Date(),
//   img: '',
// };

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('required field'),
//   text: Yup.string()
//     .max(400, 'This field has to be less than 400 characters')
//     .required('required field'),
//   img: Yup.string().required('required field'),
// });

export const FormNews = () => {
  const classes = useStyles();
  const history = useHistory();
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');

  const [imgError, setImgError] = useState(false);
  const [imgErrorMsg, setImgErrorMsg] = useState('');

  const [textError, setTextError] = useState(false);
  const [textErrorMsg, setTextErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setNameError(false);
    setNameErrorMsg('');

    setImgError(false);
    setImgErrorMsg('');

    setTextError(false);
    setTextErrorMsg('');
    if (state.name === '' || state.img === '' || state.text === '') {
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
    } else {
      console.log(state);

      axios({
        url: '/api/admin/addNews',
        method: 'post',
        data: state,
      })
        .then(() => {
          setAlertSuccess(true);
          setTimeout(() => {
            setAlertSuccess(false);
            window.location.reload();
          }, 1000);
        })
        .catch(() => {
          setAlertError(true);
          setTimeout(() => {
            setAlertError(false);
            window.location.reload();
          }, 1000);
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
    name: '',
    text: '',
    img: '',
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

  const [alertSuccess, setAlertSuccess] = useState(false);

  const [alertError, setAlertError] = useState(false);
  return (
    <div style={{ textAlign: 'center' }}>
      <Collapse in={alertSuccess}>
        <Alert
          severity="success"
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                setAlertSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Success
        </Alert>
      </Collapse>
      <Collapse in={alertError}>
        <Alert
          severity="error"
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                setAlertError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Error
        </Alert>
      </Collapse>
      <Typography variant="h5">Add News</Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div style={{ width: '100%' }}>
          <TextField
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
    </div>
  );
};
