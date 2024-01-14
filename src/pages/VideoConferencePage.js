import React from 'react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { CircularProgress, Grid, Typography } from '@mui/material';
import VideoConferenceForm from '../components/VideoConferenceForm';
import axios from 'axios';
import { UserContext } from '../store/Context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const scheduleConferenceHandler = (confData)=>{
  console.log(confData);
  axios.post('https://localhost:5001/api/VideoConference',confData)
    .then((res)=>{
      toast.success('Video conference scheduled successfully completed. Check your emails.',{position:toast.POSITION.TOP_CENTER,autoClose:4000});
    }).catch((err)=>{
      toast.error('Video conference schedule failed. Try again shortly.',{position:toast.POSITION.TOP_CENTER,autoClose:4000});
    })
}

const VideoConferencePage = () => {

  const {userData} = React.useContext(UserContext);

  if(!userData){
    return <Grid component="main" sx={{width:"100%",height:"100vh",textAlign:"center"}} >
        <CircularProgress sx={{mt:"20%"}} size={50} />
      </Grid>
  }

  return (
    <React.Fragment>
       <Navigation/>
       <ToastContainer/>
      <Grid container component="main" sx={{ height: "100vh", p: 5, mt:5 }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          lg={6}
          sx={{

            backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/4936927.jpg)",
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
          <Typography variant='h4' sx={{fontWeight:"bold"}} >Video Conference</Typography>
          <Typography>The place to manage video conferences...</Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ p: 5, mt:5 }}>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={12}
        >
          <VideoConferenceForm submitFormHandler={scheduleConferenceHandler} />
        </Grid>
      </Grid>
      <Footer/>
    </React.Fragment>
  )
}

export default VideoConferencePage;