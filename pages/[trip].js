import { handleAuthSSR } from '../utils/auth';
import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Layout from '../components/Layout';
import Header from '../components/Header';
import EditField from '../components/EditField';

const Trip = props => {
  const [currentTrip, editTrip] = useState(props.tripData)

  return (
    <Layout error={currentTrip.error}>
      <Header user={currentTrip.dataSource} />
      <Link href="/">
        <a>&lt;- Trips</a>
      </Link>
      <h1><EditField attribute="title" state={currentTrip} editState={editTrip} /></h1>
      <h3>Begins <EditField attribute="startTime" state={currentTrip} editState={editTrip} /></h3>
      <h3>Ends <EditField attribute="endTime" state={currentTrip} editState={editTrip} /></h3>
      <a style={{cursor: 'pointer'}}>Delete Trip</a>
    </Layout>
  )
}

Trip.getInitialProps = async function (ctx) {
  const { trip } = ctx.query;
  const [headers, server] = handleAuthSSR(ctx);
  const tripRes = await fetch(server + trip, headers),
  res = await fetch(server + trip + '/entries', headers),
  tripData = await tripRes.json(),
  entries = await res.json();

  return { tripData, entries };
};

export default Trip;