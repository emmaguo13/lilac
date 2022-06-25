import React from 'react';
import Layout from '../components/Layout';
import { Link } from '@reach/router';

import { ReactComponent as SplashGraphic } from '../svg/splash.svg';

export default function Home() {
  return (
    <Layout isWide className="home">
      <div className="jumbotron">
        <SplashGraphic />
        <aside>
          <h1>Ensuring transparency in land ownership</h1>
          <Link to="/register" className="button button--secondary">Register →</Link>
        </aside>
      </div>
    </Layout>
  );
}
