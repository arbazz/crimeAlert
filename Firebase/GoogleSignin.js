import * as GoogleSignIn from 'expo-google-sign-in';
// import {GoogleSignIn} from 'expo';
import { AppAuth } from 'expo-app-auth';



const  signInAsync = async () => {
  
    try {
        await GoogleSignIn.initAsync({ clientId: '177868605711-g08i9s1j6nkbjt07rtqm6436rnnmadak.apps.googleusercontent.com' });
      } catch ({ message }) {
        alert('GoogleSignIn.initAsync(): ' + message);
      }
    // const { URLSchemes } = AppAuth;
    console.log("singinGooglefunc")
    try {
        behavior: 'web'
    //   await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
          console.log("success");
        // ...
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  
  export  {
      signInAsync
  }