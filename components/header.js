import Link from 'next/link';
import Modal from '../components/Modal';
import UserProfile from '../components/UserProfile';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const Header = props => {
  const [userModal, setUserModal] = useState('none');

  return (
    <header>
      <Link href='/'>
        <a onClick={() => cookies.set('token', null)}>Logout</a>
      </Link>
      <a style={{cursor: 'pointer'}} onClick={event => {
        setUserModal(true)
      }}>{props.user}</a>
      <Modal closer={true} show={userModal} setShow={setUserModal} children={<UserProfile user={props.user}/>}/>
    </header>
  );
};

export default Header;