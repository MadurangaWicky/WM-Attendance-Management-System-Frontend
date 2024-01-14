import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
};

const RecentRecordsTable = (props) => {
    return (
        <TableContainer component={Paper} sx={style} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell >Reason</TableCell>
                        <TableCell >Duration</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.leaveDetails.slice(-5).map((leaveDetail) => {
                            return <TableRow key={leaveDetail.leaveId} >
                                <TableCell component="th" scope="row">
                                    {leaveDetail.date.slice(0, 10)}
                                </TableCell>
                                <TableCell >{leaveDetail.type}</TableCell>
                                <TableCell >{`${leaveDetail.duration * 8} Hours`}</TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default RecentRecordsTable;