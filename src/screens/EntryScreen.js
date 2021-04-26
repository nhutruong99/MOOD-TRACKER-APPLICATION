import React, {useState} from 'react';
import {StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  TextInput, 
  KeyboardAvoidingView, 
  Image,
  LogBox} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
// import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore'
import * as firebase from 'firebase';
// import auth from '@react-native-firebase/auth'

LogBox.ignoreAllLogs();
export default EntryScreen = ({navigation}) => {

  const [value, setMoodValue] = useState(' ');
  var monthNames = [ 'January', 'February', 'March', 'April', 'May','June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  var date = new Date().getDate();
  var month = monthNames[new Date().getMonth()];
  var year = new Date().getFullYear();
  var hours = new Date().getHours(); //To get the Current Hours
  if (hours > 12)
    hours = hours-12
  var min = new Date().getMinutes(); //To get the Current Minutes
  if (min < 10)
    min = '0' + min
  var fullDate = month + ' ' + date + ', ' + year
  const mood1 = () => setMoodValue(1);
  const mood2 = () => setMoodValue(2);
  const mood3 = () => setMoodValue(3);
  const mood4 = () => setMoodValue(4);
  const mood5 = () => setMoodValue(5);
  const mood6 = () => setMoodValue(6);
  const [moodReason, setMood] = useState('');
  let currentUser = firebase.auth().currentUser.email
  currentUser = currentUser.replace('.','')
  
  
  firebase.database().ref('users/' + currentUser + '/' + fullDate).set(
    {
    mood:value,
    moodReason: moodReason
    
    }
  ) .then (() => {
    console.log('Inserted');
  }).catch((error) => {
    console.log('inserted')
  }
  )

  /*firebase.database().ref('users').once('value',(data) =>{
    console.log(data.toJSON())
  })*/
  
  
  return (
    <KeyboardAvoidingView
            style ={{flex:1, backgroundColor:'#FCF8EC'}}
            behavior = "height=">
                  <LinearGradient //creating linear background with end and start point
                      colors={['#FCF8EC' ,'#D0E8F2' ]}
                      style={{flex: 1}}
                      start={{ x: .1, y: .001 }}
                      end={{ x: .1, y: 1.3 }}>
    <View style={styles.container}>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      
    <Text style={styles.title}>RATE YOUR CURRENT MOOD</Text>
    <Text style={styles.dateText}>{month + ' ' + date + ', ' + year}</Text>
    <Text style={styles.dateText}>{hours +':' + min }</Text>
      {/* <Text style={styles.text}>{value}</Text> */}
      <View style={styles.butContainer}>
      
      <TouchableOpacity style={styles.blueBox} onPress={mood1}>
        <Image //input logo images using sources
            style={styles.emoji}
            source = {require ('../screens/images/reallyGood.png')}
        />
        {/* <Text style={styles.touchableText}>Mood 1</Text> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.pinkBox} onPress={mood2}>
        <Image //input logo images using sources
              style={styles.emoji}
              source = {require ('../screens/images/good.png')}
          />
      </TouchableOpacity>
      <TouchableOpacity style={styles.blueBox} onPress={mood3}>
        <Image //input logo images using sources
                style={styles.emoji}
                source = {require ('../screens/images/okay.png')}
            />
      </TouchableOpacity>
      <TouchableOpacity style={styles.pinkBox} onPress={mood4}>
        <Image //input logo images using sources
                  style={styles.emoji}
                  source = {require ('../screens/images/meh.png')}
              />
      </TouchableOpacity>
      <TouchableOpacity style={styles.blueBox} onPress={mood5}>
      <Image //input logo images using sources
                  style={styles.emoji}
                  source = {require ('../screens/images/bad.png')}
              />
      </TouchableOpacity>
      <TouchableOpacity style={styles.pinkBox} onPress={mood6}>
      <Image //input logo images using sources
                  style={styles.emoji}
                  source = {require ('../screens/images/reallyBad.png')}
              />
      </TouchableOpacity>

      </View>
      </View>
      
    <View style={styles.inputContainer}>
    <TextInput
    placeholder = ' Add a Reason'
    placeholderTextColor = '#21243D'
    //returnKeyLabel = 'next' ---- bug : this function doesn't work in this patch
    returnKeyType ='next' // for some reason the ios version of this function works on the android
    keyboardType = 'default'
    autoCapitalize = 'none'
    autoCorrect ={false}
    style={styles.input}
    onChangeText = {moodReason => setMood(moodReason.trim())}
    value = {moodReason}
    />
    <TouchableOpacity style={styles.submit} onPress={() => navigation.navigate("Home")}>
    <Image //input logo images using sources
                  style={styles.arrow}
                  source = {require ('../screens/images/arrow.png')}
              />
    </TouchableOpacity>

</View>
</LinearGradient>

</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },

    butContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1 ,
      flexDirection: 'row',
      flexWrap:'wrap',
      margin: 40,
      
      
  },
  inputContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 16,
    flexDirection: 'row',
    bottom: 20
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 40,
  },
  text: {
    color: 'black',
    fontSize: 40,
  },
  dateText: {
      color: 'black',
      fontSize: 18,
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
  emoji:{
    width: 60,
    height:60,
    backgroundColor: 'transparent',
    bottom: 5,
    right: 5
 
  },
  blueBox:{
    width: 90,
    padding: 20,
    marginTop: 30,
    height: 85,
    borderRadius: 20,
    backgroundColor: '#D0E8F2'
  },
  pinkBox:{
    width: 90,
    padding: 20,
    marginTop: 30,
    height: 85,
    borderRadius: 20,
    backgroundColor: '#F2D8EC'
  },
  submit: {
    backgroundColor: '#696067',
    width: 40,
    height: 40,
    borderRadius: 10,
    bottom:13,
  },
  arrow: {
    width: 25,
    height:25,
    backgroundColor: 'transparent',
    top: 7,
    left: 6
  },

});