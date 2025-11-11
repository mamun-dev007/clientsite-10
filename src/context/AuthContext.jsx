import React, { createContext, useEffect, useState } from 'react';

import app from '../firebase.config';
import { getAuth, onAuthStateChanged, signOut ,signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile} from 'firebase/auth';
import Loading from '../components/Loading';

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const googleLogin = () => signInWithPopup(auth, googleProvider);
  const updateUserProfile = (Profile) =>{
    return updateProfile(auth.currentUser, Profile );
  }
  const logOut = () => signOut(auth);

  useEffect(()=> {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return ()=> unsub();
  },[]);

  const value = { user,  signUp, logIn, googleLogin, logOut, updateUserProfile };
 if (loading) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider value={ value }>
      
      {children}
    </AuthContext.Provider>
  );
};
