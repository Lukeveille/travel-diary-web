import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const Header = props => (
  <header>
    <a href='' onClick={() => cookies.set('token', null)}>Logout</a>
    <p>User: {props.user}</p>
    {/* <style jsx>{`
      
    `}></style> */}
  </header>
)

export default Header;