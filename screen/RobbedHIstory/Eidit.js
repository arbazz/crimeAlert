import React from "react";
import { View, TouchableOpacity, Button, TextInput, Alert, Text, ScrollView, Image } from "react-native";
import styles from './EditStyle'
import { KeyboardAvoidingView } from 'react-native';
import { updateReport } from '../../Firebase/database'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements'
import {getReveseGeoCode} from '../../Firebase/ReverseGeocoding'

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      status: 'Robbed',
      whthpnd: '',
      secondLocation: '',
      image: null,
      imageBrowserOpen: false,
      photos: [],
      firstStep: false,
      secondStep: true,
      thirdStep: true
    }
  }


  async getPermission() {
    const { status } = await Permissions.getAsync(Permissions.READ_EXTERNAL_STORAGE);
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
    }
  }


 async componentDidMount() {

    this.getPermissionAsync();
    // console.log("proooooooops", this.props.navigation.state.params.data.docId)
    this.setState({
      name: this.props.navigation.state.params.data.docData.name,
      location: this.props.navigation.state.params.data.docData.region,
      whthpnd: this.props.navigation.state.params.data.docData.whthpnd ? this.props.navigation.state.params.data.docData.whthpnd : 'Tell us What Happened',
      status: this.props.navigation.state.params.data.docData.status ? this.props.navigation.state.params.data.docData.status : 'Robbed',
    })
    // console.log("this.is.the.location", this.props.navigation.state.params.data.docData.region)
    const lat = this.props.navigation.state.params.data.docData.region.latitude;
    const lon = this.props.navigation.state.params.data.docData.region.longitude;
   const reverseLocation =  await getReveseGeoCode(lat,lon)
   this.setState({
     reverseLocation,
     secondLocation: reverseLocation.display_name
    })
   console.log(reverseLocation);
  }


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }


  handleSubmit = () => {
    const docId = this.props.navigation.state.params.data.docId
    const { whthpnd, status, location, title, secondLocation, image } = this.state;
    // if (secondLocation !== '') {
      updateReport(whthpnd, status, secondLocation, title, docId, image );
    // } else {
      // updateReport(whthpnd, status, location, title, docId, image );
    // }
    Alert.alert(
      'Succes',
      'Your report has been submitted',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: true },
    );


    this.props.navigation.navigate('RobbedHistory');
  }

  clean = () => {
    if (this.state.whthpnd === 'Tell us What Happened') {
      this.setState({
        whthpnd: ''
      })
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }
  render() {
    if (this.state.imageBrowserOpen) {
      return (<ImageBrowser max={4} callback={this.imageBrowserCallback} />);
    }
    const { thirdStep, reverseLocation, whthpnd, title, image, firstStep, secondStep } = this.state;

    return (

      //     <ScrollView>  
      //   <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      //     <Text style={styles.text}>What Happend</Text>
      //    <TextInput style={[styles.textInput, styles.multiline]} placeholder={whthpnd} 
      //    onChangeText={text => this.setState({whthpnd: text})} onFocus={this.clean}
      //     value={whthpnd} multiline={true} textAlignVertical='top'
      //      maxLength={1500}/>
      //     <Text style={styles.text}>title</Text>
      //    <TextInput style={styles.textInput} value={title}
      //     placeholder='I got Robbed...' onChangeText={text => this.setState({title: text})}/>
      //     <Text style={styles.text}>Location</Text>
      //    <TextInput style={styles.textInput} value={this.state.secondLocation} 
      //    placeholder="Your Location" onChangeText={text => this.setState({location: text})}/>
      //     <Text style={styles.text}>status</Text>
      //     <Button
      //     title="Pick an image from camera roll"
      //     onPress={this._pickImage}
      //   />
      //       {image &&
      //     <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      //     <TouchableOpacity style={styles.btn} onPress={this.handleSubmit}>
      //       <Text style={styles.textWhite}>Submit</Text>
      //     </TouchableOpacity>
      // </KeyboardAvoidingView>
      // </ScrollView>
      <View style={styles.container}>
        {/* First Step */}
        {!firstStep && !image && <TouchableOpacity onPress={this._pickImage}>
          <Icon name="camera-roll" color='grey' size={85} style={styles.Icon} />
          <Text>Please select an Image</Text>
        </TouchableOpacity>}
        {image && !firstStep &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        {image && !firstStep && <TouchableOpacity onPress={this._pickImage}>
          <Icon name="camera-roll" color='grey' size={85} style={styles.Icon} />
          <Text>Please select another Image if you want</Text>
        </TouchableOpacity>}
        {image && !firstStep && <TouchableOpacity onPress={() => { this.setState({ firstStep: true, secondStep: false }) }} style={styles.next}><Text style={styles.textWhite}>Next</Text></TouchableOpacity>}

        {/* 2nd Step */}

        {!secondStep && <View style={styles.secStep}>
          <Text style={styles.text}>Title</Text>
          <TextInput style={styles.textInput} value={title}
            placeholder='I got Robbed...' onChangeText={text => this.setState({ title: text })} />
          <Text style={styles.text}>Location</Text>
          <TextInput style={styles.textInput} value={this.state.secondLocation}
            placeholder={reverseLocation && reverseLocation.display_name} onChangeText={text => this.setState({ location: text })} />
          <TouchableOpacity onPress={() => { this.setState({ thirdStep: false, secondStep: true }) }} style={styles.next}><Text style={styles.textWhite}>Next</Text></TouchableOpacity>
        </View>
        }

        {/* 3rd Step */}

        {!thirdStep && <View style={styles.secStep}>
        <Text style={styles.text}>What Happend</Text>
        <TextInput style={[styles.textInput, styles.multiline]} placeholder={whthpnd}
          onChangeText={text => this.setState({ whthpnd: text })} onFocus={this.clean}
          value={whthpnd} multiline={true} textAlignVertical='top'
          maxLength={1500} />
           <TouchableOpacity style={styles.btn} onPress={this.handleSubmit}>
             <Text style={styles.textWhite}>Submit</Text>
      </TouchableOpacity>
        </View>}

      </View>
    );
  }
}


export default Edit