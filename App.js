import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigation/index'
import { Provider } from 'react-redux'
import store from './store/index'

export default function App() {
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
}

