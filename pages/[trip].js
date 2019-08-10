import { handleAuthSSR } from '../utils/auth';
import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Router from 'next/router';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Modal from '../components/Modal';
import EditField from '../components/EditField';

const Trip = props => {
  const [currentTrip, editTrip] = useState(props.tripData),
  [editing, setEditing] = useState(false),
  [deleteModal, setDeleteModal] = useState('none'),
  [temp, setTemp] = useState(props.tripData),
  deleteMessage = <div>
    <h4>Are you sure you want to delete
      <span style={{fontStyle: currentTrip.title? 'normal' : 'italic'}}> "{currentTrip.title? currentTrip.title : 'Untitled'}"?</span>
    </h4>
    <button className="form-control" onClick={() => {
      deleteTrip(currentTrip).then(() => {
        Router.push('/');
      });
    }}>DELETE</button><button className="form-control" onClick={() => {
      setDeleteModal('none')
    }}>Cancel</button>
  </div>

  return (
    <Layout error={currentTrip.error}>
      <Header user={currentTrip.dataSource} />
      <Link href="/">
        <a>&lt;- Trips</a>
      </Link>
      <h1><EditField on={editing} attribute="title" state={currentTrip} editState={editTrip} /></h1>
      <h3>Begins <EditField on={editing} attribute="startTime" state={currentTrip} editState={editTrip} /></h3>
      <h3>Ends <EditField on={editing} attribute="endTime" state={currentTrip} editState={editTrip} /></h3>
      <h3>
        {editing?
        <span>
          <a style={{cursor: 'pointer'}} onClick={() => {
            setEditing(!editing);
            saveEdit(currentTrip.title? currentTrip : {...currentTrip, title: null});
            setTemp(currentTrip);
          }}>Save</a>&nbsp;-&nbsp;
          <a style={{cursor: 'pointer'}} onClick={() => {
            setEditing(!editing);
            editTrip(temp);
          }}>Discard</a>
        </span> :
        <a style={{cursor: 'pointer'}} onClick={() => { setEditing(!editing) }}>Edit</a>}
      </h3>
      {editing? <a style={{cursor: 'pointer'}} onClick={() => {
        setDeleteModal(true)
      }}>Delete Trip</a> : ''}
      <Modal closer={true} show={deleteModal} setShow={setDeleteModal} children={
        deleteMessage
      }/>
    </Layout>
  );
};

Trip.getInitialProps = async function(ctx) {
  const { Trip } = ctx.query,
  [headers, server] = handleAuthSSR(ctx),
  tripRes = await fetch(server + Trip, headers),
  res = await fetch(server + Trip + '/entries', headers),
  tripData = await tripRes.json(),
  entries = await res.json();
  return { tripData: tripData.title? tripData : {...tripData, title: ''}, entries };
};

const saveEdit = async function(trip) {
  const [headers, server] = handleAuthSSR(),
  req = {...headers, body: JSON.stringify(trip), mode: 'cors', method: 'PATCH'};
  req.headers['Content-Type'] = 'application/json';

  const res = await fetch(server + trip.dataKey, req);
  return await res.json();
}

const deleteTrip = async function(trip) {
  const [headers, server] = handleAuthSSR(),
  req = {...headers, mode: 'cors', method: 'DELETE'};
  req.headers['Content-Type'] = 'application/json';
  
  const res = await fetch(server + trip.dataKey, req);
  return await res.json();
}

export default Trip;