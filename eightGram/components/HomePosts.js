import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TouchableHighlight,
    FlatList,
    AsyncStorage
} from 'react-native';
import { Icon } from 'react-native-elements'
import OptionButtons from './OptionButtons'

class HomePosts extends Component {
  render() {
    const borderStyle = {
      borderBottomColor: 'black',
      borderWidth: 2
    }
    console.log(this.props.post.comments)
    return (
      <View style={[styles.vertical, borderStyle]}>
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
          <FlatList
            data={this.props.post.comments}
            keyExtractor={(comment) => 'comment' + comment._id}
            renderItem={(comment) =>
              <View style={[styles.horizontal, styles.viewText]}>
                <Text style={{fontWeight: 'bold', paddingRight: 5}}>{comment.item.username}</Text>
                <Text>{comment.item.comment_text}</Text>
              </View>
            }
          />
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
  optionButtonStyle: {
    borderWidth: 2
  },
  postDescription: {
    flexDirection: 'row'
  }
})

export default HomePosts;