import Head from 'next/head';
import Link from 'next/link';

const Main = props => {
  return (
    <div>
      <Head>
        <link rel='stylesheet' href='/static/glyphicons/css/bootstrap.min.css' />
        <link rel="shortcut icon" type="image/x-icon" href="../static/favicon.ico" />
        <link rel='stylesheet' href='/static/main.css' />
        <title>Travel Diary</title>
      </Head>
      {props.error? 
        <h1>
          {props.error}
          <br />
          <Link href='/'>
            <a>Home</a>
          </Link>
        </h1> : 
        props.children
      }
    </div>
  );
};

export default Main;
