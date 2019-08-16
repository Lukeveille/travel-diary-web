export default props => {
  return (
    <div className="geo-map">
      <h2>GEO-MAP</h2>
      {props.geotag?
        <div>
          <p>{props.geotag.lat}</p>
          <p>{props.geotag.long}</p>
        </div> : ''
      }
      <button onClick={event => {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position)
          console.log(props)
          props.setState({
            ...props.state,
            geotag: {
              lat: position.coords.latitude,
              long: position.coords.longitude
            }
          });
        });
      }}>Get Location</button>
    </div>
  )
}