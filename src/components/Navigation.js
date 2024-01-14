import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Drawer } from '@mui/material';
import SideMenu from './SideMenu';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext } from '../store/Context';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const pages = ['Home', 'About Us'];
const paths = ['/home', '/about-us'];

const Navigation = () => {

    const { userData, setUserData } = React.useContext(UserContext);
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isMenu, setIsMenu] = React.useState(false);

    const handleOpenNavMenu = (event) => {
        setIsMenu(!isMenu);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsMenu(false);
    };

    const handleClickLogOut = () => {
        authService.logout();
        navigate('/login');
        setUserData(null);
    }

    return (
        <header>
            <Drawer
                anchor='left'
                open={isMenu}
                onClose={toggleDrawer()}
            >
                <SideMenu toggleDrawer={toggleDrawer} />
            </Drawer>
            <AppBar position="fixed" color="transparent" sx={{ backgroundColor: "rgba(255,255,255,0.9)" }} >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ ml: 1, display: { xs: 'none', md: 'flex' }, fontSize: 30, fontWeight: "bold" }}
                        >
                            WM Attendance System
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, fontWeight: "bold" }}
                        >
                            WM Attendance System
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: "flex-end" } }}>
                            {pages.map((page, index) => (
                                <Button
                                    key={page}
                                    sx={{ my: 1, color: 'black', display: 'block', fontWeight: "bold", mx: 1 }}
                                    component={RouterLink}
                                    to={paths[index]}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            sx={{ mr: 4 }}
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User" src={userData && `https://localhost:5001/Images/${userData.profilePic}`} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem key='Profile' onClick={() => navigate('/profile')}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                {userData.type===0&&<MenuItem key='Dashboard' onClick={()=>navigate('/dashboard')}>
                                    <Typography textAlign="center">Dashboard</Typography>
                                </MenuItem>}
                                <MenuItem key='Log out' onClick={handleClickLogOut}>
                                    <Typography textAlign="center">Log out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>
    )
}

export default Navigation;