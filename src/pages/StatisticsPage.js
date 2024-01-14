import React from 'react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { Box, CircularProgress, Grid, Tab, Tabs, Typography } from '@mui/material';
import SelfStatisticsForm from '../components/SelfStatisticsForm';
import TabPanel from '../components/TabPanel';
import EmployeeStatisticsForm from '../components/EmployeeStatisticsForm';
import StatisticsCharts from '../components/StatisticsCharts';
import { UserContext } from '../store/Context';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const StatisticsPage = () => {

  const [value, setValue] = React.useState(0);
  const {userData} = React.useContext(UserContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

            backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/4020769.jpg)",
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
          <Typography variant='h4' sx={{fontWeight:"bold"}} >Statistics</Typography>
          <Typography>The place to check your performance...</Typography>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Self Statistics" sx={{ml:30}} {...a11yProps(0)} />
            <Tab label="Employee Statistics" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <SelfStatisticsForm/>
          <StatisticsCharts/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EmployeeStatisticsForm/>
        </TabPanel>
      </Box>
      <Footer/>
    </React.Fragment>
  )
}

export default StatisticsPage;