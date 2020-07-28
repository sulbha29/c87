import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput, Alert,KeyboardAvoidingView ,TouchableOpacity} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Card,Header,Icon } from 'react-native-elements';


export default class Recieverinfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            userid:firebase.auth().currentUser.email,
            username:"",
            recieverid:this.props.navigation.getParam('details')["userid"],
            requestid:this.props.navigation.getParam('details')["requestid"],
            bookname:this.props.navigation.getParam('details')["bookname"],
            reason:this.props.navigation.getParam('details')["reason"],
            recievername:'',
            recievercontact:'',
            recieveraddress:'',
            recieverrequestdocid:''
        }
    }
getuserdetails=(userid)=>{
db.collection("users").where('emailid',"==",userid).get().then((snapshot)=>{
    snapshot.forEach((doc)=>{
        this.setState({
            username:doc.data().firstname+" "+doc.data().lastname
        })
    })
})
}
    getrecieverdetail(){
        db.collection('users').where('emailid','==',this.state.recieverid).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({recievername:doc.data().firstname,recievercontact:doc.data().mobilenumber,recieveraddress:doc.data().address})
            })
        })
        db.collection('requestbooks').where('requestid','==',this.state.requestid).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({recieverrequestdocid:doc.id})
            })
        })
    }
    updatebookstatus = ()=>{
        db.collection("alldonations")
        .add({bookname:this.state.bookname,requestid:this.state.requestid,
            requestedby:this.state.recievername,donorid:this.state.userid,requeststatus:"donorintrested"})
    }
    componentDidMount(){
        this.getrecieverdetail()
        this.getuserdetails(this.state.userid);
    }
    addnotification = ()=>{
        var message = this.state.username + "has shown intrest in donating the book"      
        db.collection("allnotifications").add({
            "targeteduserid":this.state.recieverid,"donorid":this.state.userid,"requestid":this.state.requestid,"bookname":this.state.bookname,
            "date":firebase.firestore.FieldValue.serverTimestamp(),"notificationstatus":"unread","message":message
        })
    } 

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:0.1}}>
                    <Header leftComponent={<Icon name='arrow-left' type='feather' color='orange' onPress={()=>this.props.navigation.goback()}/>}
      centerComponent={{text:"donate books",style:{color:'black',fontSize:16}}}
                    backgroundColor="#eaf8fe"/>
                </View>
                <View>
                    <Card title={"bookinformation"} titleStyle={{fontSize:20}}>
                        <Card>
                            <Text>name:{this.state.bookname}</Text>
                        </Card>
                        <Card>
                            <Text>reason:{this.state.reason}</Text>
                        </Card>
                    </Card>
                </View>
                <View>
                    <Card title={"recieverinformation"} titleStyle={{fontSize:20}}>
                        <Card>
                            <Text>name:{this.state.recievername}</Text>
                        </Card>
                        <Card>
                            <Text>contact:{this.state.mobilenumber}</Text>
                        </Card>
                        <Card>
                            <Text>
                                address:{this.state.recieveraddress}
                            </Text>
                        </Card>
                    </Card>
                </View>
                <View style={styles.buttonContainer}>
                    {this.state.recieverid!==this.state.userid?(<TouchableOpacity 
                    style={styles.button} onPress={()=>{
                        this.addnotification()
                        this.updatebookstatus()
                        this.props.navigation.navigate('mydonations')
                    }}>
                        <Text>
                            I want to donate
                        </Text>
                    </TouchableOpacity>):null}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({ container: { flex:1, }, buttonContainer : { flex:0.3, justifyContent:'center', alignItems:'center' }, button:{ width:200, height:50, justifyContent:'center', alignItems : 'center', borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation : 16 } })