import {
  Box,
  Container,
  createStyles,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import MinimizeIcon from '@material-ui/icons/Minimize';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    border: {
      border: '1px solid #bdbdbd',
      borderRadius: '5px',
      padding: '10px',
      '&:hover': {
        borderColor: '#000000',
      },
      '&:active': {
        borderColor: '#009688',
      },
    },
  })
);

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
}
/* eslint-disable-next-line */
export interface projectDetailsProps {
  rowValue: row;
}
export const ProjectDetails: React.FC<projectDetailsProps> = ({ rowValue }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <IconButton size="small" onClick={handleClickOpen}>
        <ListAltIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        fullWidth
        maxWidth="md"
      >
        <IconButton
          color="primary"
          style={{ marginLeft: '95%' }}
          onClick={handleClose}
        >
          <CancelIcon color="secondary" fontSize="inherit" />
        </IconButton>
        <DialogContent>
          <Typography variant="h5" align="center">
            Project: {rowValue.name}
          </Typography>
          <Typography
            variant="h6"
            style={{ marginBottom: '10px' }}
            color="primary"
          >
            Description:
          </Typography>
          <TextField
            multiline
            fullWidth
            rows={5}
            // label="Project Description"
            defaultValue={rowValue.projectDetails}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />

          <Typography
            color="primary"
            variant="h6"
            style={{ marginBottom: '10px', marginTop: '10px' }}
          >
            Members Tasks:
          </Typography>
          <div className={classes.border} style={{ marginBottom: '10px' }}>
            {rowValue.membersTasks.map((memberTask) => {
              return (
                <div key={memberTask.searchMembers._id}>
                  <Typography variant="h6">
                    <PersonIcon style={{ verticalAlign: 'sub' }} />{' '}
                    {memberTask.searchMembers.name}
                  </Typography>
                  {memberTask.tasks.map((task) => {
                    return (
                      <div key={task}>
                        <Typography variant="body1">
                          {' '}
                          <MinimizeIcon fontSize="small" />
                          {task}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
