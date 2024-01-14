import React from 'react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { CircularProgress, Grid, Typography } from '@mui/material';
import Calendar from '../components/Calendar';
import { UserContext } from '../store/Context';

const CalendarPage = () => {

  const {userData} = React.useContext(UserContext);

  if(!userData){
    return <Grid component="main" sx={{width:"100%",height:"100vh",textAlign:"center"}} >
        <CircularProgress sx={{mt:"20%"}} size={50} />
      </Grid>
  }

  return (
    <React.Fragment>
       <Navigation/>
      <Grid container component="main" sx={{ height: "100vh", p: 5, mt:5 }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          lg={6}
          sx={{

            backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/3573382.jpg)",
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
          <Typography variant='h4' sx={{fontWeight:"bold"}} >Calendar</Typography>
          <Typography>The place to view all your events...</Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ p: 5, mt:5 }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
        >
          <Calendar/>
        </Grid>
      </Grid>
      <Footer/>
    </React.Fragment>
  )
}

export default CalendarPage;