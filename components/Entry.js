import EditField from './EditField';
import GeoMap from './GeoMap';
import EditSwitch from './EditSwitch';
import{ useState, useEffect } from 'react';

export default props => {
  const [currentEntry, setCurrentEntry] = useState(props.entry),
  [editing, setEditing] = useState(false),
  createEditField = (attribute, blank, options) => {
    return <EditField
      on={editing}
      attribute={attribute}
      state={currentEntry}
      editState={setCurrentEntry}
      blank={blank}
      options={options}
    />
  };

  useEffect(() => {
    setCurrentEntry(props.entry);
    props.setModal(true);
  }, [props]);

  return (
    <div>
      <h1>{createEditField('title', 'Untitled')}</h1>
      <h3>{createEditField('entryTime')}</h3>
      <p>{createEditField('message', 'No message', { textarea: true })}</p>
      <GeoMap geotag={props.entry.geotag} state={currentEntry} setState={setCurrentEntry} />
      <p>{createEditField('locationName', 'No name')}</p>
      <a
        href={currentEntry.link? `http://${currentEntry.link}` : ''}
        style={{cursor: 'pointer'}}
        target="_blank"
        onMouseEnter={event => {
          event.preventDefault();
        }}
        onClick={event => {
          editing || !currentEntry.link? event.preventDefault() : '';
        }}
      >{createEditField('link', 'No link', { link: currentEntry.link? true : false })}</a>
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
        home={currentEntry.dataSource}
      />
    </div>
  );
};
