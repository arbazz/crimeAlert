import React from "react";
import { View, TouchableOpacity, ActivityIndicator ,TextInput, Alert, Text,ScrollView } from "react-native";
import styles from './style'
import {KeyboardAvoidingView} from 'react-native';
import {updateReport2} from '../../Firebase/database'

class CrimeInFo extends React.Component { 
  constructor(){
    super();
    this.state={
      name: '',
      location: '',
      status: 'Robbed',
      whthpnd: 'What happend?',
    }
  }

  handleSubmit= () =>{
    const {whthpnd, status, name} = this.state;
    updateReport2(whthpnd, status, name);
    Alert.alert(
      'Succes',
      'Your report has been submitted',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: true},
    );
    
    
    this.props.navigation.navigate('RobbedHistory');
  }

  render() {
    
    const {status} = this.state;
    
    return (
      
        <KeyboardAvoidingView  style={styles.container} enableAutomaticScroll={true}behavior="padding" enabled>
      
          <Text style={styles.text}>What Happend</Text>
         <TextInput style={[styles.textInput, styles.multiline]} placeholder="What Happend"onChangeText={text => this.setState({whthpnd: text})} multiline={true} textAlignVertical='top' maxLength={1500} />
          <Text style={styles.text}>TItle</Text>
         <TextInput style={styles.textInput} placeholder="Your Title" onChangeText={text => this.setState({name: text})}/>
          {/* <Text style={styles.text}>Location</Text>
         <TextInput style={styles.textInput} placeholder="Your Location" onChangeText={text => this.setState({location: text})}/> */}
          <Text style={styles.text}>Status</Text>
         <TextInput style={styles.textInput} placeholder="Status" value={status} onChangeText={text => this.setState({status: text})}/>
          <TouchableOpacity style={styles.btn} onPress={this.handleSubmit}>
            <Text style={styles.textWhite}>Submit</Text>
          </TouchableOpacity>
      
      </KeyboardAvoidingView>
          
  
    );
  }
}


export default CrimeInFo