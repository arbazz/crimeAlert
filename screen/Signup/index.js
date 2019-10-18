import React from "react";
import { View, TouchableOpacity, ActivityIndicator ,TextInput, Alert, Text } from "react-native";
import styles from './style'

export default class Signup extends React.Component {
  constructor(){
    super();
    this.state={
      name: 'arbaz', 
      loading: false
    }
  }

 async navigate() {
  if(this.state.name !== ''){
    this.setState({
      loading: true
    })
  }else{
    Alert.alert(
      'login Fail',
      'please Type your username',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
    const {name} = this.state;
    console.log(name)
    var obh ={ username: name}
    var exist = false;
    // this exist true will happen when user is already there
    //basically it is a function for mongodb
    exist = true;
  
}

  handleText=(text)=>{
    console.log("from text". text)
    this.setState({
      name: text
    })
  }

  render() {
    const {loading} = this.state
    return (
      <View style={[styles.container]}>
      {!!loading && <View style={[styles.container, styles.horizontal]}>
         <ActivityIndicator size="large" color="#0000ff" />
        <Text>Login in...</Text>
         </View>}
         <View style={styles.loginTextView}>
           <Text style={styles.loginText}>New Account</Text>
         </View>
      {!!!loading && <View  style={styles.textInputView}>
        <TextInput
            style={styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Username"
            placeholderTextColor = "grey"
            autoCapitalize = "none"
            onChangeText = {(text) => this.setState({username: text})}
        />
        <TextInput
            style={styles.textInput}
             underlineColorAndroid = "transparent"
            placeholder = "Password"
            placeholderTextColor = "grey"
            autoCapitalize = "none"
            onChangeText = {(text) => this.setState({password: text})}
        />
      </View>}
      
        <TouchableOpacity style={styles.buttonView} onPress={this.navigate.bind(this)}>
            <Text style={styles.textColor} > Register </Text>
          </TouchableOpacity>
        <View style={styles.signUpView}>
          <Text style={styles.signText}>
           Not the first time?  
          </Text>  
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('SignIn')} style={styles.signupButton}>
            <Text style={styles.textColor}>Login.</Text>
            </TouchableOpacity>
        </View>  
        
      </View>
    );
  }
}

