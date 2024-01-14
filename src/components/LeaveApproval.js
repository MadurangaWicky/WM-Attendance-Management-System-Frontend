import React from 'react';
import { Container, Tab, Tabs, Box, CircularProgress } from '@mui/material';
import ApproveLeaveRequests from './ApproveLeaveRequests';
import TabPanel from './TabPanel';
import ApproveShortLeaveRquests from './ApproveShortLeaveRquests';
import useFetch from '../hooks/useFetch';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const LeaveApproval = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { data, error, reFetch } = useFetch('https://localhost:5001/api/Request/pending-leave-requests');

  if (!data) {
    return (
      <CircularProgress />
    );
  }
  return (
    <Container sx={{ width: 700 }} >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Normal Leave Requests" sx={{ ml: 8, fontSize:12 }} {...a11yProps(0)} />
          <Tab label="Short Leave Requests" sx={{fontSize:12}} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ApproveLeaveRequests pendingRequests={data.pendingLeaves} reFetch={reFetch} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ApproveShortLeaveRquests pendingRequests={data.pendingShortLeaves} reFetch={reFetch} />
      </TabPanel>
    </Container>
  )
}

export default LeaveApproval;