import { Grid, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Card } from './card';
import admin from './admin.png';
import users from './users.png';
import projects from './projects.png';
import meetings from './meetings.png';
import Charts from './chart';
import PieChart from './pieChart';
import { FormNews } from './formNews';

import './home.module.css';
import axios from 'axios';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Acceuil(props: HomeProps) {
  const [MemeberData, setMemeberData] = useState([]);

  useEffect(() => {
    const getMembersData = async () => {
      await axios
        .get('/api/admin/membre')
        .then((response) => {
          const data = response.data;
          setMemeberData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMembersData();
  }, []);
  //admin

  const admins = MemeberData.filter(function (item) {
    return item.admin === true;
  });

  const [projectData, setProjectData] = useState([]);
  useEffect(() => {
    const getMembersData = async () => {
      await axios
        .get('/api/admin/project')
        .then((response) => {
          const data = response.data;
          setProjectData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMembersData();
  }, []);

  const [meetingData, setMeetingData] = useState([]);

  useEffect(() => {
    const getMembersData = async () => {
      await axios
        .get('/api/admin/meeting')
        .then((response) => {
          const data = response.data;
          setMeetingData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMembersData();
  }, []);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <Card
            color="#6fbf73"
            image={users}
            type="Members"
            number={'' + MemeberData.length}
          />
        </Grid>
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <Card
            color="#d7e360"
            image={admin}
            type="Admins"
            number={'' + admins.length}
          />
        </Grid>
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <Card
            color="#ff784e"
            image={projects}
            type="Projects"
            number={'' + projectData.length}
          />
        </Grid>
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <Card
            color="#33ab9f"
            image={meetings}
            type="Meetings"
            number={'' + meetingData.length}
          />
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: '20px' }}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <FormNews />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <PieChart members={MemeberData.length} projects={projectData.length}  admins ={admins.length} meetings={meetingData.length}/>
        </Grid>
        <Grid>
          <Charts />
        </Grid>
      </Grid>
    </div>
  );
}

export default Acceuil;
