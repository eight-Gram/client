import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { likePost, unlikePost, setPostId } from '../store/post/post.action';

class HomePosts extends Component {
  constructor() {
    super()
    this.state = {
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

  likePost = (postId) => {
    let postData = {
      id: this.props.post._id,
      token: this.state.token
    }
    this.props.likePost(postData)
  }

  unlikePost = (postId) => {
    let postData = {
      id: this.props.post._id,
      token: this.state.token
    }
    this.props.unlikePost(postData)
  }

  addComment = () => {
    this.props.setPostId(this.props.post._id)
    this.props.navigation.navigate('Comment')
  }

  render() {
    return (
      <View style={styles.vertical}>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10, marginTop: 10}}>{this.props.post.userId.username}</Text>
        <View style={styles.imageView}>
          <Image source={{uri: this.props.post.pictureUrl}} style={styles.imageStyle}/>
        </View>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10, marginTop: 10}}>{this.props.post.description}</Text>
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
              name="thumbs-down"
              type="font-awesome"
              onPress= { this.unlikePost }
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
        <View style={styles.vertical}>
          {this.props.post.comments.map((comment, index) => (
            <View key={'comment'+index} style={styles.horizontal}>
              <Text style={{fontWeight: 'bold', paddingRight: 5}}>{comment.username}</Text>
              <Text>{comment.comment_text}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vertical: {
    justifyContent: 'center',
    flexDirection: 'column',
    // alignItems: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 0.5,
    height: 50,
    marginTop: 10,
    marginLeft: 10
  },
  optionWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: 'white'
  },
  optionButtons: {
    flexDirection: 'row',
    margin: 10,
    alignItems:'center',
    justifyContent: 'center',
    flex:1,
  },
  imageStyle: {
    height: 500,
    width: 300,
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
})

const mapStateToProps = (state) => {
  return { data: state }
}

const mapDispatchToProps = (dispatch) => bindActionCreators ({
  likePost,
  unlikePost,
  setPostId
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePosts);