import Head from 'next/head';

const Main = props => {
  return (
    <div>
      <Head>
        <link rel='stylesheet' href='/static/glyphicons/css/bootstrap.min.css' />
        <link rel='stylesheet' href='/static/main.css' />
      </Head>
      {props.children}
    </div>
  );
};

export default Main;