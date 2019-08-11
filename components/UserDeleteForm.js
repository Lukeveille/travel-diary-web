import Router from 'next/router';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

export default props => (
  <form onSubmit={event => {
    event.preventDefault();
    if (props.user === props.email) {
      props.sendUser('DELETE', { email: props.user, password: props.password }).then(res => {
        if (res.error) {
          props.setError(res.error);
        } else {
          cookies.set('token', null);
          Router.push('/');
        }
      });
    } else {
      props.setError('Invalid email')
    };
  }}>
    <h2>ARE YOU SURE?</h2>
    <h3>Deleting your account will permenantly erase all entries and media!</h3>
    <p>Enter email and password to confirm</p>
  <input value={props.email} onChange={event => props.setEmail(event.target.value)} className="form-control" type="text" placeholder="email"/>
  <input value={props.password} onChange={event => props.setPassword(event.target.value)} className="form-control" type="password" placeholder="password"/>
  <button className="form-control" type="submit">Delete User</button>
</form>
)