import React, {Component, useState, useContext} from 'react';
import {View, 
        Text,
        AppRegistry,
        StyleSheet, 
        Image, 
        TextInput, 
        TouchableOpacity, 
        KeyboardAvoidingView, 
        ScrollView, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import {FirebaseContext} from "../context/FirebaseContext"
import {UserContext} from "../context/UserContext"
import * as firebase from 'firebase';
require('firebase/auth')




export default LoginScreen = ({navigation}) => {
    const[loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const firebase = useContext(FirebaseContext);
    const[_, setUser] = useContext(UserContext);

    const signIn = async() =>{
        setLoading(true)
        
        try{
            await firebase.signIn(email, password);
            const uid = firebase.getCurrentUser().uid;


            const userInfo = await firebase.getUserInfo(uid);

            setUser({
                email: userInfo.email,
                password: userInfo.password,
                uid,
                isLoggedIn: true,
            });

        }catch (error){
            alert(error.message)
        }finally{
            setLoading(false)
        }

    };


    return(

        <KeyboardAvoidingView
            style ={{flex:1, backgroundColor:'#FCF8EC'}}
            behavior = "height=">
            <ScrollView style = {styles.container}>

                <LinearGradient //creating linear background with end and start point
                    colors={['#D0E8F2', '#FCF8EC']}
                    style={{flex: 1}}
                    start={{ x: .1, y: .001 }}
                    end={{ x: .1, y: .650 }}>

                    <View style={styles.logoContainer}>
                        <Image //input logo images using sources
                            style={styles.logo}
                            source = {require('../screens/images/emotions.png')} 
                        />
                        <Text style={styles.tittle}> E-MOTIONS </Text>   
                    </View>

                    <View style = {styles.emailIcon}>
                            <MaterialCommunityIcons name="email-outline" size={25} color="black"
                            />    

                    </View>
                    
                   
                    <View style = {styles.container}>
                    
                        <TextInput
                            placeholder = ' Email'
                            placeholderTextColor = '#21243D'
                            //returnKeyLabel = 'next' ---- bug : this function doesn't work in this patch
                            returnKeyType ='next' // for some reason the ios version of this function works on the android
                            keyboardType = 'email-address'
                            autoCapitalize = 'none'
                            autoCorrect ={false}
                            autoFocus ={true}
                            style={styles.input}
                            onChangeText = {email => setEmail(email.trim())}
                            value = {email}
                        />
                    <View style = {styles.lock}>
                        <AntDesign name="lock" size={28} color="black" />
                    </View>
                        <TextInput 
                            placeholder = ' Password'
                            placeholderTextColor = '#21243D'
                            //returnKeyLabel = 'go' ---- bug : this function doesn't work in this patch
                            returnKeyType ='go' // for some reason the ios version of this function works on the android even when error pop up
                            autoCapitalize = 'none'
                            autoCorrect ={false}
                            secureTextEntry = {true}
                            style={styles.input}
                            onChangeText = {password => setPassword(password.trim())}
                            value = {password}
                        
                        />     
                        
                        <TouchableOpacity disabled = {loading} style={styles.buttonContainer} onPress={signIn}>
                            {loading ? (
                                <ActivityIndicator color="white"/>
                            ):(
                                <Text style = {styles.buttonText}>
                                    LOGIN
                                </Text>
                            )}
                            
                        </TouchableOpacity>

                        <Text style= {styles.account}> Don't have an account? 
                            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                <Text style = {styles.signupText}> Sign Up </Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                   
                </LinearGradient>

            </ScrollView>

        </KeyboardAvoidingView>
        );
    }


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'transparent'
    },
    logoContainer: {
        flex: 1,
        marginTop: 10,
        backgroundColor: 'transparent',
        opacity: 1
        
    },
    logo: {
        width: 400,
        height:400,
        backgroundColor: 'transparent',  
    },
    tittle: {
        color: '#8BDCEC',
        //marginLeft: 155
        textAlign: 'center',
        fontSize: 48,
        fontWeight: 'bold',
        marginTop: 5
        
    },
    input: {
        flex: 1,
        backgroundColor:'#C5E5EF',
        height: 50,
        width: 300,
        marginTop: 40,
        marginBottom: 5,
        marginHorizontal: 55,
        borderRadius: 20,
        opacity: .6
    
    },
    buttonContainer: {
        backgroundColor: '#88E1F2',
        borderRadius: 20,
        height: 40,
        width: 110,
        justifyContent: 'center',
        marginBottom: 40,
        marginTop: 30,
        marginHorizontal: 143,
        marginVertical: 30

    },
    buttonText:{
        textAlign: 'center',
        color : 'white',
        fontWeight: 'bold'
    },
    signupText:{
        fontWeight:'bold',
        fontSize: 14,
        color: '#88E1F2',
        textAlign: 'center'
    },
    account:{
        textAlign: 'center'

    },
    emailIcon:{
        paddingLeft: 18,
        marginBottom: -80,
        marginTop: 40
     
    
    },
    lock:{
        marginTop: 26,
        marginBottom: -78,
        marginLeft: 17
    }

})