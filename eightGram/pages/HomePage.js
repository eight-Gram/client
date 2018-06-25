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
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { Icon, Header } from 'react-native-elements'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllPosts } from '../store/post/post.action'
import HomePosts from '../components/HomePosts'

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

  async removeToken() {
    try {
      await AsyncStorage.removeItem('token')
      Alert.alert('Success', 'Logout Success')
    } catch (error) {
      console.log(error)
    }
  }

  logoutUser = () => {
    Alert.alert('Warning', 'Are you sure you want to logout?', 
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: () => {
          this.removeToken()
          this.props.navigation.goBack()
        }}
      ], 
      { cancelable: false }
    )
  }

  render() {
    if (this.props.data.post.loading) {
      return (
        <View style={styles.container}>
          <Header
            leftComponent={<TouchableHighlight onPress={this.logoutUser}>
                          <Icon
                            name='sign-out'
                            type='font-awesome'
                            color='white'
                          />
                          </TouchableHighlight>
            }
            centerComponent={{text: 'HOME', style: { color: 'white', fontSize: 18, fontWeight: 'bold' }}}
            rightComponent={{ icon: 'add', color: '#fff', onPress: () => this.props.navigation.push('AddPost') }}
          />
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else if (this.props.data.post.posts.length === 0) {
      return (
        <View style={styles.container}>
          <Header
            leftComponent={<TouchableHighlight onPress={this.logoutUser}>
                          <Icon
                            name='sign-out'
                            type='font-awesome'
                            color='white'
                          />
                          </TouchableHighlight>
            }
            centerComponent={{text: 'HOME', style: { color: 'white', fontSize: 18, fontWeight: 'bold' }}}
            rightComponent={{ icon: 'add', color: '#fff', onPress: () => this.props.navigation.push('AddPost') }}
          />
          <Text style={styles.welcome}>No Post have been found. Add new post!</Text>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <Header
            leftComponent={<TouchableHighlight onPress={this.logoutUser}>
                          <Icon
                            name='sign-out'
                            type='font-awesome'
                            color='white'
                          />
                          </TouchableHighlight>
            }
            centerComponent={{text: 'HOME', style: { color: 'white', fontSize: 18, fontWeight: 'bold' }}}
            rightComponent={{ icon: 'add', color: '#fff', onPress: () => this.props.navigation.push('AddPost') }}
          />
          <ScrollView>
            <View>
            { this.props.data.post.posts.map((post, index) => (
              <HomePosts navigation={this.props.navigation} post={post} key={'post' + index}/>
            ))}
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor:'#6EE9FF',
    flexDirection:'row',
    height:80,
    alignItems:'center',
  },
  bottomButtons: {
    alignItems:'center',
    justifyContent: 'center',
    flex:1,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
});

const mapStateToProps = (state) => {
  return { data: state }
}

const mapDispatchToProps = (dispatch) => bindActionCreators ({
  getAllPosts
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);