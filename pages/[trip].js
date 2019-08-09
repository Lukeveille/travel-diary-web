import { handleAuthSSR } from '../utils/auth';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Layout from '../components/Layout';
import Header from '../components/Header';
import dateString from '../utils/dateString';
import convertUTC from '../utils/convertUTC';

const EditField = props => {
  const [edit, setEdit] = useState(false)
  const type = isNaN(props.state[props.attribute])? 'text' : 'date';

  return (
    <span>
      <input
        type={type} 
        onChange={event => {
          props.editState(
            {...props.state,
              [props.attribute]: type == 'text'? event.target.value : convertUTC(event.target.value)
            }
          )
        }}
        value={isNaN(props.state[props.attribute])? props.state[props.attribute] : dateString(props.state[props.attribute])[1]}
        style={{display: edit? 'inline' : 'none'}}
      />
      <span style={{display: edit? 'none' : 'inline'}}>{isNaN(props.state[props.attribute])? props.state[props.attribute] : dateString(props.state[props.attribute])[0]}</span>
      <i
      className={"glyphicon glyphicon-pencil"}
      onClick={event => {
        setEdit(!edit);
      }}
      ></i>
    </span>
  )
}

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