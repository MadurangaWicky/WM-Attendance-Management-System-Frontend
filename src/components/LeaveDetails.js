import React from 'react';
import { Badge, Box, Button, Fade, Grid, Modal, Stack, Typography } from '@mui/material';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { UserContext } from '../store/Context';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InfoIcon from '@mui/icons-material/Info';
import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';
import useFetch from '../hooks/useFetch';
import RecentRecordsTable from './RecentRecordsTable';
import PendingRecordsTable from './PendingRecordsTable';
import LoadingSkeletons from './LoadingSkeletons';

const LeaveDetails = () => {

    const { data: pendingDetails } = useFetch('https://localhost:5001/api/Request/pending-leave-requests');
    const { userData } = React.useContext(UserContext);
    const { data: leaveDetails } = useFetch(`https://localhost:5001/api/LeaveDetail/userId?userId=${userData.userId}`);
    const [openModalRecent, setOpenModalRecent] = React.useState(false);
    const [openModalPending, setOpenModalPending] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);

    const recentRecordsButtonHandler = () => {
        setOpenModalRecent(true);
    }

    const pendingButtonHandler = () => {
        setOpenModalPending(true);
    }

    const infoButtonHandler = () => {
        setOpenModalInfo(true);
    }

    if (!pendingDetails || !leaveDetails ) {
        return <LoadingSkeletons/>
    }

    return (
        <Box>
            <Typography variant='h4' sx={{ fontWeight: "bold" }} >Leave-Management</Typography>
            <Typography>The place to manage all your leaves...</Typography>
            {userData && <Grid sx={{ display: "flex", width: "50%", ml: "5%" }} >
                <Grid mt={12}>
                    <Typography variant="h4" color="darkblue" >
                        LEAVE AVAILABILITY
                    </Typography>
                </Grid>
                <Grid ml={1}>
                    <CircularProgressWithLabel value={userData.noOfAnnualLeaves / 20 * 100} />
                    <Grid sx={{ width: 200, ml: 5 }} >
                        <Typography color="secondary" >
                            {`*You have ${160 * (userData.noOfAnnualLeaves / 20)} of 160 available leave hours.`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>}
            <Stack direction="column" spacing={2} mt={2} sx={{ width: 400 }} ml="20%" >
                <Fade in={true} timeout={2000} >
                    <Button
                        endIcon={<Badge badgeContent={leaveDetails.slice(-5).length} color='error' ><ListAltIcon /></Badge>}
                        size="medium"
                        variant='outlined'
                        color='primary'
                        onClick={recentRecordsButtonHandler}
                    >
                        Recent Records
                    </Button>
                </Fade>
                <Fade in={true} timeout={4000} >
                    <Button
                        endIcon={<Badge badgeContent={pendingDetails.pendingLeaves.filter(leave=>leave.nic===userData.nic).length + pendingDetails.pendingShortLeaves.filter(leave=>leave.nic===userData.nic).length} color='error' ><PendingTwoToneIcon /></Badge>}
                        size="medium"
                        variant='outlined'
                        color='warning'
                        onClick={pendingButtonHandler}
                    >
                        Pending Leaves
                    </Button>
                </Fade>
                <Fade in={true} timeout={6000} >
                    <Button
                        endIcon={<InfoIcon />}
                        size="medium"
                        variant='outlined'
                        color='success'
                        onClick={infoButtonHandler}
                    >
                        Info
                    </Button>
                </Fade>
            </Stack>
            <Modal
                open={openModalRecent}
                onClose={() => setOpenModalRecent(false)}
            >
                <Box>
                    <RecentRecordsTable leaveDetails={leaveDetails} />
                </Box>
            </Modal>
            <Modal open={openModalPending} onClose={() => setOpenModalPending(false)} >
                <Box>
                    <PendingRecordsTable pendingDetails={pendingDetails} />
                </Box>
            </Modal>
            <Modal open={openModalInfo} onClose={() => setOpenModalInfo(false)} >
                <h1>hi</h1>
            </Modal>
        </Box>
    );
}

export default LeaveDetails;