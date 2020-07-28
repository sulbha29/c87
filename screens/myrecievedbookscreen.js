import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import Myheader from '../components/myheader';

export default class MyReceivedBooksScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      receivedBooksList : []
    }
  this.requestRef= null
  }

  getReceivedBooksList=()=>{
    this.requestRef = db.collection("requestbooks")
    .where('userid','==',this.state.userId)
    .where("bookstatus", '==','recieved')
    .onSnapshot((snapshot)=>{
      var receivedBooksList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        receivedBooksList : receivedBooksList
      });
    })
  }

  componentDidMount(){
    this.getReceivedBooksList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    console.log(item.bookname);
    return (
      <ListItem
        key={i}
        title={item.bookname}
        subtitle={item.bookstatus}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Myheader title="Received Books" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.receivedBooksList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Received Books</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.receivedBooksList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})