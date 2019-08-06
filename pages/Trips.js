import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default () => (
  <div>
    <h1>My Diary</h1>
    <a href='' onClick={() => {
      cookies.set('token', null)
      console.log(cookies.get('token'))
    }}>Logout</a>
  </div>
)