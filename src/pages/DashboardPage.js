import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Button, Fade, Grid, Modal } from '@mui/material';
import Footer from '../components/Footer';
import ApprovePendingUser from '../components/ApprovePendingUser';
import { ToastContainer } from 'react-toastify';

const DashboardPage = () => {

    const [flag,setFlag] = useState(false);

    return (
        <div>
            <Navigation />
            <ToastContainer/>
            <Grid container component="main" sx={{ height: "90vh", p: 5, mt: 8 }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    lg={6}
                    sx={{

                        backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/3793114.jpg)",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    lg={6}
                    sx={{ textAlign: "left" }}
                >
                    <Grid sx={{ mt: "8%", ml: "50%" }}>
                    <Fade in={true} timeout={2000} >
                    <Button
                        size="large"
                        variant='outlined'
                        color='secondary'
                        onClick={()=>setFlag(true)}
                    >
                        Pending User Requests
                    </Button>
                </Fade>
                    </Grid>
                </Grid>
                <Modal open={flag} onClose={()=>setFlag(false)} >
                    <ApprovePendingUser/>
                </Modal>
            </Grid>
            <Footer />
        </div>
    )
};

export default DashboardPage;