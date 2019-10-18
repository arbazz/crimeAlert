import firebase from './index'
import 'firebase/firestore';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import Constants from 'expo-constants';
import uuid from 'uuid';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

var db = firebase.firestore();
var docId;
const addDataOfReport = () => {
    db.collection("cities").doc("LA").set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
    // console.log(db)
}

const userLogedIn = async (name, email) => {
    var userId = await firebase.auth().currentUser.providerData[0].uid;
    // console.log('from userLogon', user)

    db.collection("users").doc(userId).get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data Exist");
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            db.collection("users").doc(userId).set({
                name,
                email,
                deviceName: Constants.deviceName
            })
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

const SaveReportedRegion = (name, email, region, photo, title,location) => {
    var userId = firebase.auth().currentUser.providerData[0].uid;

    db.collection('reports').add({
        name,
        email,
        deviceName: Constants.deviceName,
        status: 'robbed',
        region,
        userId,
        timeStamp: Date.now(),
        photo,
        title,
        location
    })
        .then((docRef) => {
            console.log("your locarion has been reported", docRef.id);
            docId= docRef.id
        })
        .catch((error) => {
            console.error(error)
        })
}


const updateReport = async(whtHpnd, status, location, title, docid, image) => {
    var userId;
    // console.log(docid)
    if(typeof docid !== 'undefined'){
        userId = docid;
        console.log("if")
    }else{
        console.log('else')
        userId = docId
    }
    let picUrl;
    if(image){
        picUrl = await uploadImageAsync(image)
        console.log(picUrl)
    }
    //the user id could be the doc id depedednng on the component function being called
   await db.collection("reports").doc(userId).update({
        whtHpnd,
        status,
        location,
        title,
        picUrl
    })
}

const updateReport2 = async(whtHpnd, status, title, docid, image) => {
    var userId;
    // console.log(docid)
    if(typeof docid !== 'undefined'){
        userId = docid;
        console.log("if")
    }else{
        console.log('else')
        userId = docId
    }
    let picUrl;
    if(image){
        picUrl = await uploadImageAsync(image)
        console.log(picUrl)
    }
    //the user id could be the doc id depedednng on the component function being called
   await db.collection("reports").doc(userId).update({
        whtHpnd,
        status,
        title,
    })
}

const getDataForRobbedHistory = async()=>{
    var userId = firebase.auth().currentUser.providerData[0].uid;
    let docId;
    let docData
    let abc = [];
  await  db.collection("reports").where("userId", "==", userId).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
             docId = doc.id;
             docData = doc.data();
              abc.push({docId, docData});
            });
        });
        // console.log('abc===========>', abc)
        return abc
    
}

const getDataForAll =async()=>{
    let abc =[];
    await db.collection("reports").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            let docId = doc.id;
            let docData = doc.data();
            abc.push({docId, docData});
        })
    })
    return abc;
}

async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }

  const saveComment = (id, text) =>{
    return new Promise((res,rej)=>{
        db.collection('comments').doc(id).collection('comments').add({
            comment: text
        }).then(()=>{
            console.log("succes writting")
            res("succes")
        }).catch((err)=>{
            rej(err)
            console.log("failed writting comment!")
        })    
    })
    
  }

  const getComment = async(id)=>{
    console.log("getcomment initiated")
    let abc = [];
    await db.collection("comments").doc(id).collection("comments").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            let docId = doc.id;
            let docData = doc.data();
            console.log(docData)
            abc.push({docId, docData});
        })
    })
    return abc;
  }
export {
    addDataOfReport,
    userLogedIn,
    SaveReportedRegion,
    updateReport,
    getDataForRobbedHistory,
    getDataForAll,
    updateReport2,
    saveComment,
    getComment
}