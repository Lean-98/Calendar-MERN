import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {

    const { startDeletingEvent, hastEventSelected } = useCalendarStore();
    const { isDateModalOpen } = useUiStore();
    
      const hangleDelete = () => {
          startDeletingEvent();
      }

  return (
      <button 
          className="btn btn-danger fab-danger"
          onClick={ hangleDelete }
          style={{
            display: hastEventSelected && !isDateModalOpen ? '' : 'none'
          }}
      >
          <i className="fa fa-trash-alt"></i>
      </button>
  )
}
