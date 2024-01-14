import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import LogIn from '../components/LogIn';
import { Grid } from '@mui/material';
import SimpleFooter from '../components/SimpleFooter';
import SimpleNavigation from '../components/SimpleNavigation';
import { UserContext } from '../store/Context';
import authService from '../services/auth.service';

const LoginPage = () => {
  const [errState, setErrState] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const loginHandler = async(loginData) => {
    const response = await authService.login(loginData);
        if (response.status===200) {
          setUserData(response.data.data);
          navigate('/home');
        }
        else if(response.status===400) {
          setErrState(true);
          setErrMsg(response.data.message);
        }else{
          console.log(response);
        }
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrState(false);
  }
  return (
    <React.Fragment>
      <SimpleNavigation />
      <Grid container component="main" sx={{ height: "100vh", p: 5 }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          lg={6}
          sx={{

            backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/4957136.jpg)",
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
        >
          <LogIn submitLoginHandler={loginHandler} errState={errState} errMsg={errMsg} handleClose={handleClose} />
        </Grid>
      </Grid>
      <SimpleFooter />
    </React.Fragment>
  );
}

export default LoginPage;