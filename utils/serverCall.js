import { handleAuthSSR } from '../utils/auth';
import fetch from 'isomorphic-unfetch';

export default async function(method, data, location) {
  const [headers, server] = handleAuthSSR(),
  req = {...headers, body: JSON.stringify(data), mode: 'cors', method };
  req.headers['Content-Type'] = 'application/json';

  const res = await fetch(`${server}${location? location : ''}`, req);
  return await res.json();
};
