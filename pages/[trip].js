import { handleAuthSSR } from '../utils/auth';
import { useState, useEffect } from 'react';
import serverCall from '../utils/serverCall';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Layout from '../components/Layout';
import EntryForm from '../components/EntryForm';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Entry from '../components/Entry';
import EditField from '../components/EditField';
import dateString from '../utils/dateString';
import EditSwitch from '../components/EditSwitch';
import convertUTC from '../utils/convertUTC';

const Trip = props => {
  const [currentTrip, editTrip] = useState(props.tripData),
  [entries, setEntries] = useState(props.entries? props.entries : []),
  [setEntry, setEntrySwitch] = useState(true),
  [currentIndex, setCurrentIndex] = useState(-1),
  [editing, setEditing] = useState(false),
  [editEntry, setEditEntry] = useState(false),
  [modal, setModal] = useState('none'),
  [modalClose, setModalClose] = useState(true),
  [modalContent, setModalContent] = useState(''),
  blankEntry = {
    title: '',
    entryTime: {date: '', time: ''},
    geotag: { lat: '', long: '' },
    link: '',
    locationName: '',
    message: '',
  },
  [newEntry, setNewEntry] = useState(blankEntry),
  entryDisplay = index => <Entry
    entries={entries}
    index={index}
    setCurrentIndex={setCurrentIndex}
    setModalContent={setModalContent}
    setModal={setModal}
    modal={modal}
    setModalClose={setModalClose}
    blankEntry={blankEntry}
    editing={editEntry}
    setEditing={setEditEntry}
  />,
  submitNewEntry = event => {
    event.preventDefault();
    console.log();
    serverCall('POST', {...newEntry, entryTime: convertUTC(newEntry.entryTime.date, newEntry.entryTime.time) }, currentTrip.dataKey)
    .then(res => {
      window.location.reload();
    })
  }

  useEffect(() => {
    setModalContent(<EntryForm
      newEntry={newEntry}
      setNewEntry={setNewEntry}
      submitNewEntry={submitNewEntry}
    />);
  }, [newEntry]);

  useEffect(() => {
    setModalContent(entryDisplay(currentIndex));
  }, [setEntry, currentIndex]);
  
  useEffect(() => {
    setModalClose(true)
  }, [modal]);

  return (
    <Layout error={currentTrip.error}>
      <Header user={currentTrip.dataSource} />
      <Link href="/">
        <a>&lt;- Trips</a>
      </Link>
      <h1><EditField on={editing} attribute="title" state={currentTrip} editState={editTrip} blank="Untitled" /></h1>
      <h3>Begins <EditField on={editing} attribute="startTime" state={currentTrip} editState={editTrip} /></h3>
      {entries.length > 0? <table>
        <thead>
          <tr>
            <th className="entry-date">Date</th>
            <th className="entry-title">Title</th>
            <th className="entry-message">Message</th>
            <th className="entry-media">Link</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            return (
              <tr
                key={entry.dataKey}
                className={'entry'}
                onClick={() => {
                  if (!editing) {
                    setCurrentIndex(i);
                    setEntrySwitch(!setEntry);
                    // setModalClose(true);
                  }
                }}
              >
                <td>{dateString(entry.entryTime)[0]}</td>
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
      <EditSwitch
        edit={editTrip}
        editing={editing}
        setEditing={setEditing}
        setModalContent={setModalContent}
        setModal={setModal}
        setModalClose={setModalClose}
        data={currentTrip}
        warning="This will also delete all entries and media!"
        type="Trip"
        link={currentTrip.dataKey}
        home=''
      />
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
  entries.error? '' : entries.map(entry => {
    for (let prop in entry) {
      if (Object.prototype.hasOwnProperty.call(entry, prop)) {
        entry[prop] = entry[prop] === null? '' :
        prop === 'geotag'? {
          lat: entry[prop].lat === null? '' : entry[prop].lat,
          long: entry[prop].long === null? '' : entry[prop].long
        } :
        entry[prop];
        
      };
    };
  });
  return {
    tripData: tripData.title? tripData : {...tripData, title: ''}, entries
  };
};

export default Trip;