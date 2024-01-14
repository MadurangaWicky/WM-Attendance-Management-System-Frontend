import React, { useContext, useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { MultiSelect } from 'react-multi-select-component';
import VideocamIcon from '@mui/icons-material/Videocam';
import { minuteDifference } from '../functions/timeDifference';
import { UserContext } from '../store/Context';
import useFetch from '../hooks/useFetch';

const VideoConferenceForm = (props) => {

    const {data} = useFetch('https://localhost:5001/api/User');
    const [selected, setSelected] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [hostId,setHostId] = useState('');
    const { userData } = useContext(UserContext);

    const submitHandler = (event)=>{
        event.preventDefault();
        const conferenceData = {
            conferenceId:new Date().valueOf().toString(),
            date:date,
            time:time,
            hostId:hostId?hostId:userData.userId,
            schedulerId:userData.userId,
            participants:selected.map(participant=>participant.value).filter(user=>user!==userData.userId&&user!==hostId)
        };
        props.submitFormHandler(conferenceData);
    };

    let completeMsg;

    if (date && time && selected.length > 0) {
        completeMsg = minuteDifference(new Date(), new Date(date + 'T' + time), true) <= 0 ?
            <Typography sx={{ color: "red" }} >{'Conference can not be schedule for past times'}</Typography> :
            <Typography sx={{ color: "green" }} >{`Video Conference Start at ${time} of ${date}`}</Typography>;
    };
    console.log(selected);
    return (
        <Box
            id="videoConferenceForm"
            component="form"
            onSubmit={submitHandler}
            autoComplete="true"
            sx={
                {
                    mx: "10%",
                    padding: 3,
                    boxShadow: 10
                }
            }
            maxWidth="400px"
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
                    <VideocamIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography
                        variant="h5"
                    >
                        Schedule Video Conference
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        id="outlined-select-date"
                        label="Select Date"
                        type="date"
                        size="small"
                        name="date"
                        value={date}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: new Date().toISOString().slice(0, 10) }}
                        onChange={(event) => setDate(event.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        id="outlined-start-time"
                        label="Select Start Time"
                        type="time"
                        size="small"
                        name="startTime"
                        value={time}
                        InputLabelProps={{ shrink: true }}
                        onChange={(event) => setTime(event.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                {userData.type===2&&data&&<Grid
                    item
                    xs={12}
                >
                        <FormControl variant="standard" fullWidth >
                        <InputLabel>Select Host</InputLabel>
                        <Select
                            required
                            value={hostId}
                            onChange={(event)=>setHostId(event.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {data.filter(user=>user.type!==2).map(host=><MenuItem key={host.userId} value={host.userId} >{host.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>}
                <Grid
                    item
                    xs={12}
                >
                    {data&&<MultiSelect
                        options={data.map((user)=>{
                            return {label:user.name,value:user.userId}
                        }).filter(user=>user.value!==userData.userId&&user.value!==hostId)}
                        value={selected}
                        onChange={setSelected}
                    />}
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    {
                        completeMsg ? completeMsg : null
                    }
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button size="medium"
                        type="submit"
                        variant="contained"
                        disabled={!selected.length > 0 || minuteDifference(new Date(), new Date(date + 'T' + time), true) <= 0}
                    >
                        Schedule Now
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default VideoConferenceForm;