import React from "react";
import { View, TouchableOpacity, ActivityIndicator, ScrollView, Text, Image } from "react-native";
import styles from './style'
import { getDataForRobbedHistory } from '../../Firebase/database'
import Card from './Card';
import moment from 'moment'
import {NavigationEvents} from 'react-navigation';

export default class RobbedHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pic: '',
      data: [],
      ismounted: true
    }
  }

  async componentDidMount() {
    if(this.state.ismounted){
      const data = await getDataForRobbedHistory()
      this.setState({ data })
    }
    // console.log("data from roobedHistor", data)
    // let pic = data.docData.photo ? { uri: data.docData.photo } : require('../../assets/avatar.jpg')
    // console.log(moment(this.state.data[0].docData.timeStamp.Timestamp).fromNow())
    // console.log('from rober', this.state.data[0].docData.timeStamp)
  }

  edit(elem) {
    this.props.navigation.navigate('Edit', { data: elem });
  }

  
takeLcation=(location)=>{
  console.log("from index of rob")
}
  componentWillUnmount(){
    this.setState({ismounted: false});
  }
  render() {
    const { data } = this.state;
    return (
      <ScrollView style={{ flex: 1,}} >
        <NavigationEvents onDidFocus={() => this.componentDidMount()} />
        {!!!!data.length && data.map((elem) => {
            const momentTime = moment(elem.docData.timeStamp.Timestamp).fromNow();
            const location = elem.docData.region;
            this.takeLcation(location);
          return (

              <Card key={elem.docId} wht={elem.docData.whtHpnd} time={momentTime} source={elem.docData.photo} id={elem}/>
      
          )
        })}
        {!!!data.length && <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>}
      </ScrollView>
    );
  }
}

