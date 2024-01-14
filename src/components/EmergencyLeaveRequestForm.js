import React from 'react';
import { Box, Grid, Button, Typography, TextField } from '@mui/material';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { UserContext } from '../store/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmergencyLeaveRequestForm = () => {

    const [reason,setReason] = React.useState('');
    const {userData} = React.useContext(UserContext);

    const submitHandler = (event)=>{
        event.preventDefault();
        const emergencyDetails = {
            reason:reason,
            requesterId:userData.userId,
            status:"Pending"
        }
        axios.post('https://localhost:5001/api/Request/emergency-leaves',emergencyDetails)
            .then(res=>toast.success('Emergency leave request success.'))
            .catch(err=>toast.error('Emergency leave request failed.'));
    }

  return (
    <Box
            component="form"
            onSubmit={submitHandler}
            autoComplete="true"
            sx={
                {
                    mt:"3%",
                    mx: "10%",
                    padding: 3,
                    boxShadow: 10,
                }
            }
            maxWidth="400px"
        >
            <Grid
                container
                spacing={3}
                mb={2}
                mt={1}
            >
                <Grid
                    item
                    xs={12}
                >
                    <AnnouncementIcon color="error" sx={{ fontSize: 40 }} />
                    <Typography
                        variant="h5"
                    >
                        Emergency Leave Request
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        label="Reason for Request"
                        size='small'
                        fullWidth
                        placeholder='Type brief description about your emergency...'
                        rows={4}
                        type='text'
                        multiline
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        required
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button size="medium"
                        color='error'
                        type="submit"
                        variant="contained"
                    >
                        Request Emergency Leave
                    </Button>
                </Grid>
            </Grid>
        </Box>
  )
};

export default EmergencyLeaveRequestForm;