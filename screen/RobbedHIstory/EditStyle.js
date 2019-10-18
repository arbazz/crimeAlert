import { StyleSheet, } from 'react-native';
import { white } from 'ansi-colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#454957',
      // alignItems: 'center',
      alignItems: "center",
      marginTop: 20,
      flexDirection: 'column'
    },
    textInput: {
      width: '90%',
      borderBottomColor: 'blue',
      borderBottomWidth: 1,
      height: '10%'
    },
    text: {
      marginTop: '4%',
      color: '#454957',
      fontSize: 13,
      paddingBottom: 1
    },
    multiline:{
      height: '40%',
      borderColor: '#454957',
      borderWidth: 1,
      borderBottomColor: '#454957',
      padding: '2%'
    },
    btn: {
      width: '90%',
      backgroundColor: '#454957',
      marginTop: 20,
      height: 40,
      justifyContent: "center"
    },
    textWhite: {
      color: 'white',
      textAlign: 'center',
      fontSize: 23,
      marginTop: 2
    },
    next:{
      marginTop: '6%',
      backgroundColor: '#454957',
      width: '20%',
      height: '7%',
    },
    secStep:{
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems: "center",
      marginTop: 20,
      paddingBottom: 20
    }
  });

  export default styles;