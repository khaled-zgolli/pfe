import {
  Box,
  Button,
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import { ProjectTasks } from './ProjectTasks';
import axios from 'axios';
import id from 'date-fns/esm/locale/id/index.js';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      margin: theme.spacing(1),
    },
    iconProject: {
      verticalAlign: 'sub',
      marginRight: theme.spacing(1),
    },
    projet: {
      margin: theme.spacing(1),
    },
  })
);

export const ProjectList = ({ id }) => {
  const classes = useStyles();

  const [datas, setDatas] = useState([
    {
      _id: '',
      date: '',
      name: '',
      progress: 0,
      tasksNumber: 0,
      projectDetails: '',
      membersTasks: [
        { tasks: [''], _id: '', searchMembers: { _id: '', name: '' } },
      ],
    },
  ]);

  useEffect(() => {
    const getMemberProjectData = async () => {
      await axios
        .get('/api/member/project')
        .then((response) => {
          const data = response.data;
          setDatas(data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMemberProjectData();
  }, []);

  return (
    <div>
      <Typography variant="h4">
        <AccountTreeIcon fontSize="large" className={classes.iconProject} />
        Projects
      </Typography>
      <Divider className={classes.divider} />

      {datas.map(
        (data: {
          _id: string;
          date: string;
          name: string;
          progress: number;
          tasksNumber: number;
          projectDetails: string;
          membersTasks: {
            tasks: string[];
            _id: string;
            searchMembers: {
              _id: string;
              name: string;
            };
          }[];
        }) => {
          return data.membersTasks.map((membersTask) => {
            if (membersTask.searchMembers._id === id) {
              return (
                <div key={data._id} className={classes.projet}>
                  <Box display="flex">
                    <Box flexGrow={1} style={{ marginBottom: '10px' }}>
                      <Typography variant="h5">
                        Project name: {data.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">{data.date}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      {data.projectDetails}
                    </Typography>
                  </Box>

                  <div style={{ textAlign: 'right' }}>
                    <ProjectTasks
                      data={membersTask}
                      id={data._id}
                      projects={data}
                    />
                  </div>
                  <Divider className={classes.divider} />
                </div>
              );
            }
            return <div key={data._id}></div>;
          });
        }
      )}
    </div>
  );
};
