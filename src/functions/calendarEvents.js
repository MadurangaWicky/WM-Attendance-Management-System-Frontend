export const getCalendarEvents = (data)=>{
    let generatedcalendarEvents = [];
    data.calendarEvents.map((event)=>{
        if(event.duration>1){
            const date = new Date(event.date);
            const endDate = new Date(date.setDate(date.getDate()+parseInt(event.duration)+1)).toISOString();
            return generatedcalendarEvents.push({
                title: event.eventName,
                start: event.date.slice(0,10),
                end: endDate.slice(0,10)
            });
        }
        else if(event.duration===1){
            return generatedcalendarEvents.push({
                title: event.eventName, 
                start: event.date.slice(0,10)
            });
        }else if(event.type.match('First Half')){
            return generatedcalendarEvents.push({
                title: event.eventName,
                start: event.date.slice(0,11)+"08:00:00",
                end: event.date.slice(0,11)+"12:00:00"
            });
        }else{
            return generatedcalendarEvents.push({
                title: event.eventName,
                start: event.date.slice(0,11)+"12:00:00",
                end: event.date.slice(0,11)+"16:00:00"
            });
        }
    });
    data.shortCalendarEvents.map((event)=>{
        return generatedcalendarEvents.push({
            title: event.eventName,
            start: event.date.slice(0,11)+event.startTime,
            end: event.date.slice(0,11)+event.endTime
        });
    });
    return generatedcalendarEvents;
}