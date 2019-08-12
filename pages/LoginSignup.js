import Layout from '../components/Layout';
import serverCall from '../utils/serverCall';
import { useState } from 'react';
import { Cookies } from 'react-cookie';

export default () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('login')
  const [showPass, setShowPass] = useState('password')

  const cookies = new Cookies();

  return (
    <Layout>
      <h1>Welcome to Trip Diary!</h1>
      <h2>{login === 'login'? "Please Login" : "Create an Account"}</h2>
      <form className='login-signup-form' onSubmit={event => {
        event.preventDefault();
        serverCall('POST', { email, password }, login)
        .then(res => {
          if (res.error) {
            setError(res.error.message? 'Auth failed' : res.error)
          } else if (login === 'login') {
            cookies.set('token', res.token)
            window.location.reload();
          } else {
            serverCall('POST', { email, password }, 'login')
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
        
        <a href='' onClick={event => {
          event.preventDefault();
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
        .login-signup-form {
          max-width: 300px;
          margin: auto;
        }
      `}</style>
    </Layout>
  );
};
