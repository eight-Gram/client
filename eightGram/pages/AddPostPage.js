import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  Alert,
  ScrollView,
  Image,
  TouchableHighlight
} from 'react-native';
import { FormLabel, FormInput, Icon, Button, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPost } from '../store/post/post.action'

class AddPostPage extends Component {
  constructor() {
    super()
    this.state = {
      description: '',
      token: ''
    }
  }

  async componentDidMount () {
    try {
      let tokenFromStorage = await AsyncStorage.getItem('token')
      this.setState({token: tokenFromStorage})
    } catch (error) {
      console.log(error)
    }
  }

  addNewPost = () => {
    this.props.data.post.image.append('description', this.state.description)
    let postData = {
      data: this.props.data.post.image,
      token: this.state.token
    }
    this.props.addPost(postData)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
      <Header
        leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => this.props.navigation.goBack()}}
        centerComponent={{text: 'ADD NEW POST', style: { color: 'white', fontSize: 18, fontWeight: 'bold' }}}
      />
        <FormLabel>Description:</FormLabel>
        <FormInput onChangeText={(description) => this.setState({description})}/>
        <View style={styles.imageUrlText}>
          <Text>{this.props.data.post.imageUrl}</Text>
        </View>
        <View style={styles.upload}>
          <TouchableHighlight style={styles.getImageButton} onPress={() => this.props.navigation.navigate('Upload')}>
            <Icon 
              name='image'
              type='font-awesome'
              color='black'
            />
          </TouchableHighlight>
        </View>
        <Button title='ADD POST' onPress={this.addNewPost}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  upload: {
    flex: 0.1,
    height: 80,
    padding: 15
  },
  getImageButton: {
    alignItems:'center',
    justifyContent: 'center',
    flex:1,
    backgroundColor: 'lightblue',
    height: 80,
    
  },
  imageUrlText: {
    alignItems: 'center',
    justifyContent:'center',
    flex: 0.3,
  }
})

const mapStateToProps = (state) => {
  return { data: state }
}

const mapDispatchToProps = (dispatch) => bindActionCreators ({
  addPost
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddPostPage);