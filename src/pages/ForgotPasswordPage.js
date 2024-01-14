import React from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import ForgotPwForm from '../components/ForgotPwForm';
import { ToastContainer } from 'react-toastify';

const ForgotPasswordPage = () => {

 

  return (
    
      
      <Grid container component="main" sx={{ height: "90vh", p: 5,mt:8 }}>
        <ToastContainer/>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          lg={6}
          sx={{

            backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/5966865.jpg)",
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
          <Grid sx={{ mt: "8%", ml: "10%" }}>
            <ForgotPwForm/>
             </Grid>
        </Grid>
      </Grid>
      
  )
}

export default ForgotPasswordPage;