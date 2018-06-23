import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
  Alert,
  FlatList
} from 'react-native'
import { Icon, Header } from 'react-native-elements'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllPosts } from '../store/post/post.action'
import HomePost  from '../components/HomePosts'

class HomePage extends Component {

  async componentWillMount() {
    try {
      //Check if user have login
      const token = await AsyncStorage.getItem('token')
      if(!token) {
        this.props.navigation.navigate('Login')
      } else {
        //Get post data
        this.props.getAllPosts()
      }
    } catch (error) {
      console.log(error) 
    }
  }
  
  async logoutUser() {
    const self = this;
    try {
      await AsyncStorage.removeItem('token')
      Alert.alert('Success', 'Logout Success')
      self.props.navigation.navigate('Login')
    } catch (error) {
      console.log(error)
    }
  }

  async showToken() {
    try {
      const token = await AsyncStorage.getItem('token')
      Alert.alert('Token', token)
    } catch (error) {
      console.log(error)
    }
  }

  addNewPost () {
    this.props.navigation.push('Image')
  }

  render() {
    if (this.props.data.post.posts.length === 0) {
      return (
        <View>
          <Header
            leftComponent={{ icon: 'menu', color: '#fff'}}
            rightComponent={{ icon: 'add', color: '#fff', onPress: () => this.addNewPost }}
          />
          <Text style={styles.welcome}>No Post have been found. Add new post!</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Header
            leftComponent={{ icon: 'menu', color: '#fff'}}
            rightComponent={{ text: 'add', color: '#fff', onPress: () => this.logoutUser }}
          />
          <FlatList>
            <View>
              { this.props.data.post.posts.map((post, index) => (
                <HomePost post={post} key={'post' + index}/>
              ))}
            </View>
          </FlatList>
        </View>
      );
    }
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
    fontWeight: 'bold'
  },
});

const mapStateToProps = (state) => {
  console.log(state)
  return { data: state }
}

const mapDispatchToProps = (dispatch) => bindActionCreators ({
  getAllPosts
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);