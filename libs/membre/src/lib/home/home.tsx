import {
  Box,
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
import newImg from './news.png';
import axios from 'axios';

const news = [
  {
    name: 'new1',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, possimus maiores. Ab excepturi sequi, quasi enim eos temporibus vel non. Quasi eveniet consectetur, alias deleniti ducimus vel veritatis consequatur ipsa?',
    date: '21-10-2021',
  },
  {
    name: 'new2',
    text:
      'Lorem ipsum dolor sit amet consectetui enim eos temporibus vel non. Quasi eveniet consectetur, alias deleniti ducimus vel veritatis consequatur ipsa? Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, possimus maiores. Ab excepturi sequi, quasi enim eos temporibus vel non. Quasi eveniet consectetur, alias deleniti ducimus vel veritatis consequatur ipsa?',
    date: '21-10-2021',
  },
];

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
      marginRight: theme.spacing(2),
    },
  })
);

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
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
          setDatas(datas.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getNewsList();
  }, []);
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
                  <Box flexGrow={1}>
                    <Typography variant="h6" color="primary">
                      {data.name}
                    </Typography>

                    <Box>
                      <Typography variant="subtitle2">{data.date}</Typography>
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

export default Home;
