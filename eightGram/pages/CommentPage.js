import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Header } from 'react-native-elements'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CommentPage extends Component {
  constructor() {
    super()
    this.state = {
      post: ''
    }
  }

  componentWillMount () {
    this.props.data.post.posts.map(post => {
      if (post._id === this.props.data.post.postId) {
        this.setState({post: post})
      }
    })
  }

  render() {
    return (
      <View style={styles.vertical}>
        <Header
          leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => this.props.navigation.goBack()}}
          centerComponent={{ text: 'COMMENTS', style: { color: 'white', fontSize: 18, fontWeight: 'bold' } }}
        />
        <ScrollView>
        <View style={[styles.viewText]}>
          <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10, marginTop: 10 }}>{this.state.post.userId.username}</Text>
          <Text style={{fontSize: 20, marginLeft: 10, marginTop: 10}}>{this.state.post.description}</Text>
        </View>
        <View style={styles.verticalComment}>
          {this.state.post.comments.map((comment, index) => (
            <View key={'comment' + index} style={styles.commentsStyle}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 15, marginTop: 10, marginBottom: 10 }}>{comment.username}</Text>
              <Text style={{ fontSize: 15, marginLeft: 15, marginTop: 10, marginBottom: 10 }}>{comment.comment_text}</Text>
            </View>
          ))}
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vertical: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  viewText: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#CFCFCF',
    flexDirection: 'row'
  },
  verticalComment: {
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  commentsStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CFCFCF',
    alignItems: 'center',
    marginLeft: 10,
  }
})

const mapStateToProps = (state) => {
  return { data: state }
}

export default connect(mapStateToProps, null)(CommentPage);