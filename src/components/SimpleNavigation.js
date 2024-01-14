import React from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const SimpleNavigation = () => {
  return (
    <header>
            <AppBar position="fixed" color="transparent" sx={{backgroundColor:"rgba(255,255,255,0.9)"}} >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ ml: 1, display: { xs: 'none', md: 'flex' }, fontSize: 30, fontWeight: "bold" }}
                        >
                            WM Attendance System
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: "flex-end" } }}>
                            <Button sx={{ my: 1, color: 'black', display: 'block', fontWeight: "bold", mx: 1 }} component={RouterLink} to='/about-us' >About Us</Button>
                            <Button sx={{ my: 1, color: 'black', display: 'block', fontWeight: "bold", mx: 1 }} component={RouterLink} to='/login' >Login</Button>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, fontWeight:"bold"}}
                        >
                            WM Attendance System
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>
  )
}

export default SimpleNavigation;