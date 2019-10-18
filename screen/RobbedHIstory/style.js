import { StyleSheet, } from 'react-native';
import { blue } from 'ansi-colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // flexDirection: 'row',
      marginLeft: '5%',
      padding: 2,
      marginRight: '5%',
      // width: '90%'
    },
    Image: {
      width:55,
    height: 55,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "grey",
    
    },
    column:{
      flex:0.3,
      flexDirection: 'column',
      flexBasis: '10%'
    },
    row: {
      flexDirection: 'row',
      backgroundColor:'#F8F8F8',
      paddingLeft: '4%',
      paddingTop: '3%',
      marginTop: '4%',
      flex: 0.9
      
    },
    wht:{
      width: 100,
      flex: 0.5,
      paddingLeft: 10
    },
    Text:{
      fontSize: 17,
      padding: 3
    },
    edit:{
      paddingRight: 30,
      color: 'blue',
      fontSize: 17,
      fontWeight: "800"
    },
    editContainer:{
      paddingLeft: 10,
      paddingTop: 20
    },
    row2: {
      flexDirection: "row",
      backgroundColor: '#F8F8F8'
    },
    time:{
      color: 'grey',
      padding: 7,
    },
    location:{
      marginLeft: '10%',
      padding: 7,

    },
    commentsContainer:{
      alignContent: "center",
      padding: 10
    },
    seprator:{
      backgroundColor: 'grey',
      height: 1,
      marginTop: 5
    },
    NewComment:{
      padding: 10,
      marginTop: 2
    },
    commnetsTextInput: {
      borderBottomColor: 'grey', 
      borderBottomWidth: 1,
      marginTop: 21
    },
    submit:{
      alignItems: 'center',
      alignItems: "center",
      marginTop: 10,
      backgroundColor: "#454957",
      padding: 15
    },
    text:{
      color: 'white',
      fontSize: 16
    }
  });

  export default styles;