import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography, Switch } from '@mui/material';
import { UserContext } from '../store/Context';
import { DataGrid } from '@mui/x-data-grid';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const columnsLeave = [
    { field: 'date', headerName: 'Date', width: 220 },
    { field: 'type', headerName: 'Leave Type', width: 170 },
    { field: 'duration', headerName: 'Duration', width: 170 }
]

const columnsShortLeave = [
    { field: 'date', headerName: 'Date', width: 220 },
    { field: 'startTime', headerName: 'Start Time', width: 170 },
    { field: 'endTime', headerName: 'End Time', width: 170 }
]

const PendingRecordsTable = (props) => {

    const { userData } = React.useContext(UserContext);
    const [toggleTable, setToggleTable] = React.useState(true);
    console.log(props.pendingDetails.pendingShortLeaves);

    return (
        <div style={{ height: 400, width: '100%', ...style }} >
            {toggleTable ? <DataGrid
                sx={{ backgroundColor: 'white' }}
                rows={
                    props.pendingDetails.pendingLeaves.filter(leave => leave.nic === userData.nic).map((leave) => {
                        return {
                            id: leave.id,
                            date: leave.date.slice(0, 10),
                            type: leave.type,
                            duration: `${leave.duration * 8} Hours`
                        };
                    })}
                columns={columnsLeave}
                pageSize={5}
                rowsPerPageOptions={[5]}
            /> :
                <DataGrid
                    sx={{ backgroundColor: 'white' }}
                    rows={
                        props.pendingDetails.pendingShortLeaves.filter(leave => leave.nic === userData.nic).map((leave) => {
                            return {
                                id: leave.id,
                                date: leave.date.slice(0, 10),
                                startTime: leave.startTime,
                                endTime: leave.endTime
                            };
                        })}
                    columns={columnsShortLeave}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />}
            <Stack direction='row' spacing={1} alignItems='center' sx={{ backgroundColor: 'white' }} >
                <Typography sx={{ ml: "35%" }} >Leave</Typography>
                <Switch
                    color='secondary'
                    onChange={() => setToggleTable(!toggleTable)}
                />
                <Typography>Short Leave</Typography>
            </Stack>
        </div>
    )
};

export default PendingRecordsTable;