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

  async setStorage (data) {
    try {
      await AsyncStorage.setItem('token', data.token)
      await AsyncStorage.setItem('userId', data.response._id)
    } catch (error) {
      console.log(error)      
    }
  }

  registerUser = () => {
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
            <FormInput onChangeText={(firstname) => this.setState({firstname})}/>
            <FormLabel>Last Name:</FormLabel>
            <FormInput onChangeText={(lastname) => this.setState({lastname})}/>
            <FormLabel>Email:</FormLabel>
            <FormInput onChangeText={(email) => this.setState({email})}/>
            <FormLabel>Username</FormLabel>
            <FormInput onChangeText={(username) => this.setState({username})}/>
            <FormLabel>Password:</FormLabel>
            <FormInput onChangeText={(password) => this.setState({password})} secureTextEntry={true}/>
            <FormLabel>Confirm Password:</FormLabel>
            <FormInput onChangeText={(confirm) => this.setState({confirm})} secureTextEntry={true}/>
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