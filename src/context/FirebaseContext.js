import React, {createContext} from 'react';

import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import config from '../config/firebase'
import { useScrollToTop } from '@react-navigation/native';

const FirebaseContext = createContext();

if(!firebase.apps.length) {

    firebase.initializeApp(config);


}

const db = firebase.firestore();

const Firebase = {
    getCurrentUser: () => {
        return firebase.auth().currentUser
    },

    createUser: async (user) =>{
        try{
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            const uid = Firebase.getCurrentUser().uid;

            await db.collection("users").doc(uid).set({
                email: user.email,
                password: user.password
            })
        } catch (error){

            alert(error.message)
            console.log("Error @createUser: ", error.message)
        }
    },
    getUserInfo: async(uid) =>{
        try {
            const user = await db.collection("users").doc(uid).get()
            if (user.exists){
                return user.data()
            }

        } catch (error){
            console.log("Error @getUserInfo: ", error)
        }
    },
    logOut: async() => {
        try{
            await firebase.auth().signOut();

            return true;

        }catch (error) {
            console.log("Error @logout ", error)
        }

        return false;
    },
    signIn: async(email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },

    
 
    
};
const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>;
};

export {FirebaseContext, FirebaseProvider};


