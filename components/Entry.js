import EditField from './EditField';
import GeoMap from './GeoMap';
import { useState } from 'react';

export default props => {
  const [currentEntry, setCurrentEntry] = useState(props.entry)
  return (
    <div>
      <h1><EditField on={props.editing} attribute="title" state={currentEntry} editState={setCurrentEntry} /></h1>
      <h3><EditField on={props.editing} attribute="entryTime" state={currentEntry} editState={setCurrentEntry} /></h3>
      <p><EditField on={props.editing} attribute="message" state={currentEntry} editState={setCurrentEntry} /></p>
      <GeoMap />
      <p><EditField on={props.editing} attribute="locationName" state={currentEntry} editState={setCurrentEntry} /></p>
      <p><EditField on={props.editing} attribute="link" state={currentEntry} editState={setCurrentEntry} /></p>
    </div>
  )
}