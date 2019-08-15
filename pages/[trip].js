import { handleAuthSSR } from '../utils/auth';
import { useState, useEffect } from 'react';
import serverCall from '../utils/serverCall';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Router from 'next/router';
import Layout from '../components/Layout';
import EntryForm from '../components/EntryForm';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Entry from '../components/Entry';
import EditField from '../components/EditField';
import dateString from '../utils/dateString';

const Trip = props => {
  const [currentTrip, editTrip] = useState(props.tripData),
  [editing, setEditing] = useState(false),
  [modal, setModal] = useState('none'),
  [modalClose, setModalClose] = useState(true),
  [modalContent, setModalContent] = useState(''),
  [newEntry, setNewEntry] = useState({
    title: '',
    entryTime: {date: '', time: ''},
    geotag: { lat: '', long: '' },
    link: '',
    locationName: '',
    message: '',
  }),
  [temp, setTemp] = useState(props.tripData),
  submitNewEntry = event => {
    event.preventDefault();
    serverCall('POST', newEntry, currentTrip.dataKey)
    .then(res => {
      window.location.reload();
    })
  },
  deleteMessage = <div>
    <h4>Are you sure you want to delete
      <span style={{fontStyle: currentTrip.title? 'normal' : 'italic'}}> "{currentTrip.title? currentTrip.title : 'Untitled'}"?</span>
    </h4>
    <button className="form-control" onClick={() => {
      serverCall('DELETE', currentTrip, currentTrip.dataKey).then(() => {
        Router.push('/');
      });
    }}>DELETE</button><button className="form-control" onClick={() => {
      setModal('none')
    }}>Cancel</button>
  </div>

  useEffect(() => {
    setModalContent(<EntryForm
      newEntry={newEntry}
      setNewEntry={setNewEntry}
      submitNewEntry={submitNewEntry}
    />);
  }, [newEntry]);

  return (
    <Layout error={currentTrip.error} onKeyDown={event => console.log(event)}>
      <Header user={currentTrip.dataSource} />
      <Link href="/">
        <a>&lt;- Trips</a>
      </Link>
      <h1><EditField on={editing} attribute="title" state={currentTrip} editState={editTrip} /></h1>
      <h3>Begins <EditField on={editing} attribute="startTime" state={currentTrip} editState={editTrip} /></h3>
      {props.entries.length > 0? <table>
        <thead>
          <tr>
            <th className="entry-date">Date</th>
            <th className="entry-title">Title</th>
            <th className="entry-message">Message</th>
            <th className="entry-media">Link</th>
          </tr>
        </thead>
        <tbody>
          {props.entries.map(entry => {
            const [string, web] = dateString(entry.entryTime)
            return (
              <tr
                key={entry.dataKey}
                className={'entry'}
                onClick={() => {
                  setModalContent(<Entry entry={entry} editing={editing} />);
                  setModalClose(true);
                  setModal(true);
                }}
              >
                <td>{string}</td>
                <td>{entry.title}</td>
                <td>{entry.message}</td>
                <td>{entry.link}</td>
              </tr>
            )
          })}
        </tbody>
      </table> : ''}
      <div onClick={() => {
        setModalContent(<EntryForm
            newEntry={newEntry}
            setNewEntry={setNewEntry}
            submitNewEntry={submitNewEntry}
          />);
        setModalClose(false);
        editing? '' : setModal(true);
      }} className="new-entry">{editing? '' : '+ New Entry'}</div>
      <h3>Ends <EditField on={editing} attribute="endTime" state={currentTrip} editState={editTrip} /></h3>
      <h3>
        {editing?
        <span>
          <a onClick={() => {
            setEditing(!editing);
            serverCall('PATCH', currentTrip.title? currentTrip : {...currentTrip, title: null}, currentTrip.dataKey)
            setTemp(currentTrip);
          }}>Save</a>&nbsp;-&nbsp;
          <a onClick={() => {
            setEditing(!editing);
            editTrip(temp);
          }}>Discard</a>
        </span> :
        <a onClick={() => { setEditing(!editing) }}>Edit</a>}
      </h3>
      {editing? <a onClick={() => {
        setModalContent(deleteMessage);
        setModal(true);
        setModalClose(true);
      }}>Delete Trip</a> : ''}
      <Modal closer={modalClose} show={modal} setShow={setModal} children={modalContent}/>
      <style jsx>{`
        .new-entry {
          disply: inline;
          border: 1px solid #fff;
          border-radius: 10px;
          cursor: ${editing? 'default' : 'pointer'};
          padding: .3em;
          max-width: 100px;
          margin: auto;
          min-height: 2.2em;
        }
        .new-entry:hover {
          border: 1px solid ${editing? '#fff' : '#ddd'};
        }
      `}</style>
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

export default Trip;