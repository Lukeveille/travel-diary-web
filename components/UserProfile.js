import { useState, useEffect } from 'react';
import { handleAuthSSR } from '../utils/auth';
import fetch from 'isomorphic-unfetch';
import UserDeleteForm from './UserDeleteForm';
import UserEditForm from './UserEditForm';

const UserProfile = props => {
  const [form, setForm] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  useEffect(() =>{
    setForm('');
    props.setCloseLock(true);
  }, [props.closed])
  useEffect(() =>{
    setError('');
    props.setCloseLock(false);
  }, [form])

  return (
    <div>
      {
        form == 'delete'? <UserDeleteForm
          user={props.user}
          sendUser={sendUser}
          setError={setError}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
        /> :
        form === 'edit'? <UserEditForm
          user={props.user}
          sendUser={sendUser}
          setError={setError}
          password={password}
          setPassword={setPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
        /> :
        <div>
          <h2>{props.user}</h2>
          <h4>
            <a
              onClick={() => {
                setForm('edit')
              }}
            >Change Password</a>
          </h4>
          <a
            onClick={() => {
              setForm('delete')
            }}
          >Delete User</a>
        </div>
      }
      <p className="error-msg">{error}</p>
    </div>
  );
};

const sendUser = async function(method, user) {
  const [headers, server] = handleAuthSSR(),
  req = {...headers, body: JSON.stringify(user), mode: 'cors', method: method};
  req.headers['Content-Type'] = 'application/json';

  const res = await fetch(server + (method === 'DELETE'? 'delete/' + user.email : '')  , req);
  return await res.json();
}

export default UserProfile;