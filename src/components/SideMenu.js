import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BarChartIcon from '@mui/icons-material/BarChart';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhonePausedIcon from '@mui/icons-material/PhonePaused';
import { Avatar, Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { UserContext } from '../store/Context';

const employeeMenuItems = ['Home', 'Leave Management', 'Report', 'Profile', 'Calendar', 'Statistics', 'Video Conference'];
const managerMenuItems = ['Working Status Board', 'Send Notification','Send Email'];
const adminMenuItems = ['Settings'];
const paths = ['/home', '/leave-management', '/report', '/profile', '/calendar', '/statistics', '/video-conference', '/working-status-board', '/send-notification','/send-email' ,'/settings'];

const SideMenu = (props) => {

    const location = useLocation();
    const { userData } = React.useContext(UserContext);
    let menuItems;
    if (userData.type === 0) {
        menuItems = [...employeeMenuItems, ...managerMenuItems, ...adminMenuItems];
    } else if (userData.type === 1) {
        menuItems = [...employeeMenuItems, ...managerMenuItems];
    } else {
        menuItems = [...employeeMenuItems];
    }
    return (
        <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={props.toggleDrawer()}
            onKeyDown={props.toggleDrawer()}
        >
            <Box sx={{ display: "flex" }}>
                <Avatar src={process.env.PUBLIC_URL + "/images/logo.png"} sx={{ width: 60, height: 60, m: 0.5 }} />
                <Typography sx={{ fontSize: 18, my: 2, fontWeight: "bold" }} >
                    WM Attendance System
                </Typography>
            </Box>
            <Divider />
            <List>
                {menuItems.map((text, index) => (
                    <ListItem button key={text} component={RouterLink} to={paths[index]} selected={paths[index] === location.pathname} >
                        <ListItemIcon>
                            {index === 0 ? <HomeIcon /> :
                                index === 1 ? <TimeToLeaveIcon /> :
                                    index === 2 ? <SummarizeIcon /> :
                                        index === 3 ? <AccountBoxIcon /> :
                                            index === 4 ? <CalendarTodayIcon /> :
                                                index === 5 ? <BarChartIcon /> :
                                                    index === 6 ? <VideocamIcon /> :
                                                        index === 7 ? <ScreenSearchDesktopIcon /> :
                                                            index === 8 ? <SendIcon /> :
                                                            index === 9 ? <SendIcon /> :
                                                                index === 10 ? <SettingsIcon /> : null}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                <ListItem button key='Contact Us' component={RouterLink} to='/contact-us' selected={'/contact-us' === location.pathname} >
                    <ListItemIcon><PhonePausedIcon /></ListItemIcon>
                    <ListItemText primary='Contact Us' />
                </ListItem>
            </List>
        </Box>
    )
}

export default SideMenu;