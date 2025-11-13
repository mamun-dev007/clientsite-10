import React, { createContext, useEffect, useState } from 'react';

import app from '../firebase.config';
import { getAuth, onAuthStateChanged, signOut ,signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile} from 'firebase/auth';
import Loading from '../components/Loading';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

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
    const unsub = onAuthStateChanged(auth, async(currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const loggeds = { email: currentUser.email}
  try {
    const res = await fetch("http://localhost:3000/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loggeds),
    })
    .then(res=>res.json())
    .then(data => {
      console.log('hello token',data.token)
      localStorage.setItem("access-token", data.token);
    })  
  } catch (error) {
    console.error("JWT fetch failed:", error);
  }
} else {
  localStorage.removeItem("access-token");
}

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
