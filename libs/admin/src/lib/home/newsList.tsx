import {
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AnnouncementIcon from '@material-ui/icons/Announcement';

import './home.module.css';
import axios from 'axios';

import { DeleteNews } from './deleteList';
import { EditNews } from './editList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
    },
    iconNew: {
      verticalAlign: 'sub',
      marginRight: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(1),
    },
    img: {
      objectFit: 'cover',
      width: '200px',
      height: '150px',
      marginRight: theme.spacing(2),
    },
  })
);

/* eslint-disable-next-line */
export interface HomeProps {}

export function NewsList(props: HomeProps) {
  const classes = useStyles();
  const [datas, setDatas] = useState([
    { name: '', img: '', text: '', _id: '', date: '' },
  ]);

  useEffect(() => {
    const getNewsList = async () => {
      await axios
        .get('/api/admin/news')
        .then((response) => {
          const datas = response.data;
          setDatas(datas);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getNewsList();
  }, []);

  //dialog

  return (
    <Container>
      <Paper className={classes.paper} elevation={5}>
        <Typography variant="h4">
          <AnnouncementIcon fontSize="large" className={classes.iconNew} />
          News
        </Typography>
        <Divider className={classes.divider} />

        {datas.map((data) => {
          return (
            <div key={data.name}>
              <Box display="flex">
                <Box>
                  <img src={data.img} alt="img" className={classes.img} />
                </Box>
                <Box>
                  <EditNews newsDetails={data} />
                  <DeleteNews id={data._id} />
                  <Box display="flex">
                    <Box flexGrow={1}>
                      <Typography variant="h6" color="primary">
                        {data.name}
                      </Typography>
                      <Box>
                        <Typography variant="subtitle2">{data.date}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body1">{data.text}</Typography>
                </Box>
              </Box>
              <Divider className={classes.divider} />
            </div>
          );
        })}
      </Paper>
    </Container>
  );
}

export default NewsList;
