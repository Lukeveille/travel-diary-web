import serverCall from '../utils/serverCall';
import Router from 'next/router';
import { useState } from 'react';

export default props => {
  const [temp, setTemp] = useState(props.data),
  deleteMessage = <div>
    <p>Are you sure you want to delete
      <span style={{fontStyle: props.data.title? 'normal' : 'italic'}}> "{props.data.title? props.data.title : 'Untitled'}"?</span>
    </p>
    <h4>{props.warning}</h4>
    <button className="form-control" onClick={() => {
      props.setModal('none')
    }}>Cancel</button>
    <button className="form-control" onClick={() => {
      serverCall('DELETE', props.data, props.link).then(() => {
        Router.push(`/${props.home}`);
      });
    }}>Delete {props.type}</button>
  </div>
  return (
    <div>
      {props.editing?
      <div>
        <h3>
        <a onClick={() => {
          props.setEditing(!props.editing);
          serverCall('PATCH', props.data, props.link)
          setTemp(props.data);
        }}>Save</a>&nbsp;-&nbsp;
        <a onClick={() => {
          props.setEditing(!props.editing);
          props.edit(temp);
        }}>Discard</a>
        </h3>
        <a onClick={() => {
          props.setModalContent(deleteMessage);
          props.setModal(true);
          props.setModalClose(true);
        }}>Delete {props.type}</a>
      </div> :
      <p><a onClick={() => { props.setEditing(!props.editing) }}>Edit</a></p>}
    </div>
  );
};
