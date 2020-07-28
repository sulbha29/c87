import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput, Alert,KeyboardAvoidingView ,FlatList,TouchableOpacity, SnapshotViewIOS} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Myheader from '../components/myheader';
import SwipeableFlatList from '../components/swipeableflatlist'
import firebase from 'firebase';
import db from '../config'
export default class Notificationscreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            userid:firebase.auth().currentUser.email,
            allnotifications:[]
        }
        this.notificationref = null
    }
    getnotifications = ()=>{
        this.requestref = db.collection("allnotifications")
        .where("notificationstatus","==","unread")
        .where("targeteduserid","==",this.state.userid).onSnapshot((snapshot)=>{
            var allnotifications = []
            snapshot.docs.map((doc)=>{
                var notification = doc.data()
                notification["docid"] = doc.id
                allnotifications.push(notification)
            })
            this.setState({allnotifications:allnotifications})
        })
    }
    componentDidMount(){
        this.getnotifications();
    }
    componentWillUnmount(){
        this.notificationref();
    }
    keyExtractor = ({item,index})=>index.toString()
        renderItem = ({item,index})=>{
            return(<ListItem
            key = {index}
            leftElement = {
            <Icon name = "book" type = "font-awesome" color = "#696969"/>}  
            title = {item.bookname}
            titleStyle = {{color:'black',fontWeight:'bold'}}
            subtitle = {item.message}
            bottomDivider/>)
        }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {{flex:0.1}}>
                    <Myheader title = {"notification"} 
                    navigation = {this.props.navigation}/>
                </View>
                <View style = {{flex : 0.9}}>
                    {
                        this.state.allnotifications.length == 0?
                        (<View style = {{flex:1,justifyContent:'center'}}>
                            <Text style = {{fontsize:25}}>You have no notifications</Text></View>):(
                        <SwipeableFlatList allnotifications={this.state.allnotifications}/>
                        )
                    }
                </View>
            </View>
        )
                }
            }
                const styles = StyleSheet.create({
                    container : {
                      flex : 1
                    }
                  })