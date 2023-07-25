import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();
    const { isDateModalOpen } = useUiStore();
    
      const handleDelete  = () => {
          startDeletingEvent();
      }

  return (
      <button 
          className="btn btn-danger fab-danger"
          aria-label="btn-delete"
          onClick={ handleDelete  }
          style={{
            display: hasEventSelected && !isDateModalOpen ? '' : 'none'
          }}
      >
          <i className="fa fa-trash-alt"></i>
      </button>
  )
}
