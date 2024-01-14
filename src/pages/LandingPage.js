import React from 'react';
import SimpleFooter from '../components/SimpleFooter';
import SimpleNavigation from '../components/SimpleNavigation';
import { Grid } from '@mui/material';

const LandingPage = () => {
    return (
        <React.Fragment>
            <SimpleNavigation />
            <Grid container component="main" sx={{ height: "100vh", p: 5 }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    lg={6}
                    sx={{

                        backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/6913.jpg)",
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
                >

                </Grid>
            </Grid>
            <SimpleFooter />
        </React.Fragment>
    )
}

export default LandingPage;