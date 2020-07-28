import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './apptabnavigator';
import CustomSideBarMenu from './customsidebarmenu'
import Settings from '../screens/settingscreen'
import Mydonationscreen from '../screens/mydonationscreen';
import Notificationscreen from '../screens/notificationscreen'
import MyReceivedBooksScreen from '../screens/myrecievedbookscreen';
export const AppDrawerNavigator = createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    mydonations:{screen:Mydonationscreen},
    notification:{
        screen:Notificationscreen
    },
    MyReceivedBooks:{
        screen:MyReceivedBooksScreen
    },
    Setting:{
        screen:Settings
    },
    },
    {contentComponent:CustomSideBarMenu},
    {initialRouteName:'Home'})