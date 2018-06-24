import React, { Component } from 'react';
import {
  View,
  Alert
} from 'react-native'
import CameraRollPicker from 'react-native-camera-roll-picker'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setImageInStore } from '../store/post/post.action'

class UploadImage extends Component {

  getSelectedImages(image) {
    let data = new FormData()
    let url = ''
    if (image[0]) {
      data.append('img', {
        uri: image[0].uri,
        type: 'image/jpeg',
        name: 'eightGramImage'
      });
      url = image[0].uri
      let uploadImageData = {
        data,
        url
      }
      this.props.setImageInStore(uploadImageData)
      this.props.navigation.goBack()
    }

  }

  render() {
    return (
      <CameraRollPicker callback={this.getSelectedImages.bind(this)} maximum={1} />
    );
  }
}

const mapStateToProps = (state) => {
  return { data: state }
}

const mapDispatchToProps = (dispatch) => bindActionCreators ({
  setImageInStore
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);