import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Button
  } from 'react-native';import { getDataForRobbedHistory } from '../../Firebase/database'
import { withNavigation } from 'react-navigation';
import {getDataForAll} from '../../Firebase/database'


class AllRobbedHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                // { id: 1, title: "Lorem ipsum dolor", time: "1 days a go", image: "https://lorempixel.com/400/200/nature/6/" },
                 ]
        }
    }

   async componentDidMount(){
    const data = await getDataForAll();
      this.setState({data})
    }

    render() {
      // console.log(this.state.data.docId)
        return (
          <View style={styles.container}>
            {!!this.state.data.length && <FlatList style={styles.list}
              data={this.state.data}
              keyExtractor= {(item) => {
                return item.docId;
              }}
              ItemSeparatorComponent={() => {
                return (
                  <View style={styles.separator}/>
                )
              }}
              renderItem={(post) => {
                const item = post.item;
                return (
                  <View style={styles.card}>
                   
                   <View style={styles.cardHeader}>
                      <View>
                        <Text style={styles.title}>{item.docData.title ? item.docData.title : "I got Robbed"}</Text>
                        <Text style={styles.time}>{item.docData.timeStamp}</Text>
                        <Text style={styles.time}>{item.docData.location}</Text>
                      </View>
                    </View>
                    <View>
                        <Text style={styles.desc}>{item.docData.whtHpnd ? item.docData.whtHpnd : ''}</Text>
                    </View>
                    <Image style={styles.cardImage} source={{uri:item.docData.picUrl}}/>
                    
                    <View style={styles.cardFooter}>
                      <View style={styles.socialBarContainer}>
                        <View style={styles.socialBarSection}>
                          <TouchableOpacity style={styles.socialBarButton}>
                            <Image style={styles.icon} source={{uri: 'https://png.icons8.com/android/75/e74c3c/hearts.png'}}/>
                            <Text style={styles.socialBarLabel}>78</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                          <TouchableOpacity style={styles.socialBarButton} onPress={()=>{this.props.navigation.navigate("Comments",{'docId': item.docId})}}>
                            <Image style={styles.icon} source={{uri: 'https://png.icons8.com/ios-glyphs/75/2ecc71/comments.png'}}/>
                            <Text style={styles.socialBarLabel}>25</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                          <TouchableOpacity style={styles.socialBarButton}>
                            <Image style={styles.icon} source={{uri: 'https://png.icons8.com/metro/75/3498db/administrator-male.png'}}/>
                            <Text rkType='primary4 hintColor' style={styles.socialBarLabel}>13</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              }}/>}
          </View>
        );
      }
    }
export default AllRobbedHistory

    const styles = StyleSheet.create({
      container:{
        flex:1,
        marginTop:20,
      },
      list: {
        paddingHorizontal: 17,
        backgroundColor:"#E6E6E6",
      },
      separator: {
        marginTop: 10,
      },
      /******** card **************/
      card:{
        shadowColor: '#00000021',
        shadowOffset: {
          width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor:"white"
      },
      cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
      },
      cardFooter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
      },
      cardImage:{
        flex: 1,
        height: 220,
        width: null,
      },
      /******** card components **************/
      title:{
        fontSize:18,
        flex:1,
      },
      time:{
        fontSize:13,
        color: "#808080",
        marginTop: 5
      },
      icon: {
        width:25,
        height:25,
      },
      /******** social bar ******************/
      socialBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
      },
      socialBarSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
      },
      socialBarlabel: {
        marginLeft: 8,
        alignSelf: 'flex-end',
        justifyContent: 'center',
      },
      socialBarButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      desc:{
          marginVertical: 4,
          marginHorizontal: 10
      }
    });  

