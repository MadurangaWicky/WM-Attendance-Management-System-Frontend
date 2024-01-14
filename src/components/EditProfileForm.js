import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { UserContext } from '../store/Context';
import UpdateIcon from '@mui/icons-material/Update';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

const EditProfileForm = (props) => {

    const { userData, setUserData } = React.useContext(UserContext);
    const [user,setUser] = React.useState(userData);

    const submitHandler = (event) => {
        event.preventDefault();
        axios.put(`https://localhost:5001/api/User/${userData.userId}`, user)
            .then(res => {
                setUserData(user);
                props.onSaveChanges();
                toast.success('Profile updated.',{position:toast.POSITION.TOP_CENTER,autoClose:4000});
            }).catch(err => {
                props.onSaveChanges();
                toast.error('Profile update failed.',{position:toast.POSITION.TOP_CENTER,autoClose:4000});
            });
    }

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Box
            component="form"
            onSubmit={submitHandler}
            autoComplete="true"
            sx={style}
            maxWidth="450px"
        >
            <UpdateIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography
                variant="h5"
                mb={2}
            >
                Update User
            </Typography>
            {user && <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        id="outlinedName"
                        label="Name"
                        size="small"
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        id="outlined-email"
                        label="Email"
                        type="email"
                        size="small"
                        name="email"
                        value={user.email}
                        fullWidth
                        required
                        disabled={!(user.type === 0)}
                    />
                </Grid>
                <Grid
                    item
                    xs={7}
                >
                    <TextField
                        id="outlined-password"
                        label="Password"
                        type="password"
                        size="small"
                        name="password"
                        value={user.password}
                        fullWidth
                        required
                        disabled
                    />
                </Grid>
                <Grid
                    item
                    xs={5}
                >
                    <Button size="small" variant='contained' sx={{ mt: 0.5, ml: 1 }} onClick={props.onClickChangePassword} >Change Password</Button>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        id="outlined-nic"
                        label="NIC"
                        type="text"
                        size="small"
                        name="nic"
                        value={user.nic}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!(user.nic.length==10)}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        id="outlined-telephone"
                        label="Telephone"
                        type="tel"
                        size="small"
                        name="telephone"
                        value={user.telephone}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={(user.telephone.length!==10)}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        label="Address"
                        type="text"
                        size="small"
                        name="address"
                        value={user.address}
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
                    <Button type="submit" variant="contained" size="large" >Save Changes</Button>
                </Grid>
            </Grid>}
        </Box>
    )
};

export default EditProfileForm;