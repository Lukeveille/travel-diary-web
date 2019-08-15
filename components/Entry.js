import EditField from './EditField';
import GeoMap from './GeoMap';

export default props => {
  return (
    <div>
      <h1><EditField on={props.editing} attribute="title" state={props.entry} editState={props.setEntry} /></h1>
      <h3><EditField on={props.editing} attribute="entryTime" state={props.entry} editState={props.setEntry} /></h3>
      <p><EditField on={props.editing} attribute="message" state={props.entry} editState={props.setEntry} /></p>
      <GeoMap geotag={props.entry.geotag} state={props.entry} setState={props.setEntry} />
      <p><EditField on={props.editing} attribute="locationName" state={props.entry} editState={props.setEntry} /></p>
      {props.editing? <p><EditField on={props.editing} attribute="link" state={props.entry} editState={props.setEntry} /></p> :
      <a href={props.entry.link} target="_blank">{props.entry.link}</a>}
    </div>
  )
}