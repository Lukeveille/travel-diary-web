import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import { useState } from 'react';
import { Cookies } from 'react-cookie';

const serverUrl = 'http://localhost:3443/api/v1/';

const LoginSignup = () => {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('login')
  const [showPass, setShowPass] = useState('password')

  const cookies = new Cookies();

  return (
    <Layout>
      <h1>Welcome to Trip Diary!</h1>
      <h2>{login === 'login'? "Please Login" : "Create an Account"}</h2>
      <form className='login-signup-form' onSubmit={e => {
        e.preventDefault();
        sendUserData(email, password, login)
        .then(res => {
          if (res.error) {
            setError(res.error.message? 'Auth failed' : res.error)
          } else if (login === 'login') {
            cookies.set('token', res.token)
            window.location.reload();
          } else {
            sendUserData(email, password, 'login')
            .then(res => {
              cookies.set('token', res.token)
              window.location.reload();
            })
            .catch(err => console.error(err));
          };
        })
        .catch(err => console.error(err));
      }}>
        <input type="email" className="form-control" onChange={event => setEmail(event.target.value)} value={email} placeholder="email" />
        
        <div className="relative">
          
          <input
          type={showPass}
          id="password"
          className="form-control"
          onChange={event => setPassword(event.target.value)}
          value={password}
          placeholder="password" />
          
          {login === 'login'? '' : <i
          className={"glyphicon form-control-feedback glyphicon-eye-" + (showPass == 'password'? 'open' : 'close')}
          onClick={() => setShowPass(showPass === 'password'? 'text' : 'password')}></i>}

        </div>
        
        <button type="submit" className="form-control">
          {login === 'login'? "Login" : "Sign Up"}
        </button>
        
        <a href='' onClick={e => {
          e.preventDefault();
          setLogin(login === 'login'? 'signup' : 'login');
          setShowPass('password');
          setError('')
        }}>{login === 'login'? "Create Account" : "Login"}</a>
      </form>
      <p className="error-msg">{error}</p>

      <style jsx>{`
        h1 {
          margin-top: 5em;
        }
        .glyphicon {
          cursor: pointer;
          pointer-events: all;
        }
        .error-msg {
          color: #D00;
        }
        .relative {
          position: relative;
        }
        .login-signup-form {
          max-width: 300px;
          margin: auto;
        }
      `}</style>
    </Layout>
  );
};

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

export default LoginSignup;