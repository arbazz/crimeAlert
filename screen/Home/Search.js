import React from 'react';
import { Image, Text , View, TouchableOpacity} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import  styles from './style'

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

var focus =  true;
const changeFocus = () =>{
  focus= !focus
  console.log(focus)
}
class Search extends React.Component {
  constructor(){
    super();
    this.state= {
      focus:false,
      display: null
    }
  }


  
  render(){
    const {display}  = this.state
   return (

  <TouchableOpacity style={{flex: 1,
   elevation: 100, position: "absolute"
   }} >
    <GooglePlacesAutocomplete
      placeholder='Enter Location'
      minLength={2} // minimum length of text to search
      // autoFocus={this.state.focus}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      // keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data, details);
        this.setState({
          display: "none"
        })
      }}

      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyAYHsfnNwp3Ys0op32XpPF7k-5yYRE3tjQ',
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}

      styles={{
        textInputContainer: {
          left: 0,
          right: 0,
          // alignItems: 'center',
          // elevation: 1,
          // height: 70,
          // display: 'none'
          // flex: 1,
        },
        description: {
          fontWeight: 'bold',
          display: display
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },
        textInput:{
          marginLeft: 0,
          marginRight: 0,
          height: 40,
          color: '#5d5d5d',
          fontSize: 16,
          width: '80%'
        },
        poweredContainer:{
          display:"none"
        },
        row	:{
          display: display
        }
        
      }}

      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe'
      }}
      
      // GooglePlacesDetailsQuery={{
      //   // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
      //   fields: 'formatted_address',
      // }}

    //   filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
    // //   predefinedPlaces={[homePlace, workPlace]}

      debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={()  => <Image style={styles.Image} source={require('../../assets/left.png')} />}
      // renderRightButton={() => <Text>Search</Text>}
    />
    </TouchableOpacity>
  );
}
}

export default Search;