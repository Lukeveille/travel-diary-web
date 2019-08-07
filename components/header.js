import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const Header = props => (
  <header>
    <a href='' onClick={() => cookies.set('token', null)}>Logout</a>
    {/* <h1>My Diary</h1> */}
    <p>{props.user}</p>
  </header>
)

export default Header;