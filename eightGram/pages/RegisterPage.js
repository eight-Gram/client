import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  AsyncStorage
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, Header } from 'react-native-elements';
import axios from 'axios'

class RegisterPage extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm: '',
      firstname: '',
      lastname: '',
      errorMessageEmail: '',
      errorMessagePass: '',
      errorMessageConfirm: '',
      errorUsername: '',
      errorLastname: '',
      errorFirstname: ''
    }
  }

  async setStorage (data) {
    try {
      await AsyncStorage.setItem('token', data.token)
      await AsyncStorage.setItem('userId', data.response._id)
    } catch (error) {
      console.log(error)      
    }
  }

  emailChange = (email) => {
    this.setState({ email })
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!regexEmail.test(this.state.email)) {
      this.setState({ errorMessageEmail: 'Incorrect format!' })
    } else {
      this.setState({ errorMessageEmail: '' })
    }
  }

  passwordChange = (password) => {
    let letter = /[a-zA-Z]/; 
    let number = /[0-9]/;

    this.setState({ password })
    let goodPassword = letter.test(this.state.password) && number.test(this.state.password);

    if (!goodPassword) {
      this.setState({ errorMessagePass: 'Must be alphanumeric' })
    } else if (this.state.password.length < 6) {
      this.setState({ errorMessagePass: 'Password must be 6 characters long' })
    } else {
      this.setState({ errorMessagePass: '' })
    }
  }

  confimChange = (confirm) => {
    this.setState({ confirm })
    if ( this.state.password !== this.state.confirm ) {
      this.setState({ errorMessageConfirm: 'Password and confirm password does not match!' })
    }
  }

  usernameChange = (username) => {
    this.setState({username})
    if(this.state.username === '') {
      this.setState({ errorUsername: 'Must not be empty!'})
    } else {
      this.setState({ errorUsername: ''})
    }
  }

  lastnameChange = (lastname) => {
    this.setState({lastname})
    if(this.state.lastname === '') {
      this.setState({ errorLastname: 'Must not be empty!'})
    } else {
      this.setState({ errorLastname: ''})
    }
  }

  firstnameChange = (firstname) => {
    this.setState({firstname})
    if(this.state.firstname === '') {
      this.setState({ errorFirstname: 'Must not be empty!'})
    } else {
      this.setState({ errorFirstname: ''})
    }
  }

  registerUser = () => {
    let self = this
    if (this.state.errorFirstname !== '' ) {
      Alert.alert('Warning', 'First name must not be empty')
    } else if (this.state.errorLastname !== '') {
      Alert.alert('Warning', 'Last name must not be empty')
    } else if (this.state.errorMessageEmail !== '') {
      Alert.alert('Warning', this.state.errorMessageEmail)
    } else if (this.state.errorUsername !== '') {
      Alert.alert('Warning', 'Username must not be empty')
    } else if (this.state.errorMessagePass !== '') {
      Alert.alert('Warning', this.state.errorMessagePass)
    } else if (this.state.errorMessageConfirm !== '') {
      Alert.alert('Warning', this.state.errorMessageConfirm)
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
          self.setStorage(response.data)
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
          <Header
            centerComponent={{text: 'REGISTER NEW ACCOUNT', style: { color: '#fff', fontSize: 20 }}}
          />
          <View>
            <FormLabel>First Name:</FormLabel>
            <FormInput onChangeText={this.firstnameChange}/>
            <FormValidationMessage>{this.state.errorFirstname}</FormValidationMessage>
            <FormLabel>Last Name:</FormLabel>
            <FormInput onChangeText={this.lastnameChange}/>
            <FormValidationMessage>{this.state.errorLastname}</FormValidationMessage>
            <FormLabel>Email:</FormLabel>
            <FormInput onChangeText={this.emailChange}/>
            <FormValidationMessage>{this.state.errorMessageEmail}</FormValidationMessage>
            <FormLabel>Username</FormLabel>
            <FormInput onChangeText={this.usernameChange}/>
            <FormValidationMessage>{this.state.errorUsername}</FormValidationMessage>
            <FormLabel>Password:</FormLabel>
            <FormInput onChangeText={this.passwordChange} secureTextEntry={true}/>
            <FormValidationMessage>{this.state.errorMessagePass}</FormValidationMessage>
            <FormLabel>Confirm Password:</FormLabel>
            <FormInput onChangeText={(confirm) => this.setState({confirm})} secureTextEntry={true}/>
            <FormValidationMessage>{this.state.errorMessageConfirm}</FormValidationMessage>
            <TouchableOpacity 
              style={styles.button}
              onPress={this.registerUser}
            >
              <Text style={{fontWeight:'bold'}}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={{color: 'white', fontWeight:'bold'}}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 4
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    margin: 4
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  },
  titleRegister: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 20,
    marginTop: 10
  }
})

export default RegisterPage;