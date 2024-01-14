import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'
import { UserContext } from "../store/Context";
import useFetch from "../hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { getCalendarEvents } from "../functions/calendarEvents";


const clickDateHandler = (arg)=>{
  console.log(arg);
}

const Calendar = ()=>{

  const {userData} = React.useContext(UserContext);
  const {data} = useFetch(`https://localhost:5001/api/Calendar/userId?userId=${userData.userId}`);

  if(!data){
    return <CircularProgress color="inherit" />
  };

  return (
    <React.Fragment>
      <FullCalendar
        height="100vh"
        initialView="dayGridMonth"
        themeSystem="Simplex"
        headerToolbar={{
          left: "",
          center: "title",
          right: "prev,next",
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        events={getCalendarEvents(data)}
        displayEventEnd="true"
        eventColor="purple"
        dateClick={clickDateHandler}
        eventClick={clickDateHandler}
      />
    </React.Fragment>
  );
};

export default Calendar;
