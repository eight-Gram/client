import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity,
    FlatList,
    AsyncStorage
} from 'react-native';
import { Icon } from 'react-native-elements';
import OptionButtons from './OptionButtons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPostId } from '../store/post/post.action'

class HomePosts extends Component {
  setForViewComment = () => {
    this.props.setPostId(this.props.post._id)
    this.props.navigation.navigate('CommentPage')
  }

  render() {
    return (
      <View style={[styles.vertical, styles.containerBorder]}>
        <View style={styles.viewText}>
          <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10, marginTop: 10}}>{this.props.post.userId.username}</Text>
        </View>
        <View style={styles.imageView}>
          <Image source={{uri: this.props.post.pictureUrl}} style={styles.imageStyle}/>
        </View>
        <View style={styles.optionButtonStyle}>
          <OptionButtons post={this.props.post} navigation={this.props.navigation}/>
        </View>
        <View style={[styles.viewText, styles.postDescription]}>
          <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10, marginTop: 10 }}>{this.props.post.userId.username}</Text>
          <Text style={{fontSize: 20, marginLeft: 10, marginTop: 10}}>{this.props.post.description}</Text>
        </View>
          <View style={styles.verticalComment}>
          {this.props.post.comments.length !== 0 && 
            <TouchableOpacity style={styles.button} onPress={ this.setForViewComment }>
              <Text style={{color: 'grey'}}>Read Comments {this.props.post.comments.length}</Text>
            </TouchableOpacity>
          }
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vertical: {
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  containerBorder: {
    borderBottomColor: 'black',
    borderWidth: 2
  },
  verticalComment: {
    flex: 0.1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 0.5,
    height: 50,
    marginTop: 10,
    marginLeft: 20
  },
  imageStyle: {
    height: 500,
    width: 300,
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  viewText: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 2
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 4
  },
  optionButtonStyle: {
    borderWidth: 2
  },
  postDescription: {
    flexDirection: 'row'
  }
})

const mapStateToProps = (state) => {
  return { data: state }
}

const mapDispatchToProps = (dispatch) => bindActionCreators ({
  setPostId,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePosts);