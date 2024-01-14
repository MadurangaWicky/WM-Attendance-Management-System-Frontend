import React from 'react';
import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { dayDifference } from '../functions/timeDifference';
import { UserContext } from '../store/Context';

const reportTypes = ['Performance Report', 'Attendee Report', 'Leave Master'];

const SelfReportForm = (props) => {

    const [reportType, setReportType] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const { userData } = React.useContext(UserContext);

    const submitHandler = (event) => {
        event.preventDefault();
        const reportData = {
            uId: userData.userId,
            requesterId: userData.userId,
            startDate: startDate,
            endDate: endDate,
            type: reportType
        }
        console.log(reportData);
        props.submitReportFormHandler(reportData);
    };

    let completeMsg;

    if (reportType && startDate && endDate) {
        completeMsg = dayDifference(startDate, endDate, true) <= 0 ?
            <Typography color="red" >Start Date must be less than End Date</Typography> :
            <Typography color="green" >{`Generate ${reportType} for date range ${startDate} to ${endDate}`}</Typography>
    }

    return (
        <Box
            id="reportsForm"
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
                    <SummarizeIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography
                        variant="h5"
                    >
                        {userData.type === 2 ? 'Reports' : 'Self Reports'}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <FormControl variant="standard" fullWidth >
                        <InputLabel id="demo-simple-select-standard-label">Select Report Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Select Report Type"
                            name="reportType"
                            value={reportType}
                            onChange={(event) => setReportType(event.target.value)}
                            required
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                reportTypes.map((type, index) => <MenuItem key={index} value={type}>{type}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Divider
                        textAlign='left'
                    >
                        <Typography>Enter Date Range</Typography>
                    </Divider>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex' }}
                >
                    <TextField
                        id="outlined-start-date"
                        label="Start Date"
                        type="date"
                        size="small"
                        name="startDate"
                        value={startDate}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ max: new Date().toISOString().slice(0, 10) }}
                        onChange={(event) => setStartDate(event.target.value)}
                        fullWidth
                        required
                    />
                    <Typography sx={{ m: 1 }}> to </Typography>
                    <TextField
                        id="outlined-end-date"
                        label="End Date"
                        type="date"
                        size="small"
                        name="endDate"
                        value={endDate}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ max: new Date().toISOString().slice(0, 10) }}
                        onChange={(event) => setEndDate(event.target.value)}
                        fullWidth
                        required
                    />
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
                        disabled={(startDate && endDate && (dayDifference(startDate, endDate, true) <= 0)) ? true : false}
                    >
                        Generate Report
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SelfReportForm;