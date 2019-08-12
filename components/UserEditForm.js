export default props => (
  <form onSubmit={event => {
    event.preventDefault();
    props.sendUser('PATCH', {
      email: props.user,
      password: props.password,
      newPassword: props.newPassword
    }).then(res => {
      if (res.error) {
        props.setError({ msg: res.error });
      } else {
        props.setForm('');
        props.setError({ msg: 'Password updated!', ok: true });
      }
    })
  }}>
    <h2>Please confirm old password</h2>
    <input 
      value={props.password} 
      onChange={event => props.setPassword(event.target.value)} 
      className="form-control" 
      type="password" 
      placeholder="old password"
    />

    <div className="relative">
          
      <input
        value={props.newPassword}
        type={props.showPass}
        onChange={event => props.setNewPassword(event.target.value)}
        className="form-control"
        placeholder="new password"
      />
      <i
      className={"glyphicon form-control-feedback glyphicon-eye-" + (props.showPass === 'password'? 'open' : 'close')}
      onClick={() => {
        props.setShowPass(props.showPass === 'password'? 'text' : 'password');
      }}></i>

    </div>

    <button className="form-control" type="submit">Update Password</button>
    <button className="form-control" type="button" onClick={event => {
      event.preventDefault();
      props.setForm('');
    }}>Cancel</button>
  </form>
)