import Layout from '../components/main';
import fetch from 'isomorphic-unfetch';
import { Cookies } from 'react-cookie';
import { useState } from 'react';

const serverUrl = 'http://localhost:3443/api/v1/';

const cookies = new Cookies();

const Index = () => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('login')
  const [showPass, setShowPass] = useState('password')

  const loginSignup = (
    <Layout>
      <h1>Welcome to Trip Diary!</h1>
      <h2>{login === 'login'? "Please Login" : "Create an Account"}</h2>
      <form className='login-signup-form' onSubmit={e => {
        e.preventDefault();
        sendUserData(email, password, login)
        .then(res => {
          login === 'login'? setToken(res.token) :
          console.log(res)
          sendUserData(email, password, 'login')
          .then(res => {
            console.log(res)
            setToken(res.token)
          })
          .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
      }}>
        <input type="email" className="form-control" onChange={event => setEmail(event.target.value)} value={email} placeholder="email" />
        <div className="relative">
          <input type={showPass} id="password" className="form-control" onChange={event => setPassword(event.target.value)} value={password} placeholder="password" />
          {login === 'login'? '' : <i className={"glyphicon form-control-feedback glyphicon-eye-" + (showPass == 'password'? 'open' : 'close')} onClick={() => setShowPass(showPass === 'password'? 'text' : 'password')}></i>}
        </div>
        <button type="submit" className="form-control">
          {login === 'login'? "Login" : "Sign Up"}
        </button>
        <a href='' onClick={e => {
          e.preventDefault();
          setLogin(login === 'login'? 'signup' : 'login');
        }}>{login === 'login'? "Create Account" : "Login"}</a>
      </form>
      <p>Token: {token}</p>
      <style jsx>{`
        .glyphicon {
          cursor: pointer;
        }
      `}</style>
    </Layout>
  );

  return loginSignup;
}

const sendUserData = async function (email, password, action) {
  const res = await fetch(serverUrl + action, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  const data = await res.json();

  return data;
}


export default Index;