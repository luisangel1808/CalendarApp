import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { NavBar } from "../component/NavBar";
import { localizer, getMessagesES } from '../../helpers';
import { CalendarEvent } from '../component/CalendarEvent';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../component/CalendarModal';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks/';
import { FabAddNew } from '../component/FabAddNew';
import { FabDelete } from '../component/FabDelete';

export const CalendarPage = () => {

  const {user} = useAuthStore();
  const {openDateModal} = useUiStore();
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) =>{

    const isMyEvent = (user.uid=== event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {style}
  }

  const onDoubleClick = event =>{
    openDateModal();
  }

  const onSelect = event =>{
    setActiveEvent(event)
  }

  const onViewChanged = event =>{
    localStorage.setItem('lastView',event);
    setLastView(event)
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])
  


  return (
    <>
        <NavBar/>
        <Calendar
          culture='es'
          localizer={localizer}
          events={events}
          defaultView={"agenda"}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)' }}
          messages={getMessagesES()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChanged}
        />
        <CalendarModal/>
        <FabAddNew/>
        <FabDelete/>
    </>
  )
}
