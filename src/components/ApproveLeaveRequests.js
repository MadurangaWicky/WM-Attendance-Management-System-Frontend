import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import LeaveRequestCard from './LeaveRequestCard';
import axios from 'axios';
import { UserContext } from '../store/Context';

const ApproveLeaveRequests = ({ pendingRequests, reFetch }) => {

    const {userData} = React.useContext(UserContext);

    const approveLeaveRequest = (approveData) => {
        console.log(approveData)
        axios.post('https://localhost:5001/api/Request/approve-leave', approveData)
            .then((res) => {
                console.log(res);
                reFetch();
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <Box>
            <Typography mb={2} >Pending Leave Requests</Typography>
            {pendingRequests.length > 0 ?
                <Stack spacing={1} divider={<Divider />} >
                    {
                        pendingRequests.filter(request=>request.nic!==userData.nic).map(request => <LeaveRequestCard key={request.id} details={request} approveLeaveRequestHandler={approveLeaveRequest} />)
                    }
                </Stack> : <Typography>No available pending requests</Typography>}
        </Box>
    )
}

export default ApproveLeaveRequests;