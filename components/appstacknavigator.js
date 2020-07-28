import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Bookdonation from '../screens/bookdonatescreen';
import Bookrequest from '../screens/bookrequestscreen';
import Recieverinfo from '../screens/recieverdetailsscreen'

export const AppStackNavigator = createStackNavigator({
    BookDonateList : {screen:Bookdonation , navigationOptions:{headerShown:false}},
    recieverdetails : {screen:Recieverinfo , navigationOptions:{headerShown:false}},
},
{
    initialRouteName:'BookDonateList'
})