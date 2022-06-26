import React from "react";

const UserContext = React.createContext({
  web3: '',
  setWeb3: () => {}
});

export default UserContext;
