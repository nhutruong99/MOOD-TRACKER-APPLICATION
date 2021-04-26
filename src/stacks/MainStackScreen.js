import React from 'react'
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Entypo, AntDesign } from '@expo/vector-icons';



import HomeScreen from '../screens/HomeScreen';
import EntryScreen from '../screens/EntryScreen';
import StatisticScreen from '../screens/StatisticScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SettingScreen from '../screens/SettingScreen';


export default MainStackScreens = () => {
    const MainStack = createBottomTabNavigator()

    const tabBarOptions = {
        showLabel: false,
        style: {
            backgroundColor: "#FCF8EC",
            paddingBottom: 2
        },
    };

    const screenOptions = ({route}) => ({
        tabBarIcon: ({focused}) => {

            switch (route.name)
            {
                //assigning icons for each pages of the application
                case "Home":
                    return <Entypo name="home" size={24} color={focused ? "#D0E8F2" : "#666666"} />
                    break;

                case "Entry":
                    return <Entypo name="clipboard" size={24} color={focused ? "#D0E8F2" : "#666666"} />
                    break;

                case "Stat":
                    return <Entypo name="bar-graph" size={24} color={focused ? "#D0E8F2" : "#666666"} />
                    break;

                case "Calendar":
                    return <Entypo name="calendar" size={24} color={focused ? "#D0E8F2" : "#666666"} />
                    break;

                case "Setting":
                    return <AntDesign name="setting" size={24} color={focused ? "#D0E8F2" : "#666666"} />   
       
            }

            
        },
    });

    return(
        //creating stacks for all screen once user logged in
        <MainStack.Navigator tabBarOptions={tabBarOptions} screenOptions = {screenOptions}>
            <MainStack.Screen name ="Home" component={HomeScreen}/>
            <MainStack.Screen name ="Entry" component={EntryScreen}/>
            <MainStack.Screen name ="Stat" component={StatisticScreen}/>
            <MainStack.Screen name ="Calendar" component={CalendarScreen}/>
            <MainStack.Screen name ="Setting" component={SettingScreen}/>
        </MainStack.Navigator>
    );
};