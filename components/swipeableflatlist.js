import React ,{Component} from 'react';
import { Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { ListItem, Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import db from '../config'
export default class Swipeableflatlist extends Component{
    constructor(props){
        super(props);
        this.state ={
            allnotifications : this.props.allnotifications
        }
    }
onswipevaluechange = swipedata=>{
    var allnotifications = this.state.allnotifications
    const{key,value} = swipedata
    if(value < -Dimensions.get('window').width){
        const newdata = [...allnotifications]
        const previewindex = allnotifications.findIndex(index=>item.key == key)
        this.updatemarkasread(allnotifications[previewindex])
        newdata.splice(previewindex,1)
        this.setState({allnotifications:newdata})
        }
}
updatemarkasread = (notification)=>{
    db.collection("allnotifications").doc(notification.docid).update({"notificationstatus":"read"})
}
renderItem = data => (

    <ListItem 
    leftElement = {<Icon name = "book" type = "font-awesome" color = "saffron"/>}
    title = {data.item.bookname}
    titleStyle = {{color:'orange',fontWeight:'bold'}}
    subtitle = {data.item.message}
    bottomDivider
    />
   
);

renderHiddenItem = ()=>{
    <View style = {styles.rowBack}>
        <View style = {[styles.backRightBtn,styles.backRightBtnRight]}>
            <Text style = {styles.backTextWhite}>
            </Text>
        </View>
    </View>
}
    render(){
        return(
            <View style = {styles.container}>
                <SwipeListView
                disableRightSwipe
                data = {this.state.allnotifications}
                renderItem = {this.renderItem}
                renderHiddenItem = {this.renderHiddenItem}
                rightOpenValue = {-Dimensions.get('window').width}
                previewRowKey = {'0'}
                previewOpenValue = {-40}
                previewOpenDelay = {3000}
                onswipevaluechange = {this.onswipevaluechange}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({ container: { backgroundColor: 'white', flex: 1, }, backTextWhite: { color: '#FFF', fontWeight:'bold', fontSize:15 }, rowBack: { alignItems: 'center', backgroundColor: '#29b6f6', flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, }, backRightBtn: { alignItems: 'center', bottom: 0, justifyContent: 'center', position: 'absolute', top: 0, width: 100, }, backRightBtnRight: { backgroundColor: '#29b6f6', right: 0, }, });