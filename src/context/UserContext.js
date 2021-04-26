import React, { useState, createContext,useContext } from "react";



const UserContext = createContext([{}, () => {}]);


const UserProvider = (props) => {
    const [state, setState] = useState({
        email: "",
        password:"",
        uid: "",
        isLoggedIn: null

    });
    return <UserContext.Provider value ={[state, setState]}>{props.children}</UserContext.Provider>;
};

export { UserContext, UserProvider};
