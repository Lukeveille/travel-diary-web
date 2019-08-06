import LoginSignup from './LoginSignup';
import Trips from './Trips';
import { handleAuthSSR } from '../utils/auth';

const Index = props => {
  return props.error? <LoginSignup /> : <Trips data={props}/>;
}

Index.getInitialProps = async function (ctx) {
  return await handleAuthSSR(ctx)
}

export default Index;