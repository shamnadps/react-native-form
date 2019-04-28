/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import Register from './scenes/main/register';
import Login from './scenes/main/login';
import Main from './scenes/main/main';
import Record from './scenes/main/record';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Main: Main,
    Record: Record
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <AppContainer />
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
