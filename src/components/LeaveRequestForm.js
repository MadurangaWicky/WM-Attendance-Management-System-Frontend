import React from 'react';
import { Box, Grid, Button, Typography, TextField, InputLabel, Select, MenuItem, FormControl, CircularProgress } from '@mui/material';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import { dayDifference, hourDifference, minuteDifference, numOfSundays } from '../functions/timeDifference';
import { UserContext } from '../store/Context';
import useFetch from '../hooks/useFetch';

const durations = ['Few Hours', 'First Half', 'Second Half', 'Full Day', 'Multi Days'];

const LeaveRequestForm = (props) => {
    const [leaveTypeId, setLeaveTypeId] = React.useState('');
    const [durationType, setDurationType] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    const {userData} = React.useContext(UserContext);
    const {data: leaveTypes} = useFetch('https://localhost:5001/api/LeaveDetail/leave-types');

    React.useEffect(()=>{
        setStartDate('');
        setEndDate('');
        setStartTime('');
        setEndTime('');
    },[durationType]);
 
    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(document.getElementById('leaveRequestForm'));
        formData.append('status', 'Pending');
        formData.append('senderId',userData.userId);
        if (durationType.match('Few Hours')) {
            formData.delete('type');
            props.submitShortLeaveHandler(formData);
            return;
        } else if (durationType.match('First Half')||durationType.match('Second Half')) {
            formData.append('duration', 0.5);
        } else if (durationType.match('Full Day')) {
            formData.append('duration', 1);
        } else {
            const days = dayDifference(startDate,endDate,false)+1-numOfSundays(startDate,endDate);
            formData.append('duration', days);
        }
        props.submitFormHandler(formData);
    }

    const onChangeEndDate = (event) => {
        setEndDate(event.target.value);
        setEndTime('');
    }

    let completeDetails;

    if(startTime&&startDate&&(minuteDifference(new Date(),new Date(startDate+'T'+startTime),true)<=0)){
        completeDetails = <Typography sx={{ color: "red" }} >{'Time must be greater than Current Time'}</Typography>;
    }
    else if (leaveTypeId && durationType.match('Multi Days') && startDate && endDate) {
        completeDetails = dayDifference(startDate,endDate,true) === 0 ? <Typography sx={{ color: "red" }} >{'Multi Day option can not use for 1 Day. Please use Full Day option'}</Typography>:
         dayDifference(startDate,endDate,true) < 0 ?
            <Typography sx={{ color: "red" }} >{'End Date cannot be lower than Start Date'}</Typography> :
            <React.Fragment>
                <Typography sx={{ color: "green" }}>
                    {`${leaveTypes.filter(leave=>leave.id===leaveTypeId)[0].type} from ${startDate} to ${endDate}`}
                </Typography>
                <Typography sx={{ color: "green" }}>{`${dayDifference(startDate,endDate,true)+1-numOfSundays(startDate,endDate)} Days`}</Typography>
            </React.Fragment>
    } else if (durationType.match('Few Hours') && startDate && startTime && endTime) {
        completeDetails = minuteDifference(new Date(startDate+"T"+startTime),new Date(startDate+"T"+endTime),true) <= 0?
        <Typography sx={{ color: "red" }} >{'End Time cannot be lower than Start Time'}</Typography> :
        <React.Fragment>
            <Typography sx={{color:"green"}}>
                {`Short Leave for ${startDate} from ${startTime} to ${endTime}`}
            </Typography>
            <Typography sx={{color:"green"}}>
                    {`${hourDifference(new Date(startDate + "T" + startTime),new Date(startDate + "T" + endTime),false)} Hours and ${minuteDifference(new Date(startDate + "T" + startTime),new Date(startDate + "T" + endTime),false)} Minutes`}
                </Typography>
        </React.Fragment>
    } else if (leaveTypeId && (durationType.match('First Half') || durationType.match('Second Half') || durationType.match('Full Day')) && startDate) {
        completeDetails = <Typography sx={{color:"green"}}>
            {`${leaveTypes.filter(leave=>leave.id===leaveTypeId)[0].type} as ${durationType} for ${startDate}`}
        </Typography>
    } else {
        completeDetails = null;
    }

    if(!leaveTypes){
        return <CircularProgress color="inherit" />
    }

    return (
        <Box
            id="leaveRequestForm"
            component="form"
            onSubmit={submitHandler}
            autoComplete="true"
            sx={
                {
                    mx:"10%",
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
                    <TimeToLeaveIcon color='primary' sx={{fontSize:40}} />
                    <Typography
                        variant="h5"
                    >
                        Leave Request
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <FormControl variant="standard" fullWidth >
                        <InputLabel id="demo-simple-select-standard-label 2">Select Duration</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label 2"
                            id="demo-simple-select-standard 2"
                            label="Select Duration"
                            name="type"
                            required
                            value={durationType}
                            onChange={(event)=>setDurationType(event.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                durations.map((duration) => <MenuItem key={duration} value={duration} >{duration}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{mb:1}}
                >
                    {durationType.match('Few Hours')||!durationType?null:<FormControl variant="standard" fullWidth >
                        <InputLabel id="demo-simple-select-standard-label">Select Leave Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Select Leave Type"
                            name="leaveTypeId"
                            required
                            value={leaveTypeId}
                            onChange={(event)=>setLeaveTypeId(event.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                leaveTypes.map((leave) => <MenuItem key={leave.id} value={leave.id}>{leave.type}</MenuItem>)
                            }
                        </Select>
                    </FormControl>}
                </Grid>
                {durationType.match('Few Hours') ?
                    <React.Fragment>
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
                                required
                                inputProps={{min:new Date().toISOString().slice(0,10)}}
                                value={startDate}
                                InputLabelProps={{ shrink: true }}
                                onChange={(event)=>setStartDate(event.target.value)}
                                fullWidth
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
                                required
                                value={startTime}
                                InputLabelProps={{ shrink: true }}
                                onChange={(event)=>setStartTime(event.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                id="outlined-end-time"
                                label="Select End Time"
                                type="time"
                                size="small"
                                name="endTime"
                                required
                                value={endTime}
                                InputLabelProps={{ shrink: true }}
                                onChange={(event)=>setEndTime(event.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </React.Fragment> :
                    durationType.match('First Half') || durationType.match('Second Half') || durationType.match('Full Day') ?
                        <React.Fragment>
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
                                    required
                                    value={startDate}
                                    inputProps={{min:new Date().toISOString().slice(0,10)}}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(event)=>setStartDate(event.target.value)}
                                    fullWidth
                                />
                            </Grid>
                        </React.Fragment> : durationType.match('Multi Days') ?
                            <React.Fragment>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        id="outlined-select-date"
                                        label="Start Date"
                                        type="date"
                                        size="small"
                                        name="date"
                                        required
                                        value={startDate}
                                        inputProps={{min:new Date().toISOString().slice(0,10)}}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(event)=>setStartDate(event.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        id="outlined-select-date"
                                        label="End Date"
                                        type="date"
                                        size="small"
                                        required
                                        value={endDate}
                                        inputProps={{min:new Date().toISOString().slice(0,10)}}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={onChangeEndDate}
                                        fullWidth
                                    />
                                </Grid>
                            </React.Fragment> : null}
                {durationType ?
                    <Grid
                        item
                        xs={12}
                    >
                        <TextField
                            id="outlined-special-notes"
                            label="Special Notes"
                            size="small"
                            name="specialNote"
                            inputProps={{maxLength:100}}
                            multiline
                            fullWidth
                        />
                    </Grid> : null}
                <Grid
                    item
                    xs={12}
                >
                    {
                        completeDetails ? completeDetails : null
                    }
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button size="medium"
                        type="submit"
                        variant="contained"
                        disabled={startDate && startTime && endTime ? (hourDifference(new Date(startDate + "T" + startTime),new Date(startDate + "T" + endTime),true) <= 0 || hourDifference(new Date(),new Date(startDate + "T" + startTime),true) <= 0) : startDate && endDate ? dayDifference(new Date(startDate),new Date(endDate)) <= 0 :false}
                    >
                        Submit Request
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default LeaveRequestForm;