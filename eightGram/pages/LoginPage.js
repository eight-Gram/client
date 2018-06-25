import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  AsyncStorage
} from 'react-native';
import axios from 'axios';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

class LoginPage extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
    }
  }

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token !== '') {
        this.props.navigation.navigate('Home')
      }
    } catch (error) {
      console.log(error)
    }
  }

  loginUser = () => {
    let loginData = {
      username: this.state.username,
      password: this.state.password
    }
    const self = this
    axios.post('http://ec2-18-222-146-189.us-east-2.compute.amazonaws.com/user/login', {
      username: loginData.username,
      password: loginData.password
    })
    .then(function(response) {
      self.setStorage(response.data)
      Alert.alert('Login Success', response.data.message)
      self.props.navigation.navigate('Home')
    })
    .catch(function(err) {
      Alert.alert('Error', err)
    })
  }

  async setStorage (data) {
    try {
      await AsyncStorage.setItem('token', data.token)
      await AsyncStorage.setItem('userId', data.id)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Eight GRAM
        </Text>
        <Text style={styles.instructions}>
          Mini social media app!
        </Text>
        <View>
          <FormLabel>Username</FormLabel>
          <FormInput onChangeText={(username) => this.setState({username})}/>
          <FormLabel>Password</FormLabel>
          <FormInput 
            onChangeText={(password) => this.setState({password})}
            secureTextEntry={true}
          />
          <Button
            small
            title='LOGIN'
            onPress={this.loginUser}
            backgroundColor='#6ED5FF'
          />
          <Button
            small
            title='REGISTER'
            backgroundColor='#FF936E'
            onPress={() => this.props.navigation.navigate('Register')}
          />
        </View>
      </View>
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
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default LoginPage;