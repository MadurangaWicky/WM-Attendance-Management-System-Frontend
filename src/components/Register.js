import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Divider, Grid, Typography, Autocomplete, InputAdornment, IconButton, Avatar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = (props) => {

  const provinceRef = useRef(); 
  const userRef = useRef();
  const [proImg,setProImg] = useState(null); 
  const [proPicSrc,setProPicSrc] = useState(null); 
  const[userType, setUserType] = useState('');

  const [user,setUser] = useState({
    firstName:'',
    lastName:'',
    email:'',
    nic:'',
    password:'',
    confirmPassword:'',
    telephone:'',
    no:'',
    street:'',
    city:''
  })


  const empTypes = [
    {label:"Employee" , value: 2 },
    {label:"Manager" , value:1 }
    
    ]

  const typeChange = (event)=>{

    if(event.target.value=="Employee"){setUserType('2')}
    else if(event.target.value=="Manager"){setUserType('1')}
    console.log(event.target.value);
    
    
    }

  const handleChange = (event)=>{
    setUser({
      ...user,
      [event.target.name]:event.target.value
    });
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isPasswordCorrect,setIsPasswordCorrect] = useState(true); 
  const regex = new RegExp("/[0-9]{9}[a-z]/")
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }
  const showPreview = (event) => {
    if(event.target.files&&event.target.files[0]){
      let imgFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) =>{
        setProImg(imgFile);
        setProPicSrc(x.target.result);
        console.log(x.target.value);
      };
      reader.readAsDataURL(imgFile);
    }
  }





  const submitHandler = (event) => {
    event.preventDefault();
    if(user.password!==user.confirmPassword){
      setIsPasswordCorrect(false);
      return;
    }
    setIsPasswordCorrect(true);
    const formData = new FormData();
    formData.append('name',user.firstName + " " + user.lastName);
    formData.append('email',user.email);
    formData.append('password',user.password);
    formData.append('nic',user.nic);
    formData.append('telephone',user.telephone);
    formData.append('address',(user.no ? user.no + "," : "")
        + (user.street ? user.street + "," : "")
        + (user.city ? user.city + "," : "")
        + (provinceRef.current.value ? provinceRef.current.value + "." : ""));
    formData.append('profilePicture', proImg);
    formData.append('type', userType);
    formData.append('noOfAnnualLeaves', 20);
    formData.append('status', "Pending");
    formData.append('confirm',0);
    console.log(Array.from(formData));
    props.registrationFormHandler(formData);
  }

  const provinceList = [
    { label: "Southern Province" },
    { label: "Western Province" },
    { label: "Central Province" },
    { label: "North Western Province" },
    { label: "Sabaragamuwa Province" },
    { label: "Eastern Province" },
    { label: "North Central Province" },
    { label: "Uva Province" },
    { label: "Northern Province" }
  ]




  return (
      <Box
        component="form"
        onSubmit={submitHandler}
        autoComplete="true"
        sx={
          {
            padding: 3,
            boxShadow: 5,
            ml:"10%"
          }
        }
        maxWidth="450px"
      >
        <PersonAddAltIcon color="primary" sx={{ fontSize: 60 }} />
        <Typography
          variant="h5"
          mb={2}
        >
          Register
        </Typography>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              error={user.firstName.length>20}
              id="outlined-firstName"
              label="First Name"
              size="small"
              type="text"
              name='firstName'
              helperText={user.firstName.length>20&&"You exceeded limit"}
              value={user.firstName}
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              id="outlined-lastName"
              label="Last Name"
              size="small"
              type="text"
              fullWidth
              required
              name='lastName'
              onChange={handleChange}
              value={user.lastName}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              error={props.emailErrState}
              id="outlined-email"
              label="Email"
              type="email"
              size="small"
              helperText={props.emailErr}
              fullWidth
              required
              name='email'
              onChange={handleChange}
              value={user.email}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              error={isPasswordCorrect?false:true}
              id="outlined-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              size="small"
              fullWidth
              required
              name='password'
              onChange={handleChange}
              value={user.password}
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
            sm={6}
          >
            <TextField
              error={isPasswordCorrect?false:true}
              id="outlined-confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              size="small"
              helperText={isPasswordCorrect?"":"Did not match with password"}
              fullWidth
              required
              name='confirmPassword'
              onChange={handleChange}
              value={user.confirmPassword}
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
            sm={6}
          >
            <TextField
              error={(user.nic.length>10)}
              id="outlined-nic"
              label="NIC"
              type="text"
              size="small"
              fullWidth
              required
              name='nic'
              onChange={handleChange}
              value={user.nic}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              id="outlined-telephone"
              label="Telephone"
              type="tel"
              size="small"
              fullWidth
              required
              name='telephone'
              onChange={handleChange}
              value={user.telephone}
              error={user.telephone.length>10}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
          >
            <Divider
              textAlign='left'
            >
              Address
            </Divider>
            <Grid
              item
              mb={1}
              mt={1}
            >
              <TextField
                id="outlined-no"
                label="No"
                type="text"
                size="small"
                fullWidth
                required
                name='no'
                onChange={handleChange}
                value={user.no}
              />
            </Grid>
            <Grid
              item
              mb={1}
            >
              <TextField
                id="outlined-street"
                label="Street"
                type="text"
                size="small"
                fullWidth
                required
                name='street'
                onChange={handleChange}
                value={user.street}
              />
            </Grid>
            <Grid
              item
              mb={1}
            >
              <TextField
                id="outlined-city"
                label="City"
                type="text"
                size="small"
                fullWidth
                required
                name='city'
                onChange={handleChange}
                value={user.city}
              />
            </Grid>
            <Grid
              item
            >
              <Autocomplete
                disablePortal
                id="combo-box"
                size="small"
                options={provinceList}
                renderInput={(params) => <TextField {...params} 
                inputRef={provinceRef}
                required label="Province" />}
              />
            </Grid>
            <Grid
              item
            >
              <br></br>
              <FormControl variant="standard" fullWidth >
                        <InputLabel id="demo-simple-select-standard-label">Select Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Select Type"
                            
                            required
                            value={userType}
                            onChange={(event)=>setUserType(event.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                empTypes.map((emp) => <MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sm={5}
          >
            <TextField
              error={props.profilePicErrState}
              id="outlined-profilePic"
              label="Prifile Picture"
              type="file"
              size="small"
              helperText={props.profilePicErr}
              required
              InputLabelProps={{ shrink: true }}
              fullWidth
              onChange={showPreview}
            />
            <Avatar 
              alt="Picture"
              src={proPicSrc}
              sx={{width:"80%",height:"60%",m:"10%"}}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
          >
            <Button type="submit" variant="contained" size="large" endIcon={<AppRegistrationIcon />} >Register</Button>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography>Already have a account ?  <Button component={RouterLink} to='/login'>Login</Button></Typography>
          </Grid>
        </Grid>
      </Box>
  )
};

export default Register;