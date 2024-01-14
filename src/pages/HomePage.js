import React, { useContext } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import Clock from 'react-live-clock';
import timeGreeting from 'greeting-time';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {  UserContext } from '../store/Context';

const HomePage = () => {

  const { userData } = useContext(UserContext);
  const date = new Date();
  const arr = date.toDateString().split(' ');


  if(!userData){
    return <Grid component="main" sx={{width:"100%",height:"100vh",textAlign:"center"}} >
        <CircularProgress sx={{mt:"20%"}} size={50} />
      </Grid>
  }

  return (
    <div>
      <Navigation/>
      {userData&&
      <Grid container component="main" sx={{ height: "90vh", p: 5,mt:8 }}>
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
            <Typography sx={{ fontSize: "30px", fontWeight: "bold" }} >{timeGreeting(date)} {`${userData.name.split(' ')[0]}`} !</Typography>
            <Typography sx={{ fontSize: "30px", fontWeight: "bold" }} >Welcome Back Chief...</Typography>
            <Clock format={'h:mm:ss A'} ticking={true} timezone={'Asia/Colombo'} style={{ fontSize: "60px", fontWeight: "bold" }} />
            <Typography sx={{ fontSize: "60px", fontWeight: "bold" }} >{arr[0].toUpperCase()}</Typography>
            <Typography sx={{ fontSize: "60px", fontWeight: "bold" }} >{date.getMonth() + 1}/{arr[2]}/{arr[3]}</Typography>
          </Grid>
        </Grid>
      </Grid>}
      <Footer/>
    </div>
  )
}

export default HomePage;