import Link from 'next/link';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Modal from '../components/Modal';
import TripForm from '../components/TripForm';
import fetch from 'isomorphic-unfetch';
import { useState, useRef } from 'react';
import { handleAuthSSR } from '../utils/auth';

const Trips = props => {
  const inputRef = useRef(),
  [trips, setTrips] = useState(props.trips),
  [tripModal, setTripModal] = useState('none'),
  [newTrip, setNewTrip] = useState({title: '', startTime: '', endTime: ''}),
  convertUTC = string => {
    if (string) {
      string = string.split('-');
      console.log(string)
      return Date.UTC(string[0], string[1]-1, parseInt(string[2])+1);
    };
  },
  dateString = utc => {
    const utcObj = new Date(utc)
    utc = utcObj.toString().split(' ');
    return `${utc[1]} ${utc[2]} ${utc[3]}`;
  },
  submitNewTrip = () => {
    newTrip.startTime = convertUTC(newTrip.startTime);
    newTrip.endTime = convertUTC(newTrip.endTime);
    newTrip.title = newTrip.title? newTrip.title : null;
    createTrip(newTrip).then(() => window.location.reload());
  };

  return <Layout>
    <Header user={props.user} />
    <h1>Trips</h1>
    <div className="trip-list">
      {trips.map(trip => {
        return <Link href="/[trip]" as={`${trip.title}`}>
          <div
            className="trip-box"
            key={trip.dataKey}
          >
            <p>{trip.title}</p>
            <p>{dateString(trip.startTime)}</p>
            <p>{dateString(trip.endTime)}</p>
          </div>
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
        transition: .25s;
        margin: 1em;
      }
      .glyphicon {
        font-size: 5em;
        transition: .25s;
        color: #444;
      }
      .trip-box:hover .glyphicon {
        color: #ddd;
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
        createTrip={createTrip}
        submitNewTrip={submitNewTrip}
        inputRef={inputRef}
        dateString={dateString}
      />
    } />
  </Layout>
};

const createTrip = async function (newTrip) {
  const [headers, server] = handleAuthSSR();
  const req = {...headers, body: JSON.stringify(newTrip), mode: 'cors', method: 'POST'};
  req.headers['Content-Type'] = 'application/json';
  
  const res = await fetch(server + 'new-trip', req);
  const data = await res.json();
  return data;
};

export default Trips;