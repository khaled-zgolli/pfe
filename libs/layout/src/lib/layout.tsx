import {
  AppBar,
  Avatar,
  Badge,
  Button,
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Notif } from './notif';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router';
import { format } from 'date-fns';
import axios from 'axios';

import logo from './logo-Proxym.png';

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: 'flex',
      width: '100%',
    },

    active: {
      backgroundColor: '#9fa8da',
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    toolbar: theme.mixins.toolbar,
    logo: {
      width: '200px',
      margin: theme.spacing(0.4),
    },
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(1),
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',

      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

/* eslint-disable-next-line */
export interface LayoutProps {
  children: JSX.Element[];
  menuItems: {
    text: string;
    icon: JSX.Element;
    path: string;
  }[];
  admin: string;
  name: string;
  avatar: string;
  path: string;
  id: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  menuItems,
  admin,
  name,
  avatar,
  path,
  id,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  // open/close drawer
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // size of page
  const [size, setSize] = useState<number>(window.innerWidth);
  useEffect((): void => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    if (size <= 760) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [size]);
  //Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Appbar */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.date}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          {/* notif */}
          {admin !== 'Admin' ? <Notif idMember={id} /> : ''}

          {/* <IconButton color="inherit">
            <Badge badgeContent={2} max={50} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton> */}
          {/* <IconButton color="inherit">
            <Badge badgeContent={55} max={50} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <div>
            <Button
              onClick={handleClick}
              color="inherit"
              endIcon={<ExpandMoreIcon />}
            >
              {name}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Button
                  color="primary"
                  startIcon={<SettingsIcon />}
                  onClick={() => {
                    history.push(path);
                  }}
                >
                  Settings
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button
                  color="primary"
                  startIcon={<LockIcon />}
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.assign('/');
                  }}
                >
                  Logout
                </Button>
              </MenuItem>
            </Menu>
          </div>
          <Avatar src={avatar} alt="avatar" className={classes.avatar} />
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <img src={logo} alt="logo-proxym" className={classes.logo} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Divider />
          <Typography
            variant="h4"
            style={{ marginTop: '20px' }}
            color="primary"
          >
            {admin}
          </Typography>
        </div>

        <List>
          {menuItems.map(
            (item: {
              text: string;
              icon: JSX.Element;
              path: string;
            }): JSX.Element => {
              return (
                <ListItem
                  key={item.text}
                  button
                  onClick={() => {
                    history.push(item.path);
                  }}
                  className={
                    location.pathname === item.path ? classes.active : null
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            }
          )}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {/* cildren */}
        <div>
          <div className={classes.toolbar}></div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
