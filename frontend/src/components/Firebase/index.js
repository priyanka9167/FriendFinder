import React from 'react';
import app from 'firebase/compat/app';
import 'firebase/compat/auth';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}


app.initializeApp(config);
const auth = app.auth();





const headerToken = () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(async (authUser) => {
            try {
                if (authUser) {
                    let jwtToken = await authUser.getIdToken();
                    let headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    }
                    resolve(headers)
                }
                else {
                    resolve(null)
                }
            }
            catch (err) {
                reject(err)
            }

        });
    })

}

const checkUser = () => {
    return new Promise((resolve,reject) => {
        auth.onAuthStateChanged((authUser) => {
            if(authUser)
            {
                resolve(authUser);
            }
            else
            {
                resolve(null);
            }
        })
    })
}











const doCreateUserWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password);

const doSignInWithEmailAndPassword = (email,password) => auth.signInWithEmailAndPassword(email,password);

const SignOutUser = () => auth.signOut();


export {
    SignOutUser,
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    checkUser,
    headerToken
}
