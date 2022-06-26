import React, { useState, useEffect, useContext } from 'react';
import Login from './Login.js';
import Account from './Account'
import UserContext from '../UserContext';

function LoginController(props) {
	const { web3 } = useContext(UserContext);

	const [authState, setAuthState] = useState(false);
	const [isNotary, setIsNotary] = useState(false);

	useEffect (()  => {
		setAuthState(false);
	}, [])
	
		
	function handleIsNotary(isNotary, role) {
		console.log("checking if it is regulator")
		if (role == "Official") {
			setIsNotary({role})
			console.log(authState)
		} 
	}

	function handleLoggedIn(auth) {
		console.log("handleLoggedIn")
		setAuthState({auth});
	};

	function handleLoggedOut() {
		setAuthState({ auth: undefined });
	};
   
		return (
			<> 
			{
				authState ? (
				// web3.instance == '' ? ( <- this makes it break
					
					// <meta http-equiv="Refresh" content="0; url='/account'" />					
					<Account />
				) : (
					
					<div className="Signin">
				<div className="App-signin">
					
					<Login onLoggedIn={handleLoggedIn}
					auth = {authState}
					onIsNotary = {handleIsNotary}
					isNotary = {isNotary} />
				</div>
			</div>
				)
			

				}
				</>
				)
}


export default LoginController;