import EditField from './EditField';
import GeoMap from './GeoMap';
import{ useState, useEffect } from 'react';

export default props => {
  const [currentEntry, setCurrentEntry] = useState(props.entry);
  const createEditField = attribute => {
    return <EditField
      on={props.editing}
      attribute={attribute}
      state={currentEntry}
      editState={setCurrentEntry}
    />
  };
  useEffect(() => {
    setCurrentEntry(props.entry);
    props.setModal(true);
  }, [props]);

  return (
    <div>
      <h1>{createEditField('title')}</h1>
      <h3>{createEditField('entryTime')}</h3>
      <p>{createEditField('message')}</p>
      <GeoMap geotag={props.entry.geotag} state={props.entry} setState={props.setEntry} />
      <p>{createEditField('locationName')}</p>
      {props.editing? <p>{createEditField('link')}</p> :
      <a href={props.entry.link} target="_blank">{props.entry.link}</a>}
    </div>
  );
};
