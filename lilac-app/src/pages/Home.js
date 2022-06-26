import React from 'react';
import { Link } from '@reach/router';
import Layout from '../components/Layout';

import { ReactComponent as SplashGraphic } from '../svg/splash.svg';

export default function Home() {
    return (
        <Layout isWide className="home">
            <div className="jumbotron">
                <SplashGraphic />
                <aside>
                    <h1>Transform your governance with reputation</h1>
                    <h3>It's time to reward your most active members</h3>
                    <br />
                    <Link to="/login" className="button button--secondary">
                        Get Started →
                    </Link>
                </aside>
            </div>
        </Layout>
    );
}
