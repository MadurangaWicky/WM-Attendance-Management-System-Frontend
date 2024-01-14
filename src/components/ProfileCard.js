import React from 'react';
import { UserContext } from '../store/Context';
import { Typography, Box, Grid, Avatar, Button, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const ProfileCard = (props) => {
    const { userData } = React.useContext(UserContext);

    return (
        <Box sx={{ boxShadow: 10, p: 2, mt: 2, width: 'auto', maxWidth: "400px", textAlign: "center" }}>
            <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "center", direction: "column" }} >
                <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex' }} >
                    <Avatar src={`https://localhost:5001/Images/${userData.profilePic}`} sx={{ width: 150, height: 150 }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" >{`${userData.name} | ${userData.type === 2 ? "Employee" : userData.type === 1 ? "Manager" : "Admin"}`}</Typography>
                    <Grid mt={2} >
                        <Divider />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={1} width={300} >
                    <Grid item xs={12} display="flex" >
                        <EmailIcon />
                        <Typography sx={{textAlign:'left'}} ml={1} >{`${userData.email}`}</Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" >
                        <CreditCardIcon />
                        <Typography sx={{textAlign:'left'}} ml={1} >{`${userData.nic}`}</Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" >
                        <LocationOnIcon />
                        <Typography sx={{textAlign:'left'}} ml={1} >{`${userData.address}`}</Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" >
                        <PhoneAndroidIcon />
                        <Typography sx={{textAlign:'left'}} ml={1} >{`${userData.telephone}`}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ justifyContent: 'right', display: 'flex' }} >
                    <Button onClick={props.onClickUpdate} variant="outlined" color="secondary" >Update Profile</Button>
                </Grid>
            </Grid>
        </Box>
    )
};

export default ProfileCard;