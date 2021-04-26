import React, {useState} from 'react';
import {StyleSheet, Text, View,LogBox, TouchableOpacity,TextInput, KeyboardAvoidingView, Dimensions,Image, } from 'react-native';
import * as firebase from 'firebase';
import { useEffect } from 'react';



LogBox.ignoreAllLogs();

export default StatisticScreen = () => {
  //identifying all the months for the statistic
  var monthNames = [ 'January', 'February', 'March', 'April', 'May','June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  var date = new Date().getDate();
  var month = monthNames[new Date().getMonth()];
  var year = new Date().getFullYear();
  var hours = new Date().getHours(); //To get the Current Hours
  if (hours > 12)// making it non military time
    hours = hours-12
  var min = new Date().getMinutes(); //To get the Current Minutes
  if (min < 10)
    min = '0' + min//allowing to display time correctly  before double digits
  var fullDate = month + ' ' + date + ', ' + year // Full Year
  let currentUser = firebase.auth().currentUser.email//using auth to get current user
  currentUser = currentUser.replace('.','') //necessary to name users email in database
  var test // variable for pulling data out of database
  var weekCount = 0
  var averageChange = new Date().getDate()
  var averageDate =  month + ' ' + averageChange + ', ' + year // variable to get info for each out of database
  var weekTotal = 0
  var weekAverage 
  var monthTotal = 0 
  var monthAverage
  var monthDate = new Date()
  var monthMonth = new Date()
  var weekTest= 0
  var monthTest = 0
  const reallyGood = require('./images/reallyGood.png');
  const good = require('./images/good.png');
  const okay = require('./images/okay.png');
  const meh = require('./images/meh.png');
  const bad = require('./images/bad.png');
  const reallyBad = require('./images/reallyBad.png');

  
  let imageURL ="";
  let imageWeek ="";
  let imageMonth = "";
  


//Querying 
firebase.database()
  .ref('users/' + currentUser)
  .orderByKey().limitToLast(7).on("child_added",function(weekAverageDB){
    
    console.log(weekAverageDB.key)
    console.log(weekAverageDB.val().mood)
    weekTest = weekTest + weekAverageDB.val().mood
  })
  var weekAverage = weekTest / 7 
  console.log(weekAverage.toFixed(2))


//month query average
  firebase.database()
  .ref('users/' + currentUser)
  .orderByKey().limitToLast(30).on("child_added",function(monthAverageDB){
    
    console.log(monthAverageDB.key)
    console.log(monthAverageDB.val().mood)
    monthTest = monthTest + monthAverageDB.val().mood
  })
  var monthAverage = monthTest / 30 
  console.log(monthAverage.toFixed(2))



// pulling live information from database to display todays mood
// error: says it can't access but it changes live
  useEffect(() => {
    firebase.database().ref('users/' + currentUser + '/' + fullDate)
    .on('value', (mood) => {
      setMood({
        mood: mood.val().mood
      })
      //console.log(mood.val())
    })
  },[])
const [moods, setMood] = useState({
    mood:''
  });

// how to reach into database and pull information out
  firebase.database()
  .ref('users/' + currentUser + '/' + fullDate)
  .on("value", function(snapshot){
    //console.log(snapshot.val().mood)
     test = snapshot.val().mood

  })

 
  var outPut = test
 
  //assigning emojis to the values 

  if (outPut == 1)
    imageURL = reallyGood
  if(outPut == 2)
    imageURL = good
  if (outPut == 3)
    imageURL = okay
  if(outPut == 4)
    imageURL = meh
  if(outPut == 5)
    imageURL = bad
  if (outPut == 6)
    imageURL = reallyBad

  if (weekAverage.toFixed(0) == 1)
    imageWeek = reallyGood
  if(weekAverage.toFixed(0) == 2)
    imageWeek = good
  if (weekAverage.toFixed(0) == 3)
    imageWeek = okay
  if(weekAverage.toFixed(0) == 4)
    imageWeek = meh
  if(weekAverage.toFixed(0) == 5)
    imageWeek = bad
  if (weekAverage.toFixed(0) == 6)
    imageWeek = reallyBad

    
  if (monthAverage.toFixed(0) == 1)
    imageMonth = reallyGood
  if(monthAverage.toFixed(0) == 2)
    imageMonth = good
  if (monthAverage.toFixed(0) == 3)
    imageMonth = okay
  if(monthAverage.toFixed(0) == 4)
    imageMonth= meh
  if(monthAverage.toFixed(0) == 5)
    imageMonth = bad
  if (monthAverage.toFixed(0) == 6)
    imageMonth = reallyBad
 
   

  //{'Last Weeks Average Mood: ' + weekAverage.toFixed(2)}
  return(
  <View style={styles.container}>
       <Image //input logo images using sources
        style={styles.cloudBottom}
        source = {require ('../screens/images/cloud1.png')}
    />
     <Image //input logo images using sources
        style={styles.frame}
        source = {require ('../screens/images/frame.png')}
    />

    <Text style = {styles.title}>
      Personal Moods
    </Text>

      <View style = {styles.emojiContainer}>
        <Text style = {styles.stat}> Today's Mood: </Text>
        <Image //input logo images using sources
              style = {styles.emoji}
              source = {imageURL} 
        />
      </View>
      <View style = {styles.emojiContainer}>
        <Text style = {styles.stat}> Weekly's Mood: </Text>
        <Image //input logo images using sources
              style = {styles.emojiTwo}
              source = {imageWeek} 

        />
      </View>
      <View style = {styles.emojiContainer}>
        <Text style = {styles.stat}> Monthly's Mood: </Text>
        <Image //input logo images using sources
              style = {styles.emojiThree}
              source = {imageMonth} 
        />
      </View>
    
</View>
  );
}
// all UX and UI for stat screen
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D0E8F2",
    flex:1,
    justifyContent:"center",
    alignItems: "center"
  },
  cloudContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'transparent',
    opacity: 1,
    marginBottom: -230
  },
  cloudTop:{
    width: 400,
    height:250,
    left: 190,
    bottom: 100,
    

  },
  cloudBottom:{
    width: 300,
    height:200,
    top: 50,
    left: 100,
    opacity: .6,
    position: 'absolute'

  },
  cloud:{
    width: 400,
    height:300,
    bottom: 190,
    right: 50,
    opacity: .6,
    position: 'absolute'
  },

  logo: {
    width: 100,
    height:100,
    backgroundColor: 'transparent',  
    top: 20,
    left: 150,
    opacity: .55,
    position: 'absolute'

  },
  quoteText:{
    textAlign: 'left',
    color: "black",
    fontSize: 30,
    fontWeight: "bold" ,
    bottom: 370,
    left: 10,
    opacity: 100
    

  },
  tabs:{
    fontSize: 17,
    textAlign: 'center',
    color : 'black',
    fontWeight: 'bold'

  },

  buttonContainer1: {
    backgroundColor: '#FCF8ED',
    borderRadius: 30,
    height: 50,
    width: 180,
    justifyContent: 'center',
    bottom: 240,
    marginBottom: -160
  },
  buttonContainer2: {
    backgroundColor: '#FCF8ED',
    borderRadius: 30,
    height: 50,
    width: 180,
    justifyContent: 'center',
    bottom: 68
  },
  buttonContainer3: {
    backgroundColor: '#FCF8ED',
    borderRadius: 30,
    height: 50,
    width: 180,
    justifyContent: 'center',
    bottom: 55
  },
  buttonContainer4: {
    backgroundColor: '#FCF8ED',
    borderRadius: 30,
    height: 50,
    width: 180,
    justifyContent: 'center',
    bottom: 40
  },
  title:{
    textAlign: 'center',
    color: "black",
    fontSize: 40,
    fontWeight: "bold" ,
    top: 70,
    padding: 15,
    position: 'absolute',
  
    
  },
  
  glitter: {
    width: 500,
    height:1350,
    bottom: -5,
    right: 1,
    opacity: .7,
    position: 'absolute'
  },
  emoji:{
    width: 55,
    height:55,
    left: 75,
    backgroundColor: 'transparent',
    top: 160
  
  },
  emojiTwo:{
    width: 55,
    height:55,
    left: 80,
    backgroundColor: 'transparent',
    top: 160
  },
  emojiThree:{
    width: 55,
    height:55,
    left: 85,
    backgroundColor: 'transparent',
    top: 160
  },
  emojiContainer:{
    backgroundColor: 'transparent',
    margin: 7,
    bottom:140
  },
  stat:{
    textAlign: "center",
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontSize: 30,
      top: 150,
      color: "black"
      
  },
  frame:{
    width: 400,
    height:530,
    bottom: 40,
    position: 'absolute',
    backgroundColor: "transparent"
  },
  

});
