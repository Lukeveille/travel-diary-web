import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Cookies } from 'react-cookie';
import { useState } from 'react';

const serverUrl = 'http://localhost:3443/api/v1/';

const cookies = new Cookies();

const Index = props => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // console.log(props)
  return (
    <div>
      <input type="email" onChange={event => setEmail(event.target.value)} value={email} placeholder="email" />
      <input type="password" onChange={event => setPassword(event.target.value)} value={password} placeholder="password" />
      <button onClick={() => {
        login(email, password).then(res => setToken(res.token)).catch(err => console.error(err))
      }}>
        login
      </button>
      <p>Token: {token}</p>
    </div>
  );
}

const login = async function (email, password) {
  const res = await fetch(serverUrl + 'login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  const data = await res.json();

  // console.log(data)
  return data;
}


export default Index;