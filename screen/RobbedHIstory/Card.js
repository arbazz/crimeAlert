import React from "react";
import { View, TouchableOpacity, ActivityIndicator, Alert, Text, Image } from "react-native";
import styles from './style'
import { getDataForRobbedHistory } from '../../Firebase/database'
import { withNavigation } from 'react-navigation';
import Geocoder from 'react-native-geocoding';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pic: ''
    }
  }


  edit(elem) {
    this.props.navigation.navigate('Edit', { data: elem });
  }
  render() {
    const { pic } = this.state;
    // console.log("from card", this.props)
    return (
      // <View style={styles.container} >
      <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          {/* <Text style={styles.Text}>MWhat happenedy name</Text> */}
          <Image style={styles.Image} source={{ uri: this.props.source }} />
        </View>
        <View style={[styles.column, styles.wht]}>
          {this.props.wht ?
            <Text>{this.props.wht}</Text> :
            <Text>Write What Happened!</Text>
          }
        </View>
        <View style={[styles.column, styles.editContainer]}>
          <TouchableOpacity onPress={() => {
            const id = this.props.id
            this.edit(id)
          }}>
            <Text style={styles.edit}>EDIT</Text>
          </TouchableOpacity>
        </View>
       
      </View>
      <View style={styles.row2}>
          <Text style={styles.time}>{this.props.time}</Text>
          <Text style={styles.location}>{this.props.location}</Text>
      </View>
      </View>
    );
  }
}

export default withNavigation(Card);