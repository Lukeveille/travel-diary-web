const TripForm = props => {

  const convertUTC = string => {
    string = string.split('-');
    return Date.UTC(string[0], string[1]-1, string[2]);
  }

  return (
    <div className="modal-form">
      <h2>Create a New Trip</h2>
      <form>
        <input
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
          value={props.newTrip.start}
          onChange={event => {
            props.setNewTrip({...props.newTrip, start: event.target.value})
          }}
        />
        <input
          type="date"
          className="form-control"
          value={props.newTrip.end}
          onChange={event => {
            props.setNewTrip({...props.newTrip, end: event.target.value})
          }}
        />
        <button className="form-control" onClick={() => {
          props.newTrip.start = convertUTC(props.newTrip.start);
          props.newTrip.end = convertUTC(props.newTrip.end);
        }}>
          Create Trip
        </button>
      </form>  
    </div>
  )
}

export default TripForm;