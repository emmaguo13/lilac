import React, { useState, useEffect } from 'react';
import Login from './Login.js';
import ApproveRequests from './notary/ApproveRequests.js'
import Form from './Form.js'

function LoginController(props) {
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
			<> {
				authState ? (
					
						isNotary ? (
							<ApproveRequests />
						) : (
							<Form />
						)
					
					
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