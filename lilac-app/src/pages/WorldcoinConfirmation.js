import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

import { ReactComponent as SplashGraphic } from '../svg/splash.svg';

export default function WorldcoinConfirmation({ params }) {
    console.log('params');
    console.log(params);
    let address = params.substring(0, 42);

    useEffect(() => {
        console.log('using effect');
        const verify = async () => {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}api/user/saveUserData`, {
                address,
                verified: true,
            });
            navigate(`/account/${address}`);
        };

        verify();
    }, [address]);

    return (
        <Layout isWide className="home">
            <div className="jumbotron">
                <SplashGraphic />
                <aside>
                    <h1>Confirming Worldcoin Verification...</h1>
                    <br />
                </aside>
            </div>
        </Layout>
    );
}
