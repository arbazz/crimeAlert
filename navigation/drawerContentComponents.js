import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { white } from 'ansi-colors';
import { Icon } from 'react-native-elements'
import signout from '../Firebase/SignOut'
import { connect } from "react-redux";

var data;

class drawerContentComponents extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    
    handleSignout=()=>{
       const res = signout();
       console.log(res)
    //    if(res === true){
    //        Alert("Success")
    //        this.props.navigation.navigate('Login')
    //    }
    }
    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
      let Profile, pic;
      if(data){
           Profile = data.data.providerData
           pic = Profile[0].photoURL ? {uri: Profile[0].photoURL} : require('../assets/avatar.jpg')
      }
    console.log("Data",Profile)
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                {}
             <Image style={styles.image} source={pic} />
            </View>

            <View>
                <Text style={styles.text}>
                    {Profile[0].displayName}
                </Text>
            </View>
                <TouchableOpacity style={styles.otherView}>
                <Icon name="home" color='grey' size={35} style={styles.Icon}/>
                    <Text style={{color: 'grey'}}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherView} >
                <Icon name="devices" color='grey' size={35} style={styles.Icon}/>
                    <Text style={{color: 'grey'}}>My Devices</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherView}  onPress={()=>this.props.navigation.navigate('RobbedHistory')}>
                <Icon name="history" color='grey' size={35} style={styles.Icon}/>
                    <Text style={{color: 'grey'}}>My Robbed History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherView} onPress={()=>{this.props.navigation.navigate("AllRobbedHistory");}}>
                <Icon name="list" color='grey' size={35} style={styles.Icon}/>
                    <Text style={{color: 'grey'}}>All Robbed History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutView} onPress={this.handleSignout}>
                    <Text style={{color: 'white'}}>Logout</Text>
                </TouchableOpacity>
                
            {/* <View style={styles.screenContainer}>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='ScreenA') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ScreenA') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('ScreenA')}>Screen A</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='ScreenB') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ScreenB') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('ScreenB')}>Screen B</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='ScreenC') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ScreenC') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('ScreenC')}>Screen C</Text>
                </View>
            </View> */}
        </View>
    )
  }
}

const mapStateToProps=(state)=> {
    const {Profile} = state;
    data = Profile
    // console.log("dta gerer radskadjsioadjsiadj=======================>", Profile.data.providerData)
    return state 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    screenContainer: { 
        paddingTop: 20,
        width: '100%',
    },
    text: {
        marginTop: 10,
        fontSize: 18
    },
   image:{ 
       width: 150, 
       height: 150,  
       marginTop: 10
    },
    profileContainer:{
     
    },
    logoutView:{
        marginTop: 10,
        backgroundColor: 'black',
        width: '50%',
        height: 40,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    otherView:{
        marginTop: 10,
        width: '50%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        borderColor: 'grey',
        borderTopWidth: 1,
    },
    icon:{
        alignItems: 'center',
        alignContent: 'center',
    }
});


export default connect(mapStateToProps)(drawerContentComponents)