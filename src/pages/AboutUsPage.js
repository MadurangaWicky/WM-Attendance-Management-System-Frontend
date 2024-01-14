import React from 'react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { Box, Typography,Grid, TextField, Button, Card, CardContent } from '@mui/material';

const AboutUsPage = () => {
  return (
    <div>
      <React.Fragment>
<Navigation/>
<Grid container component="main" sx={{ height: "100vh", p: 5, mt:5 }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          lg={6}
          sx={{

            backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/5099304.jpg)",
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
          sx={{ textAlign: "left" }}
        >
          <Typography variant='h4' sx={{fontWeight:"bold"}} >About Us</Typography>
          <Typography >Who We Are... Why We Are...</Typography>
          <br></br><br></br>
          <Box>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto",opacity:'100%' }}>
          <CardContent>
             
            <Typography variant="h5" color="textPrimary" component="h5" gutterBottom textAlign='center'>
              Team Webmaster 
          </Typography> 
          <Typography variant="p" color="textSecondary" component="p" gutterBottom textAlign='center'>
              We are Team Webmaster who are doing the Second year Industry based project, University of Moratuwa, Faculty of Information Technology.
              As well as, this application provides various advantages to Companies who are willing to collect attendance using some Biometric method and, need to use Leave 
              management, See Stats datas and so on...
            
          </Typography> 
            
          </CardContent>
        </Card>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto",opacity:'100%' }}>
          <CardContent>
             
            <Typography variant="h5" color="textPrimary" component="h5" gutterBottom textAlign='center'>
              Our Mission 
          </Typography> 
          <Typography variant="p" color="textSecondary" component="p" gutterBottom textAlign='center'>
              FullFill the problems in modern Attendance Systems and Provide a better user friendly application that contains all nessasory features for easy use.
            
          </Typography> 
            
          </CardContent>
        </Card>
      </Grid>
     
      </Box>
        </Grid>
      </Grid>
      

<Footer/>
</React.Fragment>
    </div>
  )
}

export default AboutUsPage;