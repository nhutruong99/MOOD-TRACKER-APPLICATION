import React, { Component,useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useEffect,
  LogBox,
  Image
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { LinearGradient } from 'expo-linear-gradient'
import * as firebase from 'firebase';


LogBox.ignoreAllLogs();


export default class App extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  
  

  
  render() {
    var calMoodValue;
    var monthFinal;
    var dayMood;
    var pastMood;
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '' ;
    var dateCheck = startDate.split(" ", 4)
    var monthNames = [ 'January', 'February', 'March', 'April', 'May','June',
    'July', 'August', 'September', 'October', 'November', 'December'];
    var date = dateCheck[dateCheck.length - 2]
    var month = dateCheck[dateCheck.length - 3]
    var year = dateCheck[dateCheck.length - 1]
    let currentUser = firebase.auth().currentUser.email
    currentUser = currentUser.replace('.','') 
    const reallyGood = require('./images/reallyGood.png');
    const good = require('./images/good.png');
    const okay = require('./images/okay.png');
    const meh = require('./images/meh.png');
    const bad = require('./images/bad.png');
    const reallyBad = require('./images/reallyBad.png');
    let imageURL ="";
    
    switch (month)
    {
      case "Jan":
        monthFinal = "January"
        break;
      case "Feb":
        monthFinal = "February"
        break;
      case "Mar":
        monthFinal = "March"
        break;
      case "Apr":
        monthFinal = "April"
        break;
      case "May":
        monthFinal = "May"
        break;
      case "Jun":
        monthFinal = "June"
        break;
      case "Jul":
        monthFinal = "July"
        break;
      case "Aug":
        monthFinal = "August"
        break;
      case "Sep":
        monthFinal = "September"
        break;
      case "Oct":
        monthFinal = "October"
        break;
      case "Nov":
        monthFinal = "November"
        break;
      case "Dec":
        monthFinal = "December"
        break;
    }
    if (date < 10){
      var dateFinal = date.replace("0",'')
    }
    else {
      dateFinal = date
    }
    
    var fullDate = monthFinal + ' ' + dateFinal + ', ' + year;
    console.log(fullDate)
    
    firebase.database()
      .ref("users/" + currentUser + "/" + fullDate)
      .on("value", function(calMood){
        calMoodValue = calMood.val().mood
        dayMood = calMood.val().mood
      })
      pastMood = dayMood
      console.log(pastMood)
      var finalMood;
      if (pastMood = undefined || null){
        pastMood = 'No Mood'
      }
      else{
        pastMood = dayMood
      }

  if (pastMood == 1)
    imageURL = reallyGood
  if(pastMood== 2)
    imageURL = good
  if (pastMood == 3)
    imageURL = okay
  if(pastMood == 4)
    imageURL = meh
  if(pastMood == 5)
    imageURL = bad
  if (pastMood == 6)
    imageURL = reallyBad



    return (
      <LinearGradient //creating linear background with end and start point
                      colors={[ '#D0E8F2', '#FCF8EC' ]}
                      style={{flex: 1}}
                      start={{ x: .1, y: .001 }}
                      end={{ x: .1, y: .650 }}>
      <View style={styles.container}>
        <Text style={styles.title}>View Past Moods</Text>
        <Text>{'\n'}</Text>
        <CalendarPicker
          todayBackgroundColor= "#D0E8F2"
          selectedDayColor="#88E1F2"
          onDateChange={this.onDateChange}
        />

        <View>
          <Text>Past Mood: </Text>
          <Image //input logo images using sources
              style = {styles.emoji}
              source = {imageURL} 
        />
        </View>
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    flex: 1,
    //backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 30,
  },
  emoji:{
    width: 40,
    height:40,
    left: 20,
    top: 10,
    backgroundColor: 'transparent',
    
  },
});