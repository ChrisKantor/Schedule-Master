// Import the functions you need from the SDKs you need
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmCXMQ54pVK4BDtzi50rjOW-efvsYVswk",
  authDomain: "schedulemaster-3095f.firebaseapp.com",
  projectId: "schedulemaster-3095f",
  storageBucket: "schedulemaster-3095f.appspot.com",
  messagingSenderId: "889249072773",
  appId: "1:889249072773:web:8b31a113338751d6d0cbec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(email, password){
    return createUserWithEmailAndPassword(auth, email, password);
}


//Custom Hook
export function useAuth(){
    const [ currentUser, setCurrentUser ] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [])

    return currentUser;
}

export function login(email, password){
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout(){
    return signOut(auth);
}
