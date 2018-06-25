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
import OptionButtons from './OptionButtons'

class HomePosts extends Component {
  render() {
    return (
      <View style={styles.vertical}>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10, marginTop: 10}}>{this.props.post.userId.username}</Text>
        <View style={styles.imageView}>
          <Image source={{uri: this.props.post.pictureUrl}} style={styles.imageStyle}/>
        </View>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10, marginTop: 10}}>{this.props.post.description}</Text>
        <View>
          <OptionButtons post={this.props.post} navigation={this.props.navigation}/>
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
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 0.5,
    height: 50,
    marginTop: 10,
    marginLeft: 10
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

export default HomePosts;