import React from 'react';
import { StyleSheet, Text, View, Alert , TouchableOpacity,TextInput} from 'react-native';
import {Component} from 'react';

import Myheader from '../components/myheader'
import db from '../config'
import firebase from 'firebase'

export default class Settings extends Component{
    constructor(){
        super();
        this.state = {
            emailid:'',
            firstname:'',
            lastname:'',
           
            address:'',
            mobilenumber:'',
            docid:''
        }
    }
    getuserdetails(){
       // console.log("I am here");
        var email = firebase.auth().currentUser.email;
      
        db.collection('users').where('emailid','==',firebase.auth().currentUser.email).get().then(snapshot=>{snapshot.forEach(doc=>{
            console.log(doc.id);
            var data = doc.data()
            this.setState({firstname:data.firstname,lastname:data.lastname,mobilenumber:data.mobilenumber,address:data.address,docid:doc.id})
        })
    }
    )
    }
    componentDidMount(){this.getuserdetails()}
    updateuserdetails=()=>{
//console.log(this.state.docid,this.state.firstname,this.state.lastname,this.state.address);
console.log(this.state.docid)
        db.collection('users').doc(this.state.docid).update({"firstname":this.state.firstname,"lastname":this.state.lastname,"address":this.state.address,"mobilenumber":this.state.mobilenumber})
        Alert.alert("file updated sucessfully")
    }
    render(){
        return(
            <View style = {styles.container}>
                <Myheader title="settings"navigation={this.props.navigation}/>
                <View style = {styles.formContainer}>
                    <TextInput style={styles.formTextInput}
                            placeholder = {"Firstname"}
                            maxLength = {8}
                            onChangeText={(text)=>{
                              this.setState({firstname:text})
                            }}value ={this.state.firstname}/>

                            <TextInput style={styles.formTextInput}
                            placeholder = {"Lastname"}
                            maxLength = {12}
                            onChangeText={(text)=>{
                              this.setState({lastname:text})
                            }}value ={this.state.lastname}/>

                            <TextInput style={styles.formTextInput}
                            placeholder = {"mobilenumber"}
                            maxLength = {10}
                            keyboardType={'numeric'} 
                            onChangeText={(text)=>{
                              this.setState({mobilenumber:text})
                            }}value ={this.state.mobilenumber}/>

                            <TextInput style={styles.formTextInput}
                            placeholder = {"address"}
                            multiline = {true}
                            onChangeText={(text)=>{
                              this.setState({address:text})
                            }}value ={this.state.address}/>
                            <TouchableOpacity style={styles.button} onPress={()=>{
                                this.updateuserdetails()
                            }}>
                                <Text style={styles.buttonText}>
                                    save
                                </Text>
                            </TouchableOpacity>
                    </View>
            </View>            
        )
    }
}

const styles = StyleSheet.create({ container : { flex:1, alignItems: 'center', justifyContent: 'center' }, formContainer:{ flex:1, width:'100%', alignItems: 'center' }, formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, }, button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, buttonText:{ fontSize:25, fontWeight:"bold", color:"#fff" } })