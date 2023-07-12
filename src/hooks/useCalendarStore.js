import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( CalendarEvent ) => {
        dispatch( onSetActiveEvent( CalendarEvent ) )
    }

    const startSavingEvent = async( CalendarEvent ) => {
      // TODO: llegar al backend

      // OK:
      if( CalendarEvent._id ) {
          // Actualizando
          dispatch( onUpdateEvent({ ...CalendarEvent }));
      } else {
          // Creando
          dispatch( onAddNewEvent({ ...CalendarEvent, _id: new Date().getTime() }));
      }
    }

    const startDeletingEvent = () => {
      // TODO: Llegar al backend

      dispatch( onDeleteEvent() );
    }

  return {
    //* Propiedades
    activeEvent,
    events,
    hastEventSelected: !!activeEvent?._id,

    //* Métodos
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
  }
}
