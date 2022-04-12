import React from 'react'
import { SignedInStack, SignedOutStack } from './navigation'
import { useEffect, useState } from 'react'
import { firebase } from "./firebase";
const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const useHandler = user => user ? setCurrentUser(user):setCurrentUser(null);
    useEffect(()=>{
        const unsubscribe = firebase.auth().onAuthStateChanged(user =>useHandler(user));
        return unsubscribe;
    },[])
  return (
    <>{currentUser ?<SignedInStack/>:<SignedOutStack/>}</>
  )
}

export default AuthNavigation