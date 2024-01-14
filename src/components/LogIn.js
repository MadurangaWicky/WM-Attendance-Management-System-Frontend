import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Grid, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LogIn = (props) => {

  
  







  


  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const changeHandler = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  const handleClickShowPassword = () => {
 
    setShowPassword(!showPassword);
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const loginData = {
 
      email:user.email,
      password:user.password

      

    }
    props.submitLoginHandler(loginData);
  }

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      autoComplete="true"
      sx={
        {
          margin: "15%",
          padding: 3,
          boxShadow: 10
        }
      }
      maxWidth="450px"
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

          
          
        
        
          

          <AccountCircleIcon color="primary" sx={{ fontSize: 60 }} />
          <Typography
            variant="h5"
          >
            Log In
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextField
            error={props.errState && props.errMsg === "Email not found"}
            id="outlined-email"
            label="Email"
            type="email"
            size="small"
            name="email"
            helperText={props.errState && props.errMsg === "Email not found" ? "*" + props.errMsg : null}
            fullWidth
            required
            onChange={changeHandler}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextField
            error={props.errState && props.errMsg === "Password Incorrect"}
            id="outlined-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            size="small"
            name="password"
            helperText={props.errState && props.errMsg === "Password Incorrect" ? "*" + props.errMsg : null}
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
            onChange={changeHandler}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button size="large" type="submit" endIcon={<LoginIcon />} variant="contained">Log In</Button>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography>Don't have account ?  <Button component={RouterLink} to='/register'>Register</Button></Typography>
          <Button component={RouterLink} to='/er'>Forgot Password</Button>

        </Grid>
      </Grid>
    </Box>
  );
}

export default LogIn;