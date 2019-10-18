import React from "react";
import { View, TouchableOpacity, ActivityIndicator ,TextInput, Alert, Text,Image } from "react-native";
import styles from './style'
import signInWithFacebook from '../../Firebase/Auth'
import firebase from '../../Firebase/index'
import {signInAsync} from '../../Firebase/GoogleSignin'
import { connect } from "react-redux";
import {ProfileAction} from '../../store/actions/profile'

class Login extends React.Component {
  constructor(){
    super();
    this.state={
      name: 'arbaz', 
      loading: false
    }
    this.mounted = true;
  }

 async navigate() {
   if(this.state.name !== ''){
    if(this.mounted) {
      this.setState({
        loading: true
      })
      }
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
    // console.log(name)
    var obh ={ username: name}
    var exist = false;
    // this exist true will happen when user is already there
    //basically it is a function for mongodb
    exist = true;
}
async componentDidMount(){
  if(this.mounted) {
    this.setState({
      loading: true
    })
   }
 firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
        // console.log(user);
        this.props.send(user)
        this.props.navigation.navigate('home')
    }else{
      this.setState({
        loading: false
      })
    }
  })
}
  handleText=(text)=>{
    console.log("from text". text)
    this.setState({
      name: text
    })
  }

  handelFacebookLogin=async()=>{ 
   const data = await signInWithFacebook()
  //  console.log("data from facebook", data)
  }
  handleGoogleLogin=async()=>{
    console.log("hndelGogle")
    await signInAsync()
  }

  componentWillUnmount(){
    this.mounted = false;
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
           <Text style={styles.loginText}>Login</Text>
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
      
       {!!!loading && <TouchableOpacity style={styles.buttonView} onPress={this.navigate.bind(this)}>
            <Text style={styles.textColor} > Log in </Text>
          </TouchableOpacity>}
          {!!!loading &&   <View style={styles.signUpView}>
          <Text style={styles.signText}>
            First time here?  
          </Text>  
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('Signup')} style={styles.signupButton}><Text style={styles.textColor}>Sign up.</Text></TouchableOpacity>
          </View>  }
          {!!!loading && <View>
          <Text style={styles.textColor}>Login with</Text>
        </View>}
        {!!!loading &&   <View style={styles.imageContainer}>
          <TouchableOpacity onPress={this.handelFacebookLogin}>
          <Image style={{width: 50, height: 50,  marginRight: 20}} source={require('../../assets/fb.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleGoogleLogin}>
          <Image style={{width: 55, height: 55,marginBottom: 20}} source={require('../../assets/google.png')} />
          </TouchableOpacity>
        </View>}
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    send: (profile) => dispatch(ProfileAction(profile))
  }
}
export default connect(null, mapDispatchToProps) (Login)