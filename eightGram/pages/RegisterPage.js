import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Alert
} from 'react-native'

class RegisterPage extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm: '',
      firstname: '',
      lastname: ''
    }
  }

  registerUser() {
    let self = this
    if (this.state.password !== this.state.confirm) {
      Alert.alert('Warning', 'Password and confirm password is not the same')
    } else {
      axios.post('http://ec2-18-222-146-189.us-east-2.compute.amazonaws.com/user/register', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname
      })
      .then(function(response) {
        Alert.alert('Success', response.data.message)
        self.props.navigation.navigate('Home')
      })
      .catch(function(err) {
        Alert.alert('Error', 'Error while registering new user')
        console.log(err)
      })

    }

  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Register New Account</Text>
          <Text>Username: </Text>
          <TextInput
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            secureTextEntry={true}
          />
          <Text>Email: </Text>
          <TextInput
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            secureTextEntry={true}
          />
          <Text>Password: </Text>
          <TextInput
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
          />
          <Text>First name: </Text>
          <TextInput
            onChangeText={(firstname) => this.setState({firstname})}
            value={this.state.firstname}
            secureTextEntry={true}
          />
          <Text>Last name: </Text>
          <TextInput
            onChangeText={(lastname) => this.setState({lastname})}
            value={this.state.lastname}
            secureTextEntry={true}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={this.registerUser}
          >
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})

export default RegisterPage;