import GeoMap from './GeoMap'

const TripForm = props => {
  return (
    <form className="modal-form entry-form" onSubmit={props.submitNewEntry}>
      <h2>Create a New Entry</h2>
      <div className="date-time">
        <input
          placeholder="Time"
          type="time"
          className="form-control"
          value={props.newEntry.entryTime.time}
          onChange={event => {
            props.setNewEntry({
              ...props.newEntry,
              entryTime: {
                ...props.newEntry.entryTime,
                time: event.target.value
              }
            })
          }}
        />
        <input
          placeholder="Date"
          type="date"
          className="form-control"
          value={props.newEntry.entryTime.date}
          onChange={event => {
            props.setNewEntry({
              ...props.newEntry,
              entryTime: {
                ...props.newEntry.entryTime,
                date: event.target.value
              }
            })
          }}
        />
      </div>
      <input
        placeholder="Title"
        type="text"
        className="form-control"
        value={props.newEntry.title}
        onChange={event => {
          props.setNewEntry({...props.newEntry, title: event.target.value})
        }}
      />
      <textarea
        placeholder="Message"
        className="form-control"
        value={props.newEntry.message}
        cols={50}
        rows={4}
        onChange={event => {
          props.setNewEntry({...props.newEntry, message: event.target.value})
        }}
      />
      <GeoMap
        geotag={props.newEntry.geotag}
        state={props.newEntry}
        setState={props.setNewEntry}
      />
      <input
        placeholder="Name"
        className="form-control"
        value={props.newEntry.locationName}
        onChange={event => {
          props.setNewEntry({...props.newEntry, locationName: event.target.value})
        }}
      />
      <input
        placeholder="Link"
        className="form-control"
        value={props.newEntry.link}
        onChange={event => {
          props.setNewEntry({...props.newEntry, link: event.target.value})
        }}
      />
      <button type="submit" className="form-control">
        Create Entry
      </button>
    </form>  
  )
}

export default TripForm;