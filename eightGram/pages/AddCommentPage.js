import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Header, FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addComment } from '../store/post/post.action'

class AddCommentPage extends Component {
  constructor() {
    super()
    this.state = {
      comment: '',
      token: ''
    }
  }

  async componentWillMount() {
    try {
      //Check if user have login
      const tokenFromStorage = await AsyncStorage.getItem('token')
      if(!tokenFromStorage) {
        this.props.navigation.navigate('Login')
      } else {
        //Get post data
        this.setState({token: tokenFromStorage})
      }
    } catch (error) {
      console.log(error) 
    }
  }

  addComment = () => {
    let postData = {
      id: this.props.data.post.postId,
      comment_text: this.state.comment,
      token: this.state.token
    }
    this.props.addComment(postData)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => this.props.navigation.goBack()}}
          centerComponent={{text: 'ADD NEW COMMENT', style: { color: 'white', fontSize: 18, fontWeight: 'bold' }}}
        />
        <FormLabel>Comment:</FormLabel>
        <FormInput onChangeText={(comment) => this.setState({comment})}/>
        <Button title='ADD COMMENT' onPress={this.addComment}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { data: state }
}

const mapDispatchToProps = (dispatch) => bindActionCreators ({
  addComment
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentPage);