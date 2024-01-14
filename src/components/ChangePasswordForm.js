import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { UserContext } from '../store/Context';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

const ChangePasswordForm = (props) => {

    const { userData } = React.useContext(UserContext);
    const [input, setInput] = React.useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    const [showPasswords, setShowPasswords] = React.useState(false);
    const [passwordNotMatch, setPasswordNotMatch] = React.useState(false);
    const [isOldPasswordIncorrect,setIsOldPasswordIncorrect] = React.useState('');

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (input.newPassword !== input.confirmNewPassword) {
            setIsOldPasswordIncorrect('');
            setPasswordNotMatch(true);
            return;
        }
        setPasswordNotMatch(false);
        const { confirmNewPassword, ...changePasswordData } = input;
        axios.put(`https://localhost:5001/api/User/change-password/${userData.userId}`, changePasswordData)
            .then(res => {
                props.closePasswordForm();
                toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER, autoClose: 4000 });
            }).catch(err => {
                if (err.response.status === 400) {
                    setIsOldPasswordIncorrect(err.response.data.message);
                } else {
                    props.closePasswordForm();
                    setIsOldPasswordIncorrect('');
                    toast.error('Password Change failed.', { position: toast.POSITION.TOP_CENTER, autoClose: 4000 });
                }
            });
    };

    return (
        <Box
            component="form"
            onSubmit={submitHandler}
            autoComplete="true"
            sx={style}
            maxWidth="450px"
        >
            <Typography
                variant="h5"
                mb={2}
            >
                Change Password
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
                        error={!!isOldPasswordIncorrect}
                        id="outlinedName"
                        label="Current Password"
                        size="small"
                        type={showPasswords ? "text" : "password"}
                        name="currentPassword"
                        fullWidth
                        helperText={(!!isOldPasswordIncorrect)&&isOldPasswordIncorrect}
                        value={input.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        error={passwordNotMatch}
                        id="outlined-email"
                        label="New Password"
                        type={showPasswords ? "text" : "password"}
                        size="small"
                        name="newPassword"
                        value={input.newPassword}
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
                        error={passwordNotMatch}
                        id="outlined-email"
                        label="Confirm New Password"
                        type={showPasswords ? "text" : "password"}
                        size="small"
                        name="confirmNewPassword"
                        helperText={passwordNotMatch && "Password must same as new paasword"}
                        value={input.confirmNewPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <FormControlLabel control={<Checkbox onChange={(event) => setShowPasswords(event.target.checked)} />} label="Show Password" />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                >
                    <Button type="submit" variant="contained" size="large" >Change Password</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ChangePasswordForm;