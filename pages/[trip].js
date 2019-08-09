import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Header from '../components/Header';

const Trip = () => {
  const router = useRouter();

  return (
    <Layout>
      <Header />
      <h1>{router.query.trip}</h1>
      <h3>Begins</h3>
    </Layout>
  )
}

export default Trip;