import { StyleSheet, } from 'react-native';

const styles = StyleSheet.create({
  absoluteFillObject: {
  width: '100%',
  height: '100%', 
  position: 'absolute',
  },
  map:{
    width: '100%',
    height: '100%',
    zIndex: -2
  },
  search:{
    // left: 0,
    // right: 0,
    // width: 400,
    // alignItems: 'center',
    // elevation: 50,
    // // display: 'none'
    // flex: 1,
    // position: "absolute"
  },
  Image: {
    width: 20,
    height: 20
  },
  flag:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:70,
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10,
    height:70,
    backgroundColor:'#fff',
    borderRadius:100,
    backgroundColor: 'red'
  }


});

export default styles;