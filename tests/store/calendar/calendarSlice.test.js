import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from '../../__fixtures/calendarStates';

describe('Pruebas en calendarSlice', () => { 

    test('debe de regresar el estado por defecto', () => { 
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState);
     });

     test('onSetActiveEvent debe de activar el evento', () => { 
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent(events[0]));
        expect( state.activeEvent ).toEqual( events[0] );
     });

      test('onAddNewEvent debe de agregar el evento', () => { 

            const newEvent = {
                id: '3',
                start: new Date('2023-12-23 00:00:00'),
                end: new Date('2023-12-23 24:59:59'),
                title: 'Cumpleaños Felipe',
                notes: 'Alguna Nota de Felipe'
            };

            const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ));
            expect( state.events ).toEqual([...events, newEvent ]);

       });
       
      test('onUpdateEvent debe de actualizar el evento', () => { 

            const updatedEvent = {
                id: '1',
                start: new Date('2023-07-23 00:00:00'),
                end: new Date('2023-07-23 24:59:59'),
                title: 'Cumpleaños Rocio actualizado!',
                notes: 'Alguna Nota actualizada!'
            };

            const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ));
            expect( state.events ).toContain( updatedEvent );

       });

       test('onDeleteEvent debe de borrar el evento activo', () => {
            const state = calendarSlice.reducer( calendarWithActiveEventsState, onDeleteEvent());
            expect( state.activeEvent ).toBe( null );
            expect( state.events ).not.toContain( events[0] );
        });

       test('onLoadEvents debe de establecer los eventos', () => { 
            const state = calendarSlice.reducer( initialState, onLoadEvents( events ));
            expect( state.isLoadingEvent ).toBeFalsy();
            expect(state.events).toEqual( events );

            const newState = calendarSlice.reducer( state, onLoadEvents( events ));
            expect( state.events.length ).toBe( events.length );
        });

       test('onLogoutCalendar debe de limpiar el estado', () => { 
          const state = calendarSlice.reducer( calendarWithActiveEventsState, onLogoutCalendar());
          expect( state ).toEqual( initialState );
       });
 });