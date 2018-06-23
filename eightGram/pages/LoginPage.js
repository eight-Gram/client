import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  AsyncStorage
} from 'react-native'
import axios from 'axios'

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
      self.setToken(response.data.token)
      Alert.alert('Login Success', response.data.message)
      self.props.navigation.navigate('Home')
    })
    .catch(function(err) {
      Alert.alert('Error', err)
    })
  }

  async setToken (token) {
    try {
      await AsyncStorage.setItem('token', token)
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
          <Text>Username: </Text>
          <TextInput
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          />
          <Text>Password: </Text>
          <TextInput
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
          />
          <Button
            onPress={this.loginUser}
            title="Login"
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

export default LoginPage;