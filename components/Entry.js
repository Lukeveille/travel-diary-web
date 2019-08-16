import EditField from './EditField';
import GeoMap from './GeoMap';
import EditSwitch from './EditSwitch';
import{ useState, useEffect } from 'react';

export default props => {
  const [currentEntry, setCurrentEntry] = useState(props.entry),
  [editing, setEditing] = useState(false),
  createEditField = attribute => {
    return <EditField
      on={editing}
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
      {editing? <p>{createEditField('link')}</p> :
      <a href={props.entry.link} target="_blank">{props.entry.link}</a>}
      <EditSwitch
        edit={setCurrentEntry}
        editing={editing}
        setEditing={setEditing}
        setModalContent={props.setModalContent}
        setModal={props.setModal}
        setModalClose={props.setModalClose}
        data={currentEntry}
        warning="This will also delete all media!"
        type="Entry"
        link={`${currentEntry.dataSource}/${currentEntry.dataKey}`}
      />
    </div>
  );
};
