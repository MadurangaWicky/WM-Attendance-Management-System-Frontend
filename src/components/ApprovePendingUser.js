import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from '../hooks/useFetch';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ApprovePendingUser = () => {

    const { data: pendingUsers, reFetch } = useFetch('https://localhost:5001/api/PendingUser');
    const [selected,setSelected] = useState([]);

    const handleApprove = (id) => {
        axios.get(`https://localhost:5001/api/PendingUser/approve/${id}`)
            .then((res) => {
                toast.success('Pending user approved successfully.');
                reFetch();
            }).catch((err) => {
                toast.error('Pending user approve failed.');
                reFetch();
            });
    }

    const handleReject = (id) => {
        axios.get(`https://localhost:5001/api/PendingUser/reject/${id}`)
            .then((res) => {
                toast.success('Pending user rejected successfully.');
                reFetch();
            }).catch((err) => {
                toast.error('Pending user reject failed.');
                reFetch();
            });
    }

    const handleApproveAll = ()=>{
        if(selected.length===0){
            return;
        }
        axios.post('https://localhost:5001/api/PendingUser/ApproveAll',{ids:selected})
            .then((res)=>{
                toast.success('Pending users approved successfully.');
                reFetch();
            }).catch((err)=>{
                toast.error('Pending users approve failed.');
                reFetch();
            });
    }

    const handleRejectAll = ()=>{
        if(selected.length===0){
            return;
        }
        axios.post('https://localhost:5001/api/PendingUser/RejectAll',{ids:selected})
            .then((res)=>{
                toast.success('Pending users rejected successfully.');
                reFetch();
            }).catch((err)=>{
                toast.error('Pending users reject failed.');
                reFetch();
            });
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'type', headerName: 'Type', width: 90 },
        {
            field: 'actions', headerName: 'Actions', renderCell: (values) => {
                return (
                    <React.Fragment>
                        <Button
                            variant='contained'
                            size='small'
                            color='warning'
                            onClick={() => handleApprove(values.id)}
                            sx={{ mr: 1, fontSize: 10 }}
                        >
                            Approve
                        </Button>
                        <Button
                            variant='outlined'
                            size='small'
                            color='error'
                            onClick={() => handleReject(values.id)}
                            sx={{ fontSize: 10 }}
                        >Reject
                        </Button>
                    </React.Fragment>
                )
            }, width: 150
        }
    ];

    return (
        <div style={{ height: 400, width: '100%', ...style }}>
            {pendingUsers && <><DataGrid
                sx={{backgroundColor:'white'}}
                rows={
                    pendingUsers.map((pendingUser) => {
                        return {
                            id: pendingUser.pendingUserId,
                            name: pendingUser.name,
                            email: pendingUser.email,
                            type: (pendingUser.type === 0) ? "Admin" : (pendingUser.type === 1) ? "Manager" : "Employee"
                        };
                    })}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(IDs)=>setSelected(IDs)}
            />
            <Grid container sx={{backgroundColor:'white'}} justifyContent='flex-end' mt={1} p={2} >
                <Button
                    variant='contained'
                    size='small'
                    color='warning'
                    onClick={handleApproveAll}
                    sx={{ mr: 1, fontSize: 12 }}
                >
                    Approve all
                </Button>
                <Button
                    variant='outlined'
                    size='small'
                    color='error'
                    onClick={handleRejectAll}
                    sx={{ fontSize: 12 }}
                >
                    Reject all
                </Button>
            </Grid></>}
        </div>
    )
};

export default ApprovePendingUser;