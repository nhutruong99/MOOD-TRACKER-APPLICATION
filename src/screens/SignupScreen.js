import React, {Component, useContext, useState} from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView, 
  ScrollView,
  Alert, 
  ActivityIndicator}
  from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {FirebaseContext} from '../context/FirebaseContext';
import {UserContext} from '../context/UserContext';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);


export default SignupScreen = ({navigation}) => {
    const[loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const firebase = useContext(FirebaseContext)
    const[_, setUser] = useContext(UserContext)


    const signUp = async () => {
      setLoading(true);


      const user = {email, password}

      try{
        const createdUser = await firebase.createUser(user);
    
        setUser({ ...createdUser, isLoggedIn: true})

      }catch (error)
        {
          alert(error.message)
          console.log("Error @signUp", error)
        
        }finally{
          setLoading(false)
          
        }

    };
    
    const[confirm_pass, setConfirm] = useState();
    //state = {
    //     username: '', password: '', email: '', phone_number: ''
    //   }
    //   onChangeText = (key, val) => {
    //     this.setState({ [key]: val })
    //   }
    //   signUp = async () => {
    //     const { username, password, email, phone_number } = this.state
    //     try {
    //       // here place your signup logic
    //       console.log('user successfully signed up!: ', success)
    //     } catch (err) {
    //       console.log('error signing up: ', err)
    //     }
    //   }
      
    return(
        
      <KeyboardAvoidingView
            style ={{flex:1, backgroundColor:'#FCF8EC'}}
            behavior = "height=">
        <ScrollView style = {styles.container}>
          <View style={styles.container}>
              <LinearGradient //creating linear background with end and start point
                      colors={['#D0E8F2', '#FCF8EC']}
                      style={{flex: 1}}
                      start={{ x: .1, y: .001 }}
                      end={{ x: .1, y: .650 }}>
                  <Text>{'\n'}</Text>
                  <Text>{'\n'}</Text>
                  <View style={styles.logoContainer}>
                          <Image //input logo images using sources
                              style={styles.logo}
                              source = {require('../screens/images/logo.png')} 
                          />
                  </View>
                      <Text style={styles.title}>
                      Create your Account 
                      </Text>
                  <Text>{'\n'}</Text>
                  <Text>{'\n'}</Text>
              <TextInput
                  style={styles.input}
                  placeholder='Email'
                  autoCapitalize="none"
                  keyboardType = 'email-address'
                  placeholderTextColor='#21243D'
                  onChangeText = {email => setEmail(email.trim())}
                  value = {email}
                  //onChangeText={val => this.onChangeText('email', val)}
              />  
              <TextInput
                  style={styles.input}
                  placeholder='Password'
                  secureTextEntry={true}
                  autoCapitalize="none"
                  placeholderTextColor='#21243D'
                  //onChangeText={val => this.onChangeText('password', val)}
                  onChangeText = {password => setPassword(password.trim())}
                  value = {password}
              />
              { <TextInput
                  style={styles.input}
                  placeholder='Confirm Password'
                  secureTextEntry={true}
                  autoCapitalize="none"
                  placeholderTextColor='#21243D'
                  //onChangeText={val => this.onChangeText('password', val)}
                  onChangeText = {confirm_pass => setConfirm(confirm_pass.trim())}
                  value = {confirm_pass}
              />
              }
              <Text>{'\n'}</Text>

              <TouchableOpacity disable={loading} style={styles.buttonContainer} onPress={signUp}>
                  {loading ?(
                    <ActivityIndicator color="white" />
                  ):(
                    <Text style = {styles.buttonText}>Create Account</Text>
                  )}
                  
              </TouchableOpacity>

              <View style={styles.signupTextCont}> 
                  <Text style={styles.signupText}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                      <Text style={styles.signupButton}>Sign in</Text>
                  </TouchableOpacity>
              </View>

            </LinearGradient>

          </View>
        </ScrollView>

      </KeyboardAvoidingView>

    )
  }



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    
      },
    input: {
    width: 300,
    height: 46,
    backgroundColor: '#C5E5EF',
    margin: 10,
    marginLeft: 50,
    padding: 8,
    color: '#000000',
    borderRadius: 40,
    borderColor: '#000000',
    fontSize: 15,
    fontWeight: '500',
    opacity: .6
  },
  
  signupTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 16,
    flexDirection: 'row'
    
  },
  signupButton:{
    fontWeight:'bold',
    fontSize: 14,
    color: '#88E1F2',
    textAlign: 'center'
  },

  buttonContainer: {
    justifyContent: "center",
    backgroundColor: "#88E1F2",
    borderRadius: 40,
    height: 35,
    width: 162,
    marginLeft: 116
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    color: 'white',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 36
    
  },
  logoContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'transparent',
    opacity: 1
    
  },
  logo: {
      width: 120,
      height:100,
      backgroundColor: 'transparent',
      marginLeft: 130
  },
 
})