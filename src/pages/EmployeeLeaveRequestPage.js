import React from 'react';
import Navigation from '../components/Navigation';
import { Grid, Box, CircularProgress } from '@mui/material';
import Footer from '../components/Footer';
import LeaveRequestForm from '../components/LeaveRequestForm';
import LeaveDetails from '../components/LeaveDetails';
import { UserContext } from '../store/Context';
import leaveService from '../services/leave.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmergencyLeaveRequestForm from '../components/EmergencyLeaveRequestForm';


const EmployeeLeaveRequestPage = () => {

  const {userData} = React.useContext(UserContext);
  const [isLoading,setIsLoading] = React.useState(false);


  const leaveRequestHandler = async (leaveDetails) => {
    setIsLoading(true);
    const response = await leaveService.postLeaveRequest(leaveDetails);
    setIsLoading(false);
    if(response.status===201){
      toast.success('Leave request succesfull.',{position:toast.POSITION.TOP_CENTER,autoClose:4000});
    }else{
      toast.error('Leave request failed.',{position:toast.POSITION.TOP_CENTER,autoClose:4000});
    }
  }

  const shortLeaveHandler = async (shortLeaveDetails) => {
    setIsLoading(true);
    const response = await leaveService.postShortLeaveRequest(shortLeaveDetails);
    setIsLoading(false);
    if(response.status===201){
      toast.success('Short Leave request successfull.',{position:toast.POSITION.TOP_CENTER,autoClose:4000});
    }else{
      toast.error('Short Leave request failed.',{position:toast.POSITION.TOP_CENTER,autoClose:4000});
    }
  }

  if(!userData || isLoading ){
    return <Grid component="main" sx={{width:"100%",height:"100vh",textAlign:"center"}} >
        <CircularProgress sx={{mt:"20%"}} size={50} />
      </Grid>
  }

  return (
    <React.Fragment>
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

            backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/4012176.jpg)",
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
          <LeaveDetails/>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%' }}>
          {userData.noOfAnnualLeaves===0?<EmergencyLeaveRequestForm/>:<LeaveRequestForm submitFormHandler={leaveRequestHandler} submitShortLeaveHandler={shortLeaveHandler} />}
      </Box>
      <Footer />
    </React.Fragment>
  )
}

export default EmployeeLeaveRequestPage;