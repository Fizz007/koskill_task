import React, { createContext, useState } from 'react'

export const userAuth = createContext();
const Auth = (props) => {
    const [isloggedin, setIsloggedin]= useState(false);
   
    const login = ()=> {
        setIsloggedin(true)
    }
    const logout = ()=> {
        setIsloggedin(false)
    }

  return (
    <userAuth.Provider value={{ login , logout, isloggedin}}>
    {props.children}
  </userAuth.Provider>
  )
}

export default Auth