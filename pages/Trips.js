import Layout from '../components/Layout';
import Header from '../components/Header';
import Modal from '../components/Modal';
import TripForm from '../components/TripForm';
import { useState } from 'react';

const stuff = (<h1>I'm a modal!</h1>);

const Trips = props => {
  const [tripModal, setTripModal] = useState('none')
  const [newTrip, setNewTrip] = useState({title: '', start: '', end: ''})

  return <Layout>
    <Header user={props.data.user} />
    <h1>Trips</h1>
    <ul>
      {props.data.trips.map(trip => {
        console.log(trip)
        return <li>hello</li>
      })}
      <li
        className="new-trip"
        onClick={() => {
          setTripModal('block')
        }}
      >
        <i className="glyphicon glyphicon-plus"></i>
        <p>New Trip</p>
      </li>
    </ul>
    <style jsx>{`
      .glyphicon {
        font-size: 5em;
        transition: .25s;
        color: #444;
      }
      li:hover .glyphicon {
        color: #ddd;
      }
      li:hover {
        border-color: #444;
      }
      ul {
        padding: 0;
      }
      li {
        border: 1px solid #ddd;
        border-radius: 15px;
        display: inline-block;
        cursor: pointer;
        transition: .25s;
      }
      .new-trip {
        padding: 2em 2em 0 2.5em;
      }
    `}</style>
    <Modal show={tripModal} setShow={setTripModal} children={<TripForm newTrip={newTrip} setNewTrip={setNewTrip} />} />
  </Layout>
}

export default Trips;