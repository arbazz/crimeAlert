import React from "react";
import { View, TouchableOpacity, ActivityIndicator, ToastAndroid, Alert, Text, Image, Platform } from "react-native";
import styles from './style'
import { DrawerActions } from "react-navigation-drawer";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Search from './Search'
import { Icon } from 'react-native-elements'
import {userLogedIn,SaveReportedRegion} from '../../Firebase/database'
import { connect } from "react-redux";
import {getReveseGeoCode} from '../../Firebase/ReverseGeocoding'

var data;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        // latitude: 37.78825,
        // longitude: -122.4324,
        // latitudeDelta: 0.0422,
        // longitudeDelta: 0.0421,
      },
      x: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      location: null,
      errorMessage: null,
      visible: false,
    }
  }

  Toast = () => {
    if (this.state.visible) {
      ToastAndroid.showWithGravityAndOffset(
        'Press this button a long',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        50,
      );
      return null;
    }
    return null;
  };

  
  
  handleButtonPress = () => {
    this.setState(
      {
        visible: true,
      },
      () => {
        this.Toast()
        this.hideToast();
      },
    );
  };

  hideToast = () => {
    this.setState({
      visible: false,
    });
  };

  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  }

  onRegionChange = (region) => {
    this.setState({ region });
  }

  async componentDidMount(){
    // console.log('temp1',data.data.providerData[0])
    const name = data.data.providerData[0].displayName;
    const email = data.data.providerData[0].email;    
    await userLogedIn(name, email);
  }
  async componentWillMount() {
     
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
     await this._getLocationAsync();
    }
  }
  // static navigationOptions = {
  //   // headerTitle instead of title
      
  //   headerTitle: <Search style={styles.search}  notifyChange={(loc) => this.getCoordsFromName(loc)}/>,
  // };
  saveData =async()=>{
    const {region} = this.state;
    let location = 'no-location-reported';
    let reverseLcation;
    if(region.latitude){
      const lat = region.latitude;
      const lon = region.longitude;
       location =await getReveseGeoCode(lat,lon);
       reverseLcation = location.display_name
    }else{
      reverseLcation = location
    }
    const name = data.data.providerData[0].displayName;
    const email = data.data.providerData[0].email;
    const photo = data.data.providerData[0].photoURL;
    const title = null;

    SaveReportedRegion(name, email,region, photo, title, reverseLcation);
    Alert.alert(
      'Reported',
      'Do you want to put some details now?',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
       
        {text: 'NOW ', onPress: () =>this.props.navigation.navigate('CrimeInfo')},
      ],
      {cancelable: false},
    );
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // var copy = Object.assign({}, this.state.region);
    // copy.latitude = location.coords.latitude;
    // copy.longitude = location.coords.longitude;
    var region;
 if(location){
   region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0421,
  }
}
    this.setState({ 
      region,
      x: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    });
    // console.log(region)
  };
  getCoordsFromName(loc) {
    this.setState({
        region: {
            latitude: loc.lat,
            longitude: loc.lng,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
        }
    });
}
  render() {
    // console.log(this.state.region)
    return (
      <View style={ styles.absoluteFillObject}>
        {!!this.state.region.latitude && <MapView 
        initialRegion={this.state.region}
          style={styles.map}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
        >
         
          <Marker
            coordinate={this.state.x}
            // style={{width: 50, height: 20}}
            onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
          // image={require('../../assets/pin.png')}

          />
        </MapView>}
        <Search style={styles.search}  notifyChange={(loc) => this.getCoordsFromName(loc)}/>
          
          <TouchableOpacity 
          onPress={this.handleButtonPress}
         style={styles.flag}
         onLongPress={this.saveData}
 >
   {/* <Icon name="flag"  size={30} color="black" /> */}
   <Text style={{fontSize: 17, color: 'white'}}>Robbed</Text>
  </TouchableOpacity>
          
      </View>
    );
  }
}
const mapStateToProps=(state)=> {
  const {Profile} = state;
  data = Profile
  // console.log("dta gerer radskadjsioadjsiadj=======================>", Profile.data.providerData)
  return state 
}

export default connect(mapStateToProps)(Home)