import React from 'react';
import { useState } from 'react';
import { Box, Button, Divider, Grid, Typography, Autocomplete, InputAdornment, IconButton, Avatar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import axios from 'axios';

import UpdateIcon from '@mui/icons-material/Update';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

 function ForgotPwForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const[userPw,setUserPw]= React.useState({newPassword:'', cnfpassword:''});
  const {id} = useParams();

  const handleChange=(event)=>{
    setUserPw({
      ...userPw,
      [event.target.name]:event.target.value
    });


  }


  

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }


  const submitHandler=(event)=>{
    event.preventDefault();
    if(userPw.newPassword!==userPw.cnfpassword){
      return;
    }
    axios.put(`https://localhost:5001/api/User/forgot-password/${id}`,{newPassword:userPw.newPassword})
      .then(res=>toast.success(res.data.message))
      .catch(err=>toast.error('Password change failed'));

  }

  return (
    <Box
            component="form"
            onSubmit={submitHandler}
            autoComplete="true"
            
            maxWidth="450px"
        >
            <UpdateIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography
                variant="h5"
                mb={2}
            >
                Update Password
            </Typography>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        
                        label="New Password"
                        size="small"
                        type={showPassword ? "text" : "password"}
                        name="newPassword"                   
                        onChange={handleChange}
                        fullWidth
                        required
                        InputProps={
                          {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle-password"
                                  onClick={handleClickShowPassword}
                                >
                                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        }
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        size="small"
                        name="cnfpassword"
                        onChange={handleChange}
                        fullWidth
                        required
                        InputProps={
                          {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle-password"
                                  onClick={handleClickShowConfirmPassword}
                                >
                                  {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        }
                        
                    />
                </Grid>
                
                <Grid
                    item
                    xs={12}
                    sm={12}
                >
                    <Button type="submit" variant="contained" size="large" >Change</Button>
                </Grid>
            </Grid>
        </Box>
  )
}

export default ForgotPwForm;