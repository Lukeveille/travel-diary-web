import LoginSignup from './LoginSignup';
import Trips from './Trips';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import { handleAuthSSR } from '../utils/auth';

const Index = props => {
  return props.user? <Trips user={props.user} trips={props.trips} /> : <LoginSignup />;
};

Index.getInitialProps = async function (ctx) {
  const [headers, server] = handleAuthSSR(ctx);
  try {
    const res = await fetch(server + 'trips', headers);
    return await res.json();
  } catch (err) {
    console.log(err)
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/'
      });
      ctx.res.end();
    } else {
      Router.push('/');
    };
  };
};

export default Index;