import React ,{Component} from 'react';
import { StyleSheet, Text, View,Alert } from 'react-native';
import {Header,Icon,Badge} from 'react-native-elements';
import db from '../config'
import firebase from 'firebase';
export default class Myheader extends Component{
  constructor(props){
    super(props)
    this.state={
      value:""
    }
  }

getNumberOfUnreadNotifications(){
  db.collection('all_notifications').where('notificationstatus','==',"unread")
  .onSnapshot((snapshot)=>{
    var unreadnotifications = snapshot.docs.map((doc) => doc.data())
    this.setState({
      value: unreadnotifications.length
    })
  })
}

componentDidMount(){
  this.getNumberOfUnreadNotifications()
}
 BellIconWithBadge=(props)=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#696969' size={25}
          onPress={() =>this.props.navigation.navigate('notification')}/>
         <Badge
          value={this.state.value}
         containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }
  
render(){
    return (
      <Header
        leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => this.props.navigation.toggleDrawer()}/>}
        centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
        rightComponent={<this.BellIconWithBadge {...this.props}/>}
        backgroundColor = "#eaf8fe"
      />
    );
  };
  
}