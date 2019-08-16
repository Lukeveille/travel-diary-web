import EditField from './EditField';
import GeoMap from './GeoMap';
import EditSwitch from './EditSwitch';
import{ useState, useEffect } from 'react';

export default props => {
  const [currentEntry, setCurrentEntry] = useState(props.entries[props.index]),
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
    props.setModalClose(editing? false : true)
  }, [editing]);
  
  useEffect(() => {
    setCurrentEntry(props.entries[props.index]);
    setEditing(false);
    currentEntry? props.setModal(true) : setCurrentEntry(props.blankEntry);
  }, [props]);

  return !currentEntry? '' : (
    <div>
      <h1>{createEditField('title', 'Untitled')}</h1>
      <h3>{createEditField('entryTime')}</h3>
      <p>{createEditField('message', 'No message', { textarea: true })}</p>
      <GeoMap geotag={currentEntry.geotag} state={currentEntry} setState={setCurrentEntry} />
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
      <h3 className='scroll-btns'>
        {props.index? <span
          style={{cursor: 'pointer'}}
          onClick={() => {
            props.setCurrentIndex(props.index-1)
          }}
        >&lt;&lt;</span> : <span>&nbsp;</span>}
        {props.index !== props.entries.length-1? <span
          style={{cursor: 'pointer'}}
          onClick={() => {
            props.setCurrentIndex(props.index+1)
          }}
        >&gt;&gt;</span> : <span>&nbsp;</span>}
      </h3>
    </div>
  );
};
