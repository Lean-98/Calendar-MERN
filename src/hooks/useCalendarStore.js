import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import calendarApi from '../api/calendarApi';
import { convertToDateEvents } from '../helpers';
import Swal from 'sweetalert2';
import { CalendarEvent } from '../calendar';


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( CalendarEvent ) => {
        dispatch( onSetActiveEvent( CalendarEvent ) )
    }

    const startSavingEvent = async( CalendarEvent ) => {

        try {
          if( CalendarEvent.id ) {
            // Updating 
            await calendarApi.put(`/events/${ CalendarEvent.id }`, CalendarEvent );
            dispatch( onUpdateEvent({ ...CalendarEvent, user }));
            return;
        } 
            // Creating
            const { data } = await calendarApi.post('/events', CalendarEvent );
            dispatch( onAddNewEvent({ ...CalendarEvent, id: data.evento.id, user }));       
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startDeletingEvent = async() => {
      
      try {
             // Deleting 
             await calendarApi.delete(`/events/${ activeEvent.id }`);
             dispatch( onDeleteEvent() );
             setTimeout(() => {
              Swal.fire(
                'Good job!',
                'Se elimino Correctamente el Evento!',
                'success'
              )
             }, 5);
            return;

      } catch (error) {
        console.log(error);
        Swal.fire('Error al eliminar el evento', error.response.data.msg, 'error');
      }
    }

    const startLoadingEvents = async() => {
      try {
        const { data } = await calendarApi.get('/events');
        const events = convertToDateEvents( data.events );
        dispatch( onLoadEvents( events ) );

      } catch (error) {
        console.log('Error Cargando Eventos!');
        console.log(error);
      }
    }


  return {
    //* Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //* Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}
