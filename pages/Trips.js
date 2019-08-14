import Link from 'next/link';
import Router from 'next/router';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Modal from '../components/Modal';
import TripForm from '../components/TripForm';
import fetch from 'isomorphic-unfetch';
import serverCall from '../utils/serverCall';
import { useState, useEffect } from 'react';
import { handleAuthSSR } from '../utils/auth';
import dateString from '../utils/dateString';
import convertUTC from '../utils/convertUTC';

const Trips = props => {
  const [tripModal, setTripModal] = useState('none'),
  [newTrip, setNewTrip] = useState({title: '', startTime: '', endTime: ''}),
  submitNewTrip = () => {
    newTrip.startTime = convertUTC(newTrip.startTime);
    newTrip.endTime = convertUTC(newTrip.endTime);
    serverCall('POST', newTrip, 'new-trip')
    .then(res => Router.push(`/${res.message.split(' ')[0]}`))
    .catch(() => {
      serverCall('POST', newTrip, 'new-trip')
      .then(res => Router.push(`/${res.message.split(' ')[0]}`))
      .catch(err => alert(err))
    });
  };

  useEffect(() => {
    console.log(newTrip)
  }, [newTrip])

  return <Layout>
    <Header user={props.user} />
    <h1>Trips</h1>
    <div className="trip-list">
      {props.trips.map(trip => {
        const style = {fontStyle: trip.title? 'normal' : 'italic'}
        return <Link href="/[Trip]" as={`${trip.dataKey}`} key={trip.dataKey}>
          <a
            className="trip-box"
          >
            <p style={style}>{trip.title? trip.title : 'Untitled'}</p>
            <p>{dateString(trip.startTime)[0]}</p>
            <p>{dateString(trip.endTime)[0]}</p>
          </a>
        </Link>
      })}
      <div
        className="trip-box new-trip"
        onClick={() => {
          setTripModal('block');
        }}
      >
        <i className="glyphicon glyphicon-plus"></i>
        <p>New Trip</p>
      </div>
    </div>
    <style jsx>{`
      .trip-box {
        border: 1px solid #ddd;
        border-radius: 15px;
        display: inline-block;
        cursor: pointer;
        margin: 1em;
        transition: .25s;
      }
      .trip-box:hover {
        border-color: #444
      }
      .glyphicon {
        font-size: 5em;
        color: #ddd;
      }
      .trip-box:hover .glyphicon {
        color: #444;
      }
      a {
        text-decoration: none;
      }
      .trip-box {
        display: inline-block;
        height: 152px;
        width: 135px;
        margin: 1em auto;
      }
      .trip-list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-row-gap: 1em
        grid-column-gap: 1em
      }
      .new-trip {
        padding: 2em 2em 0 2.5em;
        bottom: -102px;
      }
    `}</style>
    <Modal show={tripModal} setShow={setTripModal} children={
      <TripForm
        newTrip={newTrip}
        setNewTrip={setNewTrip}
        submitNewTrip={submitNewTrip}
        dateString={dateString}
      />
    } />
  </Layout>
};

const createTrip = async function (trip) {
  const [headers, server] = handleAuthSSR();
  const req = {...headers, body: JSON.stringify(trip), mode: 'cors', method: 'POST'};
  req.headers['Content-Type'] = 'application/json';
  
  const res = await fetch(server + 'new-trip', req);
  return await res.json();
};

export default Trips;