import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SailingIcon from '@mui/icons-material/Sailing';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useLocation } from 'react-router-dom';
import Logout from '../Login/Logout/Logout';
import './Sidebar.scss';

import logo from '../../images/Main-logo.png';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import InsideFooter from '../Footer/InsideFooter/InsideFooter';

import { useDispatch, useSelector } from 'react-redux';
import { dropDownAction } from '../../actions/dropDownAction';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  background: '#0C294D',
  // color: 'white',
  fontWeight: 'bold',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
    background: '#0C294D',
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      borderRadius: '4px',
      border: '1px solid #000',
    },
  },
}));
const SidebarBoats = ({ children, newBoat }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const dropDown = useSelector((state) => state.dropDown);

  const { loading, error, dropDownInfo } = dropDown;

  // console.log('dropDown', dropDown);

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openTwo, setOpenTwo] = React.useState(true);

  const handleClick = () => {
    setOpenTwo(!openTwo);
  };

  const itemList = [
    {
      path: '/dashboard',
    },
    {
      path: '/bookings/boats',
    },
    {
      path: '/bookings/experiences',
    },
    {
      path: '/bookings/docks',
    },
    {
      path: '/boats',
    },
  ];
  // console.log('sdajal', itemList);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='error'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='inherit'
        >
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const dropDownHandler = async () => {
    await dispatch(dropDownAction());
    navigate('/addnewboats');
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {!newBoat === true ? (
          <AppBar
            position='fixed'
            open={open}
            style={{ background: '#f2f2f2', color: '#000' }}
          >
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <>
                <Typography
                  variant='h6'
                  noWrap
                  component='div'
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  <Button
                    variant='outlined'
                    className='new-boat-btn'
                    // onClick={() => navigate('/addnewboats')}
                    onClick={dropDownHandler}
                    startIcon={<AddIcon />}
                  >
                    Add New Boat {newBoat}
                    {loading && <div className='button-loader-boat'></div>}
                  </Button>
                </Typography>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder='Search…'
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size='large'
                  aria-label='show 4 new mails'
                  color='inherit'
                >
                  <Badge badgeContent={4} color='error'>
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size='large'
                  aria-label='show 17 new notifications'
                  color='inherit'
                >
                  <Badge badgeContent={17} color='error'>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size='large'
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        ) : (
          <>
            <AppBar
              position='fixed'
              open={open}
              style={{ background: '#f2f2f2', color: '#000' }}
            >
              <Toolbar>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleDrawerOpen}
                  edge='start'
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>

                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <IconButton
                    size='large'
                    aria-label='show 4 new mails'
                    color='inherit'
                  >
                    <Badge badgeContent={4} color='error'>
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size='large'
                    aria-label='show 17 new notifications'
                    color='inherit'
                  >
                    <Badge badgeContent={17} color='error'>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size='large'
                    edge='end'
                    aria-label='account of current user'
                    aria-controls={menuId}
                    aria-haspopup='true'
                    onClick={handleProfileMenuOpen}
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size='large'
                    aria-label='show more'
                    aria-controls={mobileMenuId}
                    aria-haspopup='true'
                    onClick={handleMobileMenuOpen}
                    color='inherit'
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>
          </>
        )}
        {/* moazam */}
        {renderMobileMenu}
        {renderMenu}

        <Drawer variant='permanent' open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <div className='drawer-img'>
                  <img src={logo} alt='' />
                  <ChevronLeftIcon />
                </div>
              )}
            </IconButton>
          </DrawerHeader>
          {/* <Divider /> */}
          <List className='nav-wrapper-sidebar'>
            <ListItemButton
              className={
                location.pathname === itemList[0].path ? 'li-sidebar' : null
              }
              onClick={() => navigate('/dashboard')}
            >
              <ListItemIcon>
                {/* <img src={home} alt='' style={{ color: '#fff' }} /> */}
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
            {/* nested */}
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <SailingIcon />
              </ListItemIcon>
              <ListItemText primary='Bookings' />
              {openTwo ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={openTwo}
              timeout='auto'
              unmountOnExit
              // className={
              //   location.pathname === itemList[1].path
              //     ? 'li-nested-sidebar'
              //     : null
              // }
            >
              <List component='div' disablePadding>
                <ListItemButton
                  onClick={() => navigate('/bookings/boats')}
                  className={
                    location.pathname === itemList[1].path ? 'li-sidebar' : null
                  }
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <DirectionsBoatIcon />
                  </ListItemIcon>
                  <ListItemText primary='Boats' />
                </ListItemButton>
              </List>
              <List component='div' disablePadding>
                <ListItemButton
                  className={
                    location.pathname === itemList[2].path ? 'li-sidebar' : null
                  }
                  onClick={() => navigate('/bookings/experiences')}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Experiences' />
                </ListItemButton>
              </List>
              <List component='div' disablePadding>
                <ListItemButton
                  className={
                    location.pathname === itemList[3].path ? 'li-sidebar' : null
                  }
                  onClick={() => navigate('/bookings/docks')}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Docks' />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton
              className={
                location.pathname === itemList[4].path ? 'li-sidebar' : null
              }
              onClick={() => navigate('/boats')}
            >
              <ListItemIcon>
                <DirectionsBoatIcon />
              </ListItemIcon>
              <ListItemText primary='My Boats' />
            </ListItemButton>

            <ListItemButton>
              <Logout />
            </ListItemButton>
          </List>
          ;
          {/* <List>
          {itemsList.map((item, index) => {
            console.log('sal', item);
            const { text, icon, path } = item;
            return (
              <>
                <ListItem
                  button
                  key={text}
                  onClick={() => navigate(path)}
                  className={location.pathname === path ? 'li-sidebar' : null}
                >
                  {icon && (
                    <ListItemIcon style={{ color: '#fff' }}>
                      {icon}
                    </ListItemIcon>
                  )}
                  <ListItemText primary={text} />
                </ListItem>
              </>
            );
          })} 
        </List> */}
        </Drawer>
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
      <InsideFooter />
    </>
  );
};

export default SidebarBoats;
