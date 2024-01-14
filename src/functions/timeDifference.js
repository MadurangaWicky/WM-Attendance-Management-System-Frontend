import moment from "moment";

export const dayDifference = (startDate, endDate, asDays) => {
    if (asDays)
        return moment.duration(moment(new Date(endDate)).diff(new Date(startDate))).asDays();

    return moment.duration(moment(new Date(endDate)).diff(new Date(startDate))).days();
}

export const hourDifference = (startDate, endDate, asHours) => {
    if (asHours)
        return moment.duration(moment(new Date(endDate)).diff(new Date(startDate))).asHours();

    return moment.duration(moment(new Date(endDate)).diff(new Date(startDate))).hours();
}

export const minuteDifference = (startDate, endDate, asMinutes) => {
    if (asMinutes)
        return moment.duration(moment(new Date(endDate)).diff(new Date(startDate))).asMinutes();

    return moment.duration(moment(new Date(endDate)).diff(new Date(startDate))).minutes();
}

export const numOfSundays = (startDate,endDate) =>{
    const start = new Date(startDate);
    const end = new Date(endDate);
    let sundays;
    if(end.getDay()===0){
        sundays=1;
    }else{
        sundays=0;
    }
    while(start.toString()!==end.toString()){
        if(start.getDay()===0){
            sundays++;
        }
        start.setDate(start.getDate()+1);
    }
    return sundays;
}