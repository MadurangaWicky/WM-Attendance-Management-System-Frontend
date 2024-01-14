import React, { useState } from 'react';
import Register from '../components/Register';
import { Grid } from '@mui/material';
import SimpleNavigation from '../components/SimpleNavigation';
import SimpleFooter from '../components/SimpleFooter';
import authService from '../services/auth.service';
import { toast, ToastContainer } from 'react-toastify';

const RegisterPage = () => {

    const [emailErr,setEmailErr] = useState('');
    const [emailErrState,setEmailErrState] = useState(false);
    const [profilePicErr,setProfilePicErr] = useState('');
    const [profilePicErrState,setProfilePicErrState] = useState(false);

    const registrationHandler = async (userData) => {
        const response = await authService.register(userData);
        console.log(response);
        if(response.status===400){
            setEmailErrState(true);
            setEmailErr(response.data.message);
        }else if(response.status===200){
            setProfilePicErrState(true);
            setProfilePicErr(response.data.message);
        }else if(response.status===201){
            toast.success('Registration successfully completed. Please check your emails for verification.',{position:toast.POSITION.TOP_CENTER,autoClose:4000});
        }
    }

    return (
        <React.Fragment>
            <SimpleNavigation/>
            <ToastContainer/>
            <Grid container component="main" sx={{ height: "auto", p: 5,mt:10 }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    lg={6}
                    sx={{

                        backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/2853458.jpg)",
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
                    lg={6}            >
                    <Register 
                        registrationFormHandler={registrationHandler} 
                        emailErr={emailErr}
                        emailErrState={emailErrState}
                        profilePicErr={profilePicErr}
                        profilePicErrState={profilePicErrState}
                    />
                </Grid>
            </Grid>
            <SimpleFooter/>
        </React.Fragment>
    )
}

export default RegisterPage;