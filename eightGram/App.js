import React, { Component } from 'react';
import { createStackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation'
import { Provider } from 'react-redux';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import AddPostPage from './pages/AddPostPage'
import UploadImagePage from './pages/UploadImage'
import store from './store'

const RootStack = createStackNavigator (
  {
    Login: LoginPage,
    Home: HomePage,
    Profile: ProfilePage,
    Register: RegisterPage,
    AddPost: AddPostPage,
    Upload: UploadImagePage
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
