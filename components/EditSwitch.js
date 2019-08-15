import serverCall from '../utils/serverCall';
import Router from 'next/router';

export default props => {
  const deleteMessage = <div>
    <h4>Are you sure you want to delete
      <span style={{fontStyle: props.currentTrip.title? 'normal' : 'italic'}}> "{props.currentTrip.title? props.currentTrip.title : 'Untitled'}"?</span>
    </h4>
    <button className="form-control" onClick={() => {
      serverCall('DELETE', currentTrip, currentTrip.dataKey).then(() => {
        Router.push('/');
      });
    }}>DELETE</button><button className="form-control" onClick={() => {
      props.setModal('none')
    }}>Cancel</button>
  </div>
  return (
    <div>
      {props.editing?
      <div>
        <h3>
        <a onClick={() => {
          props.setEditing(!props.editing);
          serverCall('PATCH', props.currentTrip, props.currentTrip.dataKey)
          props.setTemp(props.currentTrip);
        }}>Save</a>&nbsp;-&nbsp;
        <a onClick={() => {
          props.setEditing(!props.editing);
          props.editTrip(props.temp);
        }}>Discard</a>
        </h3>
        <a onClick={() => {
          props.setModalContent(deleteMessage);
          props.setModal(true);
          props.setModalClose(true);
        }}>Delete Trip</a>
      </div> :
      <h3><a onClick={() => { props.setEditing(!props.editing) }}>Edit</a></h3>}
    </div>
  );
};
