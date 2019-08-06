import Layout from '../components/main';
import Header from '../components/header';
import { Cookies } from "react-cookie";
const cookies = new Cookies();

const Trips = props => {
  return <Layout>
    <Header user={props.data.user}/>
    <h1>My Diary</h1>
    <ul>
      {props.data.trips.map(trip => {
        console.log(trip)
        return <li>hello</li>
      })}
      <li
        className="new-trip"
      >
        <i className="glyphicon glyphicon-plus"></i>
        <p>New trip</p>
      </li>
    </ul>
    <style jsx>{`
      .glyphicon {
        font-size: 5em;
      }
      ul {
        padding: 0;
      }
      li {
        border: 1px solid #666;
        border-radius: 15px;
        display: inline-block;
        cursor: pointer;
      }
      .new-trip {
        padding: 2em 2em 0 2.5em;
      }
    `}</style>
  </Layout>
}

export default Trips;