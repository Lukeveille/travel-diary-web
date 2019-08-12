import { useState, useEffect } from 'react';
import UserDeleteForm from './UserDeleteForm';
import UserEditForm from './UserEditForm';

export default props => {
  const [form, setForm] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState('password');
  const [newPassword, setNewPassword] = useState('');
  
  useEffect(() =>{
    setForm('');
    props.setCloseLock(true);
  }, [props.closed])
  useEffect(() =>{
    setError('');
    setEmail('');
    setPassword('');
    setNewPassword('');
    setShowPass('password')
    props.setCloseLock(false);
  }, [form])

  return (
    <div>
      {
        form == 'delete'? <UserDeleteForm
          user={props.user}
          setError={setError}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
          setForm={setForm}
          /> :
          form === 'edit'? <UserEditForm
          user={props.user}
          setError={setError}
          password={password}
          setPassword={setPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          setForm={setForm}
          showPass={showPass}
          setShowPass={setShowPass}
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
      <p style={{color: error.ok? '#090' : '#d00'}}>{error.msg}</p>
    </div>
  );
};
