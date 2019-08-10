import { handleAuthSSR } from '../utils/auth';
import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Layout from '../components/Layout';
import Header from '../components/Header';
import EditField from '../components/EditField';

const Trip = props => {
  const [currentTrip, editTrip] = useState(props.tripData),
  [editing, setEditing] = useState(false),
  [temp, setTemp] = useState(props.tripData);

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
      {editing? <a style={{cursor: 'pointer'}}>Delete Trip</a> : ''}
    </Layout>
  );
};

Trip.getInitialProps = async function(ctx) {
  const { trip } = ctx.query,
  [headers, server] = handleAuthSSR(ctx),
  tripRes = await fetch(server + trip, headers),
  res = await fetch(server + trip + '/entries', headers),
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

export default Trip;