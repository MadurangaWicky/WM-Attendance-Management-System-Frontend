import React,{useState} from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import UpdateIcon from '@mui/icons-material/Update';
import { toast } from 'react-toastify';




 function EmailInputForm() {
    const [Email, setEmail] = useState('');

const submitHandler=(event)=>{
    event.preventDefault();
    axios.post('https://localhost:5001/api/User/forgot-password',{email:Email,password:''})
        .then(res=>toast.success(res.data))
        .catch(err=>{toast.error('Forgot password failed. Try again later.');console.log(err.response)});
}

const handleChange=(event)=>{
setEmail(event.target.value);
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
        Enter Registered Email...
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
                
                label="Email"
                size="small"
                type="email"
                name="email"                   
                onChange={handleChange}
                fullWidth
                required
            />
        </Grid>
        
        
        <Grid
            item
            xs={12}
            sm={12}
        >
            <Button type="submit" variant="contained" size="large" >Send</Button>
        </Grid>
    </Grid>
</Box>
  )
}
export default EmailInputForm;