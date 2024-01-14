import React from 'react';
import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { dayDifference } from '../functions/timeDifference';
import { UserContext } from '../store/Context';

const chartTypes = ['Bar Chart', 'Pie Chart','Line Chart'];

const SelfStatisticsForm = () => {

    const [chartType, setChartType] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const {userData} = React.useContext(UserContext);

    let completeMsg;

    if (chartType && startDate && endDate) {
        completeMsg = dayDifference(startDate, endDate, true) <= 0 ?
            <Typography color="red" >Start Date must be less than End Date</Typography> :
            <Typography color="green" >{`Generate ${chartType} for date range ${startDate} to ${endDate}`}</Typography>
    }

    return (
        <Box
            id="statisticsForm"
            component="form"
            // onSubmit={submitHandler}
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
                    <BarChartIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography
                        variant="h5"
                    >
                        {userData.type===2?'Statistics':'Self Statistics'}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <FormControl variant="standard" fullWidth >
                        <InputLabel id="demo-simple-select-standard-label">Select Chart Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Select Chart Type"
                            name="chartType"
                            value={chartType}
                            required
                            onChange={(event) => setChartType(event.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                chartTypes.map((type, index) => <MenuItem key={index} value={type}>{type}</MenuItem>)
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
                        required
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ max: new Date().toISOString().slice(0, 10) }}
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        fullWidth
                    />
                    <Typography sx={{ m: 1 }}> to </Typography>
                    <TextField
                        id="outlined-end-date"
                        label="End Date"
                        type="date"
                        size="small"
                        name="endDate"
                        required
                        value={endDate}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ max: new Date().toISOString().slice(0, 10) }}
                        onChange={(event) => setEndDate(event.target.value)}
                        fullWidth
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
                        Generate Charts
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SelfStatisticsForm;