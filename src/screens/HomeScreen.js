import React, {Component, useState} from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { useEffect } from "react";



export default HomeScreen = ({navigation}) => {

const db = firebase.firestore();
const [quotes, setQuote] = useState([]);

 useEffect(()=> {
   db.collection('quotes').get()
   .then(response => {
      const fetchedQuotes = [];
      response.docs.forEach(doc => {
        const fetchedQuote = {
        id: doc.id,
        ... doc.data()
       };
       fetchedQuotes.push(fetchedQuote);
     });
     setQuote(fetchedQuotes);
     })
     .catch(error =>{
      setError(error);
   })
 }, []);

 
  return(
  
    <View style = {styles.container}>
      <Image //input logo images using sources
          style={styles.glitter}
          source = {require ('../screens/images/glitters.png')}
      />
      {quotes.map(quote =>(
      <Text style = {styles.mainQuote} key={quote.id}>
        Quote of the day: 
        {"\n"}
        {"\n"}
        "{quote.quote}""
        {"\n"}
        -{quote.author}
      </Text>
      ))}
      <View style = {styles.cloudContainer}>
      
        <Image //input logo images using sources
          style={styles.cloudTop}
          source = {require ('../screens/images/cloud1.png')}
        />
        <Image //input logo images using sources
          style={styles.logo}
          source = {require('../screens/images/logo.png')} 
        />     
         <Image //input logo images using sources
          style={styles.cloud}
          source = {require ('../screens/images/cloud2.png')}
      />   
       <Image //input logo images using sources
          style={styles.cloudBottom}
          source = {require ('../screens/images/cloud1.png')}
      />
      </View>
      
      
      <TouchableOpacity style={styles.buttonContainer1} onPress={() => navigation.navigate("Entry")}>                     
          <Text style = {styles.tabs}>
            Mood Rating
          </Text>                      
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer2} onPress={() => navigation.navigate("Stat")}>                     
          <Text style = {styles.tabs}>
            Statistic
          </Text>                      
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer3} onPress={() => navigation.navigate("Calendar")}>                     
          <Text style = {styles.tabs}>
            Calendar
          </Text>                      
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer4} onPress={() => navigation.navigate("Setting")}>                     
          <Text style = {styles.tabs}>
            Setting
          </Text>                      
      </TouchableOpacity>
     
      
    </View>
    
  );
}

  
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
  mainQuote:{
    textAlign: 'center',
    color: "black",
    fontSize: 25,
    fontWeight: "bold" ,
    top: 120,
    padding: 15,
    position: 'absolute'
    
  },
  
  glitter: {
    width: 500,
    height:1350,
    bottom: -5,
    right: 1,
    opacity: .7,
    position: 'absolute'
  }

});