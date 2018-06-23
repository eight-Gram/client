import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TouchableHighlight
} from 'react-native';

class HomePosts extends Component {

  LikeOrUnlikePost() {

  }

  render() {
    return (
      <View style={styles.vertical}>
        <View style={styles.horizontal}>
          <Text>Username</Text>
        </View>
        <Image
          source={this.props.post.pictureUrl}
          style={{width: 200, height: 200}}
        />
        <View style={styles.horizontal}>
          <TouchableHighlight onPress={ this.LikeOrUnlikePost }>
            <Image
              style={{height:50, width: 50}}
              source={require('../assets/like-icon.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.vertical}>
          <Text>Comments</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vertical: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
})

export default HomePosts;