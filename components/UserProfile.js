export default props => (
  <div>
    <h2>{props.user}</h2>
    <h4>
      <a style={{cursor: 'pointer'}}>Change Password</a>
    </h4>
    <a style={{cursor: 'pointer'}}>Delete User</a>
  </div>
);