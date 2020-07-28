import React ,{Component}from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,TextInput,
   Alert ,Modal,KeyboardAvoidingView,ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase'

export default class Loginscreen extends Component{
    constructor(){
        super();
        this.state={
            emailid:'',
            password:'',
            isModalVisible:false,
            firstname:'',
            lastname:'',
            mobilenumber:'',
            address:'',
            confirmpassword:''
        }
    }
    usersignup =(emailid,password,confirmpassword)=>{
      if(password!==confirmpassword){
        return Alert.alert("password doesnt match/check your password")
    }else{
    firebase.auth().createUserWithEmailAndPassword(emailid,password)
    .then(()=>{
      db.collection('users').add({
          firstname:this.state.firstname,
          lastname:this.state.lastname,
          mobilenumber:this.state.mobilenumber,
          emailid:this.state.emailid,
          address:this.state.address,
          isbookrequestactive:false
        }) 
        return Alert.alert("User Added Successfully",
        '',
        [{text:'ok',onPress:()=>
        this.setState({"isModalVisible":false})},]);
    })

        
        .catch(function(error){
            var errorcode = error.code
            var errormessage = error.message
            return Alert.alert(errormessage)
        });
      }
    }
    userlogin = (emailid,password)=>{
      firebase.auth().signInWithEmailAndPassword(emailid,password)
      .then(()=>{
          this.props.navigation.navigate('donatebooks')  
      })    
           .catch((error)=>{
            var errorcode = error.code
            var errormessage = error.message
            return Alert.alert(errormessage)
        })
    }
    showmodal=()=>{
        return(
            <Modal
            animationType="fade"
            transparent={true}
            visible={false}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{width:'50%'}}>
                        <KeyboardAvoidingView style ={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
                     <TextInput style={styles.formTextInput}
                            placeholder = {"Firstname"}
                            maxLength = {8}
                            onChangeText={(text)=>{
                              this.setState({firstname:text})
                            }}/>
                            <TextInput style={styles.formTextInput}
                            placeholder = {"Lastname"}
                            maxLength = {12}
                            onChangeText={(text)=>{
                              this.setState({lastname:text})
                            }}/>
                            <TextInput style={styles.formTextInput}
                            placeholder = {"Contact"}
                            maxLength = {10}
                            keyboardType={'numeric'} 
                            onChangeText={(text)=>{
                              this.setState({mobilenumber:text})
                            }}/>
                            <TextInput style={styles.formTextInput}
                            placeholder = {"address"}
                            multiline = {true}
                            onChangeText={(text)=>{
                              this.setState({address:text})
                            }}/>
                            <TextInput style={styles.formTextInput}
                            placeholder = {"e-mail"}
                            keyboardType={'email-address'}
                            onChangeText={(text)=>{
                              this.setState({emailid:text})
                            }}/>
                            <TextInput style={styles.formTextInput}
                            placeholder = {"password"}
                            secureTextEntry={true}
                            onChangeText={(text)=>{
                              this.setState({password:text})
                            }}/>
                            <TextInput style={styles.formTextInput}
                            placeholder = {"confirmpassword"}
                            secureTextEntry={true}
                            onChangeText={(text)=>{
                              this.setState({confirmpassword:text})
                            }}/>
                            <View>
 <TouchableOpacity style={styles.registerButton}
 onPress={()=>this.usersignup(this.state.emailid,this.state.password,this.state.confirmpassword)}>
   <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
 <TouchableOpacity style={styles.cancelButton}
 onPress={()=>this.setState({"isModalVisible":false})}>
                                <Text>Cancel</Text>
                                </TouchableOpacity>
                              </View>   
                              </KeyboardAvoidingView> 
                              </ScrollView>
                                </View>                           
            </Modal>
        )
    }
   
    render(){
  return (
      <View style = {styles.container}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
          {
            this.showmodal()
          }
          </View>
          <View>
              <Text style = {styles.title}>BOOK SANTA</Text>
          </View>
          <View>
              <TextInput style={styles.loginbox}
              placeholder = "abcd@yahoo.com"
              keyboardType = 'email-address'
              onChangeText = {(text)=>{
                  this.setState({emailid:text})
              }}
              />
              <TextInput style={styles.loginbox}
              secureTextEntry = {true}
              placeholder = "enter password"
              onChangeText = {(text)=>{
                  this.setState({password:text})
              }}
              />                        
              < TouchableOpacity style=
              {[styles.submitbutton,{marginBottom:25,marginTop:25}]}
              onPress ={()=>{
                  this.userlogin(this.state.emailid,this.state.password)
              }}>
                  <Text>login</Text>
                  </ TouchableOpacity>
     < TouchableOpacity style={[styles.submitbutton,{marginBottom:25,marginTop:25}]}
              onPress ={()=>this.setState({isModalVisible:true})}>
                 
                  <Text>signup</Text>
                  </ TouchableOpacity>

          </View>
      </View>
  );
}
}

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'#F8BE85',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  KeyboardAvoidingView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  modalTitle :{
    justifyContent:'center',
    alignSelf:'center',
    fontSize:30,
    color:'#ff5722',
    margin:50
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  registerButtonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
  },
 
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  }
});