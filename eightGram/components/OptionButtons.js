import React, { Component } from 'react';
import { View, StyleSheet, Alert, Text, AsyncStorage } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { likePost, unlikePost, setPostId, deletePost } from '../store/post/post.action';

class OptionButtons extends Component {

  constructor() {
    super()
    this.state = {
      token: '',
      userId: ''
    }
  }

  async componentDidMount () {
    try {
      let tokenFromStorage = await AsyncStorage.getItem('token')
      let userIdFromStorage = await AsyncStorage.getItem('userId')
      this.setState({token: tokenFromStorage})
      this.setState({userId: userIdFromStorage})
    } catch (error) {
      console.log(error)
    }
  }

  likePost = () => {
    let postData = {
      id: this.props.post._id,
      token: this.state.token
    }
    if (this.props.post.likes.includes(this.state.userId)) {
      this.props.unlikePost(postData)
    } else {
      this.props.likePost(postData)
    }
  }

  addComment = () => {
    this.props.setPostId(this.props.post._id)
    this.props.navigation.navigate('Comment')
  }

  deletePost = () => {
    let postData = {
      id: this.props.post._id,
      token: this.state.token
    }
    Alert.alert('Warning', 'Are you sure you want to delete this post?', 
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: () => this.props.deletePost(postData)}
      ], 
      { cancelable: false }
    )
  }

  render() {
    if (this.state.userId === this.props.post.userId._id) {
      return (
        <View style={styles.optionWrapper}>
          <View style={styles.optionButtons}>
              <Text style={{paddingRight: 15}}>{this.props.post.likes.length}</Text>
              <Icon
                name="thumbs-up"
                type="font-awesome"
                onPress= { this.likePost }
              />
            </View>
            <View style={styles.optionButtons}>
              <Icon
                name="comments"
                type="font-awesome"
                onPress = { this.addComment }
              />
            </View>
            <View style={styles.optionButtons}>
              <Icon
                name="trash"
                type="font-awesome"
                onPress = { this.deletePost }
              />
            </View>
        </View>
      );
    } else {
      return (
        <View style={styles.optionWrapper}>
          <View style={styles.optionButtons}>
              <Text style={{paddingRight: 15}}>{this.props.post.likes.length}</Text>
              <Icon
                name="thumbs-up"
                type="font-awesome"
                onPress= { this.likePost }
              />
            </View>
            <View style={styles.optionButtons}>
              <Icon
                name="comments"
                type="font-awesome"
                onPress = { this.addComment }
              />
            </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  optionButtons: {
    flexDirection: 'row',
    margin: 10,
    alignItems:'center',
    justifyContent: 'center',
    flex:1,
  },
  optionWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: 'white'
  },
})

const mapStateToProps = (state) => {
  return { data: state }
}

const mapDispatchToProps = (dispatch) => bindActionCreators ({
  likePost,
  unlikePost,
  setPostId,
  deletePost
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OptionButtons);