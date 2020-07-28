import React from 'react';
import Bookdonation from '../screens/bookdonatescreen';
import Bookrequest from '../screens/bookrequestscreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Image} from 'react-native'
import{AppStackNavigator} from './appstacknavigator'

export const AppTabNavigator = createBottomTabNavigator({
    donatebooks:{screen:AppStackNavigator,navigationOptions:{
        tabBarIcon: <Image source={require("../assets/request-icon.png")}style={{width:50,height:50}}/>,
        tabBarLabel:"donate books"
    }},
    requestbooks:{screen:Bookrequest,navigationOptions:{
        tabBarIcon: <Image source={require("../assets/donate-icon.png")}style={{width:50,height:50}}/>,
        tabBarLabel:"request books"
    }}
})