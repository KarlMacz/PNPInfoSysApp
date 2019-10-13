import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Root } from "native-base";

import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import QRScreen from "./components/QRScreen";

const MainNavigator = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen,
  QR: QRScreen,
}, {
  defaultNavigationOptions: {
    initialRouteName: "Home",
    header: null
  }
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}
