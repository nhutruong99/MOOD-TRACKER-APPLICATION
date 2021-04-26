import React, {Component} from "react"
import { View, Text, StyleSheet, Alert, ScrollView, TextInput, Button, Linking, DevSettings, AppRegistry, Image  } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {UserContext} from "../context/UserContext";
import { FirebaseContext} from "../context/FirebaseContext";
import { LinearGradient } from 'expo-linear-gradient'
import * as firebase from 'firebase';




export default class SettingScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
    
  };
  showAlert1() {  
    Alert.alert(
      'Credits',
      'UWT IT 2021 \nNhu Truong, Jacob Manio, Brian Do, Erik Aramaki',
      [
        
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
}  



  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
    };
  }


  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  // Changes user's password...
  onChangePasswordPress = () => {
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(this.state.newPassword).then(() => {
        Alert.alert("Password was changed");
      }).catch((error) => { console.log(error.message); });
    }).catch((error) => { console.log(error.message) });
  }

    // Occurs when signout is pressed...
    signOut() {
      // [START auth_sign_out]
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      // [END auth_sign_out]
    }
  
    reload(){
      DevSettings.reload()
    }
    
    
  render() {
    return (
    
        <View style = {styles.container}>
          <LinearGradient //creating linear background with end and start point
                        colors={['#FCF8EC' ,'#D0E8F2' ]}
                        style={{flex: 1}}
                        start={{ x: .10, y: .01 }}
                        end={{ x: .1, y: 1.3}}>
            
            <View style = {styles.logoContainer}>
            <Image //input logo images using sources
                            style={styles.logoTwo}
                            source = {require('../screens/images/settingEmoji2.png')} 
                        />
            </View>
            <Text style={styles.title}>Settings</Text>
            <Text style ={styles.change}>Change Your Password</Text>
            <View style = {styles.container}>
              <TextInput 
                style={styles.textInput} 
                value={this.state.currentPassword}
                placeholder="Current Password" 
                autoCapitalize="none" 
                secureTextEntry={true}
                onChangeText={(text) => { this.setState({currentPassword: text}) }}
              />

              <TextInput 
                style={styles.textInput}
                value={this.state.newPassword}
                placeholder="New Password" 
                autoCapitalize="none" 
                secureTextEntry={true}
                onChangeText={(text) => { this.setState({newPassword: text}) }}
              />
            </View>
            <View style = {styles.logoContainer}>
            <Image //input logo images using sources
                            style={styles.logo}
                            source = {require('../screens/images/settingEmoji.png')} 
                        />
            </View>

            <View style={styles.buttonContainer}>  
              <Button 
                color = "#88E1F2"
                title="Change Password" 
                onPress={this.onChangePasswordPress} />
            </View>

            <View style={styles.buttonContainer}> 
            <Button 
              color = "#88E1F2"
              title="Sign out" 
              
              onPress={()=>{
              this.signOut()
              this.reload()
            }} />
            </View>

            <View style={styles.buttonContainer}> 
                <Button  
                  color = "#88E1F2"
                  width = {20}
                  onPress={this.showAlert1}  
                  title="Credits"  
                />  
            </View>  
                  
          </LinearGradient>
        </View>
      
      
     
    )
  }
}

  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: 'transparent',
    },
   
  
    inputContainer: {
      backgroundColor:'#C5E5EF',
      flexGrow: 1,
      paddingVertical: 16,
      flexDirection: 'row'
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontSize: 40,
      bottom: 40
    },
  
    input: {
      width: 300,
      height: 46,
      backgroundColor: '#FFFFFF',
      margin: 10,
      marginLeft: 10,
      padding: 8,
      color: '#000000',
      borderRadius: 40,
      borderColor: '#000000',
      fontSize: 15,
      fontWeight: '500',
      opacity: .6
    },
    text: { 
      color: "white", 
      fontWeight: "bold", 
      textAlign: "center", 
      fontSize: 20, 
    },

    textInput: { 
      top: 40,
      borderRadius: 20,
      opacity: .9,
      backgroundColor:'#C5E5EF', 
      marginVertical: 10, 
      padding:10, 
      height: 50,
      width: 300, 
      alignSelf: "center", 
      fontSize: 16, 
    },

      
  buttonContainer: {  
    justifyContent: "center",
    backgroundColor: "#88E1F2",
    borderRadius: 50,
    height: 35,
    width: 200,
    margin: 10,
    marginLeft: 95,
    bottom: 100,
     
   },  
  change:{
    textAlign: 'center',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontSize: 20,
      top : 40,
  },
  logoContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    opacity: .10 ,
    bottom: 20
    
},
logo: {
    width: 400,
    height:400,
    backgroundColor: 'transparent',  
},
logoTwo:{
  width: 450,
  height:450,
  right: 25,
  backgroundColor: 'transparent',
}


});

