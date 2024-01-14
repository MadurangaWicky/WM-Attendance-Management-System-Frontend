import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme, Grid, Typography, CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { NavigateContext, UserContext } from './store/Context';
import authService from './services/auth.service';
import PrivateRoutes from './routes/PrivateRoutes';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import EmailSendpage from './pages/EmailSendpage';


const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "cursive"
    }
  }
});

function App() {

  const { userData, setUserData } = useContext(UserContext);
  const [serverErr, setServerErr] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.pathname)

  const getUserData = async () => {
    const response = await authService.getCurrentUser();
    if (!response) {
      setServerErr(true);
      return;
    }
    if (response.status === 401 && location.pathname.slice(0,16)!=="/forgot-password" && location.pathname.slice(0,3)!=="/er") {
      navigate('/login');
    } else if (response.status === 200) {
      setUserData(response.data);
    }
  }

  useEffect(() => {
    if (!userData) {
      getUserData();
    }
  }, []);

  if (serverErr) {
    return <Grid component="main" sx={{ width: "100%", height: "100vh", textAlign: "center", mt: "20%" }} >
      <Typography color="red" sx={{ fontWeight: "bold", fontSize: 30 }} >Ooops!!!</Typography>
      <Typography color="red" sx={{ fontWeight: "bold" }} >Server Error: Something happened in Server. Please Try again later.</Typography>
    </Grid>
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/er' element={<EmailSendpage />} />
          <Route path='/forgot-password/:id' element={<ForgotPasswordPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
        {userData && <PrivateRoutes userType={userData.type} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
