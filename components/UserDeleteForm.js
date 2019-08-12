import Router from 'next/router';
import serverCall from '../utils/serverCall';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

export default props => (
  <form onSubmit={event => {
    event.preventDefault();
    if (props.user === props.email) {
      serverCall('DELETE', { email: props.email, password: props.password }, `delete/${props.email}`)
      .then(res => {
        if (res.error) {
          props.setError({ msg: res.error });
        } else {
          cookies.set('token', null);
          Router.push('/');
        }
      });
    } else {
      props.setError({ msg: 'Invalid email' });
    };
  }}>
    <h2>ARE YOU SURE?</h2>
    <h3>Deleting your account will permenantly erase all entries and media!</h3>
    <p>Enter email and password to confirm</p>
  <input value={props.email} onChange={event => props.setEmail(event.target.value)} className="form-control" type="text" placeholder="email"/>
  <input value={props.password} onChange={event => props.setPassword(event.target.value)} className="form-control" type="password" placeholder="password"/>
  <button className="form-control" onClick={event => {
    event.preventDefault();
    props.setForm('');
    props.setEmail('');
    props.setPassword('');
  }}>CANCEL</button>
  <button className="form-control" type="submit">Delete User</button>
</form>
);
