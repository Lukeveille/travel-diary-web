import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const serverUrl = 'http://localhost:3443/api/v1/';

export async function handleAuthSSR(ctx) {
  let token = null;
  
  if (ctx.req) {
    token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  } else {
    token = cookies.get('token');
  }

  try {
    const headers = { headers: { Authorization: 'Bearer ' + token } };
    const res = await fetch(serverUrl + 'trips', headers);
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(err)
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/'
      })
      ctx.res.end()
    } else {
      Router.push('/')
    };
  };
};