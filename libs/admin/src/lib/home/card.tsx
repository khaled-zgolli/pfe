import {
  Box,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';

import users from './admin.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '250px',
      height: '120px',
    },
    span: {
      width: '120px',
      height: '120px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      width: '50px',
      height: '50px',
    },
  })
);

/* eslint-disable-next-line */
export interface cardProps {
  color: string;
  image: string;
  type: string;
  number: string;
}

export const Card: React.FC<cardProps> = ({ color, image, type, number }) => {
  const classes = useStyles();
  return (
    <Paper elevation={6} className={classes.card}>
      <Box display="flex">
        <Box>
          <Typography variant="h4">
            <div className={classes.span} style={{ backgroundColor: color }}>
              <img src={image} alt="" className={classes.img} />
            </div>
          </Typography>
        </Box>

        <Box
          style={{ marginLeft: '15px', textAlign: 'center', marginTop: '10px' }}
        >
          <Typography variant="h2">{number}</Typography>
          <Typography variant="overline">{type}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
