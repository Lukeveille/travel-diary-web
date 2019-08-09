import { useRouter } from 'next/router';
import { handleAuthSSR } from '../utils/auth';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import Header from '../components/Header';
import dateString from '../utils/dateString';

const Trip = props => {

  const router = useRouter();
  console.log(props)

  return (
    <Layout error={props.tripData.error}>
      <Header user={props.tripData.dataSource} />
      <h1>{props.tripData.title}</h1>
      <h3>Begins {dateString(props.tripData.startTime)}</h3>
      <h3>Ends {dateString(props.tripData.endTime)}</h3>
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