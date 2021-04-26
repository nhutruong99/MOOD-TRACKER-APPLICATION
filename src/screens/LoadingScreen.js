import React, {useEffect, useContext} from "react";
import {View, Text, StyleSheet} from "react-native";
import LottieView from "lottie-react-native";
import {UserContext} from '../context/UserContext';
import {FirebaseContext} from '../context/FirebaseContext';


export default LoadingScreen = () => {
    const[_,setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)
    useEffect(() => {
        setTimeout(async () => {
            const user = firebase.getCurrentUser()

            if (user) {
                const userInfo = await firebase.getUserInfo(user.uid)

                setUser({
                    isLoggedIn: true,
                    email: userInfo.email,
                    uid: user.uid

                })
            }else{
                setUser((state) => ({ ...state, isLoggedIn: false}));
            }
        
        }, 500)
    }, []);

    return(
        <View style = {styles.container}>
            <Text style = {styles.loading}> Mood Tracker App </Text>

            <LottieView
                source = {require("../../assets/9619-loading-dots-in-yellow.json")}
                autoPlay
                loop
                style = {{width: "50%"}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    loading:{
        fontSize: 20,
        color: "white"
    }
   

});