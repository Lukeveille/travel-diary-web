const TripForm = props => {
  return (
    <form className="modal-form" onSubmit={props.submitNewTrip}>
      <h2>Create a New Trip</h2>
      <input
        autoFocus
        type="text"
        className="form-control"
        value={props.newTrip.title}
        onChange={event => {
          props.setNewTrip({...props.newTrip, title: event.target.value})
        }}
        placeholder="Name"
      />
      <input
        type="date"
        className="form-control"
        value={props.newTrip.startTime}
        onChange={event => {
          props.setNewTrip({...props.newTrip, startTime: event.target.value})
        }}
      />
      <input
        type="date"
        className="form-control"
        value={props.newTrip.endTime}
        onChange={event => {
          props.setNewTrip({...props.newTrip, endTime: event.target.value})
        }}
      />
      <button type="submit" className="form-control">
        Create Trip
      </button>
    </form>  
  )
}

export default TripForm;