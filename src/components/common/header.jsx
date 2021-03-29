import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Select,
  Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { getLocalStorageItem } from '../../hooks/useLocalStorage';
import { requestSignOut } from '../../redux/actions/authActions';
import { loadAllNews } from '../../redux/actions/newsActions';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      cursor: 'pointer',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  selectorRoot: {
    color: 'white',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    padding: `${theme.spacing(1)}px`,
    cursor: 'pointer',
  },
  selectorIcon: {
    color: 'white',
  },
  selectorMenu: {
    padding: `${theme.spacing(0.5)}px`,
    cursor: 'pointer',
    backgroundColor: fade(theme.palette.common.white, 0.15),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  searchButton: {
    color: 'white',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginLeft: `${theme.spacing(2)}px`,
    padding: `${theme.spacing(0.5)}px`,
  },
}));

const PrimarySearchAppBar = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigation = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('All');
  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    setIsAuthorized(getLocalStorageItem('uid'));
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    setAnchorEl(null);
    dispatch(requestSignOut());
    navigation.push('/sign_in');
  };

  const profileRedirect = () => {
    navigation.push('/profile');
  };

  const mainRedirect = () => {
    navigation.push('/');
  };

  const searchArticle = () => {
    const payload = { search: searchQuery, searchBy: searchBy === 'All' ? '' : searchBy };
    dispatch(loadAllNews(payload));
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap onClick={mainRedirect}>
            News
          </Typography>
          {location.pathname === '/' && (
            <>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
              <Select
                classes={{
                  root: classes.selectorRoot,
                  icon: classes.selectorIcon,
                }}
                value={searchBy}
                defaultValue={'All'}
                onChange={(event) => setSearchBy(event.target.value)}
                name="searchBy"
                variant={'outlined'}
                inputProps={{
                  id: 'age-native-required',
                }}
              >
                <option className={classes.selectorMenu} value={'All'}>
                  All
                </option>
                <option className={classes.selectorMenu} value={'User'}>
                  User
                </option>
                <option className={classes.selectorMenu} value={'HashTags'}>
                  HashTags
                </option>
              </Select>
              <Button className={classes.searchButton} variant={'outlined'} onClick={searchArticle}>
                Search
              </Button>
            </>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {isAuthorized ? (
          <div>
            <MenuItem onClick={profileRedirect}>Profile</MenuItem>
            <MenuItem onClick={signOut}>Sign Out</MenuItem>
          </div>
        ) : (
          <MenuItem onClick={handleMenuClose}>
            <Link to={'/sign_in'}>Sign In</Link>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default React.memo(PrimarySearchAppBar);
