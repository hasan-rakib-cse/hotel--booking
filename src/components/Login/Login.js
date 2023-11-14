import React, { useContext, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import firebaseConfig from './firebase.config';

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import { UserContext } from '../../App';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

firebase.initializeApp(firebaseConfig)

function Login() {

    const auth = getAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    // Sign In with Google
    const handleGoogleSignIn = () => {
        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider)
        .then((result) => {

            const {displayName, email} = result.user;
            const signInUser = {name: displayName, email: email};
            setLoggedInUser(signInUser)
            navigate(from, {replace: true});
            setIsLoading(false)
            console.log(signInUser)

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode, errorMessage, email, credential);
        });
    }

    // Sign Out with Google
    // const handleSignOut = () => {
    //     signOut(auth).then((res) => {
    //         const signedOutUser = {
    //             isSignedIn: false,
    //             name: '',
    //             email: '',
    //             photo: ''
    //         }
        
    //     }).catch((error) => {
        
    //     });
    // }

    isLoading && <p>Loading......</p>

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;