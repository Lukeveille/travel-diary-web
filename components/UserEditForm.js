export default props => (
  <form>
    <h2>Please confirm old password</h2>
    <input value={props.password} onChange={event => props.setPassword(event.target.value)} className="form-control" type="password" placeholder="old password"/>
    <input value={props.newPassword} onChange={event => props.setNewPassword(event.target.value)} className="form-control" type="password" placeholder="new password"/>
    <button className="form-control" type="submit">Update Password</button>
  </form>
)