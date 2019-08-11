import Link from 'next/link';
import Modal from '../components/Modal';
import UserProfile from '../components/UserProfile';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const Header = props => {
  const [userModal, setUserModal] = useState('none');
  const [closeLock, setCloseLock] = useState(true);

  return (
    <header>
      <Link href='/'>
        <a onClick={() => cookies.set('token', null)}>Logout</a>
      </Link>
      <a onClick={() => {
        setUserModal(true)
      }}>{props.user}</a>
      <Modal
        setCloseLock={setCloseLock}
        closer={closeLock}
        show={userModal}
        setShow={setUserModal}
        children={<UserProfile setCloseLock={setCloseLock} user={props.user} closed={userModal}/>}
      />
    </header>
  );
};

export default Header;
