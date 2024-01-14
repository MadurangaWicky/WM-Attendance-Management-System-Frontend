import React from 'react';
import { Box, Button, Modal, Typography, Avatar } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import FeedIcon from '@mui/icons-material/Feed';
import { UserContext } from '../store/Context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LeaveRequestCard = (props) => {

  const [openDetailsModal, setOpenDetailsModal] = React.useState(false);
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  const [displayMsg, setDisplayMsg] = React.useState('');
  const [isApprove, setIsApprove] = React.useState(true);
  const { userData } = React.useContext(UserContext);

  const acceptClickHandler = () => {
    setDisplayMsg('Do you want to confirm your approval ?');
    setOpenConfirmModal(true);
    setIsApprove(true);
  }

  const rejectClickHandler = () => {
    setDisplayMsg('Do you want to confirm your rejection ?');
    setOpenConfirmModal(true);
    setIsApprove(false);
  }

  const approveLeaveHandler = () => {
    const approveData = {
      decision: "Approved",
      requestId: props.details.id,
      approvalId: userData.userId
    }
    props.approveLeaveRequestHandler(approveData);
    setOpenDetailsModal(false);
    setOpenConfirmModal(false);
  }

  const rejectLeaveHandler = () => {
    const approveData = {
      decision: "Rejected",
      requestId: props.details.id,
      approvalId: userData.userId
    }
    props.approveLeaveRequestHandler(approveData);
    setOpenDetailsModal(false);
    setOpenConfirmModal(false);
  }

  return (
    <React.Fragment>
      <Box sx={{ width: "100%", display: "flex", justifyContent: 'center', p: 1 }} >
        <Avatar alt={props.details.name} src={`https://localhost:5001/Images/${props.details.profilePic}`} sx={{ width: 50, height: 50 }} />
        <Box sx={{ width: "25%", ml: 3 }}>
          <Typography sx={{ fontSize: 14, textAlign: "left" }} >Name : {props.details.name.split(' ')[0]}</Typography>
          <Typography sx={{ fontSize: 14, textAlign: "left" }} >NIC : {props.details.nic}</Typography>
        </Box>
        <Button size="small" color='success' variant='contained' sx={{ mx: 1, my: 0.7 }} onClick={acceptClickHandler} endIcon={<DoneIcon />} >Accept</Button>
        <Button size="small" color='error' variant='outlined' sx={{ mx: 1, my: 0.7 }} onClick={rejectClickHandler} endIcon={<CloseIcon />} >Reject</Button>
        <Button size="small" color='info' variant='outlined' sx={{ mx: 1, my: 0.7 }} onClick={() => setOpenDetailsModal(true)} endIcon={<FeedIcon />} >Details</Button>
      </Box>
      <Modal open={openDetailsModal} onClose={() => setOpenDetailsModal(false)} >
        <Box sx={style}>
          <Box sx={{ width: "100%", ml: 8 }} >
            <Avatar src={`https://localhost:5001/Images/${props.details.profilePic}`} sx={{ ml: 12, width: 80, height: 80 }} />
            <Typography sx={{ mt: 1 }} >
              Name: {props.details.name}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              NIC: {props.details.nic}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Leave Reason: {props.details.type}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Type: {props.details.durationType}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Duration: {props.details.duration}
            </Typography>
            <Box sx={{ ml: 15 }}>
              <Button size="small" color='success' variant='contained' sx={{ mx: 1 }} onClick={acceptClickHandler} >Accept</Button>
              <Button size="small" color='error' variant='outlined' sx={{ mx: 1 }} onClick={rejectClickHandler} >Reject</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)} >
        <Box sx={style}>
          {
            displayMsg ? <Typography>{displayMsg}</Typography> : null
          }
          <Button size="small" color='success' variant='contained' sx={{ mx: 1 }} onClick={isApprove ? approveLeaveHandler : rejectLeaveHandler} >Confirm</Button>
          <Button size="small" color='error' variant='outlined' sx={{ mx: 1 }} onClick={() => setOpenConfirmModal(false)} >Cancel</Button>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default LeaveRequestCard;