import React from 'react';
import Navigation from '../components/Navigation';
import { Grid, Tab, Tabs, Box, CircularProgress } from '@mui/material';
import Footer from '../components/Footer';
import LeaveRequestForm from '../components/LeaveRequestForm';
import LeaveApproval from '../components/LeaveApproval';
import TabPanel from '../components/TabPanel';
import LeaveDetails from '../components/LeaveDetails';
import { UserContext } from '../store/Context';
import leaveService from '../services/leave.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmergencyLeaveRequestForm from '../components/EmergencyLeaveRequestForm';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const LeaveManagementPage = () => {

  const [value, setValue] = React.useState(0);
  const {userData} = React.useContext(UserContext);
  const [isLoading,setIsLoading] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Leave Request" sx={{ml:30}} {...a11yProps(0)} />
            <Tab label="Leave Approve" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {userData.noOfAnnualLeaves===0?<EmergencyLeaveRequestForm/>:<LeaveRequestForm submitFormHandler={leaveRequestHandler} submitShortLeaveHandler={shortLeaveHandler} />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LeaveApproval />
        </TabPanel>
      </Box>
      <Footer />
    </React.Fragment>
  )
}

export default LeaveManagementPage;