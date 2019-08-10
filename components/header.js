import Link from 'next/link';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const Header = props => (
  <header>
    <Link href='/'>
      <a onClick={() => cookies.set('token', null)}>Logout</a>
    </Link>
    <p>{props.user}</p>
  </header>
)

export default Header;