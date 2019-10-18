import firebase from './index'
import * as Facebook from "expo-facebook"

const signInWithFacebook = async()=> {
  
  const appId = Expo.Constants.manifest.extra.facebook.appId;
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    appId,
    { permissions: ['public_profile'] }
  );

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    console.log("Success")
    return firebase.auth().signInWithCredential(credential);
    // Sign in with credential from the Facebook user.
    
  }

  // const appId = Expo.Constants.manifest.extra.facebook.appId;
  // const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs
  
  // const {
  //   type,
  //   token,
  // } = await Facebook.logInWithReadPermissionsAsync(
  //   appId,
  //   {permissions}
  // );

  // switch (type) {
  //   case 'success': {
  //     await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
  //     const credential = firebase.auth.FacebookAuthProvider.credential(token);
  //     // const facebookProfileData = await firebase.auth.Auth.prototype.signInWithCredential(credential);  // Sign in with Facebook credential

  //     // Do something with Facebook profile data
  //     // OR you have subscribed to auth state change, authStateChange handler will process the profile data
      
  //     return Promise.resolve({type: 'success'});
  //   }
  //   case 'cancel': {
  //     return Promise.reject({type: 'cancel'});
  //   }
  // }
}

export default signInWithFacebook