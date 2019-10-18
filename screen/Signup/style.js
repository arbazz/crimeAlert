import { StyleSheet, } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#454957',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginTextView:{
      marginBottom: '20%',
      marginRight: '18%'
    },
    loginText:{
      color: 'white',
      fontSize: 32,
      fontWeight: "900"
    },
    textInput:{
      padding: 4,
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      marginBottom: '11%',
      color: 'white'
    },
    textInputView:{
      width: '70%',
      marginBottom: '5%',
    },
    buttonView:{
      backgroundColor: 'black',
      width: '50%',
      height: '8%',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      // marginBottom: '20%'
    },
    textColor:{
      color: 'white',
    },
    signText:{
      color: 'grey',
    },
    signUpView:{
      flex: 0.2,
      marginTop: '6%',
      flexDirection: 'row'
    },
    signupButton:{
      paddingLeft: 4,
      fontSize: 17
    }

  });

  export default styles;