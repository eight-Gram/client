import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import store from './store'

const RootStack = createStackNavigator (
  {
    Login: {screen: LoginPage},
    Home: HomePage,
    Profile: ProfilePage,
    Register: RegisterPage,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}
