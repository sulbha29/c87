import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput, Alert,KeyboardAvoidingView ,FlatList,TouchableOpacity} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Myheader from '../components/myheader';
import {Card,Icon,ListItem} from 'react-native-elements'


export default class Mydonationscreen extends Component{
    
    constructor(){
        super();
        this.state={
            donorid:firebase.auth().currentUser.email,
            donorname:"",
            alldonations:[]
        }
        this.requestref = null
    }
    static navigationOptions = {header:null}
    getDonorDetails=(donorid)=>{
        db.collection("users").where("emailid","==",donorid).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    "donorname":doc.data().firstname+" "+doc.data().lastname
                })
            })
        })
    }
getalldonations = ()=>{
    this.requestref = db.collection("alldonations").where("donorid","==",this.state.donorid).onSnapshot((snapshot)=>{
        var alldonations = []
        snapshot.docs.map((doc)=>{
        var donation = doc.data()
        donation["docid"]=doc.id
        alldonations.push(donation)
    });
        this.setState({alldonations:alldonations}) ;
    });
}


componentDidMount(){
    this.getalldonations();
    this.getDonorDetails(this.state.donorid)
    
}
componentWillUnmount(){
    this.requestref()
}

sentbook = (bookdetails)=>{
    if(bookdetails.requeststatus === "booksent"){
        var requeststatus = "donorintrested"
        db.collection("alldonations").doc(bookdetails.docid).update({
            "requeststatus":"donorinterested"
        })
        this.sendnotification(bookdetails,requeststatus)
    }
    else{
        var requeststatus = "booksent"
        db.collection("alldonations").doc(bookdetails.docid).update({
            "requeststatus":"booksent"
        })
        this.sendnotification(bookdetails,requeststatus)
    }
}

sendnotification = (bookdetails,requeststatus)=>{
    var requestid = bookdetails.requestid
    var donorid = bookdetails.donorid
    db.collection("allnotifications").where("requestid","==",requestid).where("donorid","==",donorid).get().then((snapshot)=>{
        snapshot.forEach((doc)=>{
        var message=""
        if (requeststatus == "booksent"){
            message = this.state.donorname + "sent you book"
        }
        else {
            message = this.state.donorname + "has shown interest in donating the book"
        }
        db.collection("allnotifications").doc(doc.id).update({
            "mesage":message,
            "notificationstatus":"unread",
            "date":firebase.firestore.FieldValue.serverTimestamp()
        })
    })
})
}
keyExtractor=(item,index)=>index.toString()
renderItem = ({item,i})=>(
    <ListItem 
    key = {i}
    title={item.bookname}
    subtitle={"requestedby:"+item.requestedby+"\n status:"+item.requeststatus}
    leftElement={<Icon name = "book" type = "font-awesome"color="saffron"/>}
    titleStyle = {{color:"black",fontWeight:'bold'}}
    rightElement={<TouchableOpacity style = {[styles.button,{backgroundColor:item.requeststatus === "booksent"?"green":"red"}]} onPress={()=>{
        this.sentbook(item)
    }}><Text>{item.requeststatus==="BookSent"?"Book Sent":"Send Book"}</Text></TouchableOpacity>}/>
)
    render(){
        return(
            <View>
                <Myheader navigation = {this.props.navigation}title="mydonations"/>
               
                    {this.state.alldonations.length === 0?(
                        
                            <Text>list of all donations</Text>
                      
                    ):(<FlatList keyExtractor = {this.keyExtractor}data = {this.state.alldonations}renderItem = {this.renderItem}/>)}
  
                
            </View>
        )
    }
}


const styles = StyleSheet.create({ button:{ width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation : 16 }, subtitle :{ flex:1, justifyContent:'center', alignItems:'center' } }) 