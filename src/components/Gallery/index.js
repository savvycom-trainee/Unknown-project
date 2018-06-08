import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, CameraRoll, TouchableOpacity, Image } from 'react-native';
import * as d from '../../utilities/Tranform.js';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      isShow: false,
    };
    this.loadPhoto();
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  loadPhoto = () => {
    let params = {
      first: 30,
      assetType: 'Photos',
    };
    if (this.state.photos.page_info) {
      params = {
        ...params,
        after: this.state.photos.page_info.end_cursor,
      };
    }
    CameraRoll.getPhotos(params).then((data) => {
      this.setState({
        photos: data.edges,
      });
    });
  };
  nextLoad = () => {
    if (this.state.photos.page_info.has_next_page) {
      this.loadPhoto();
    }
  };
  randomKey = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 20; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  close = () => {
    this.setState({
      isShow: false,
    });
  };
  open = () => {
    this.setState({
      isShow: true,
    });
  };
  render() {
    return !this.state.isShow ? null : (
      <ScrollView
        style={{
          flex: 1,
          position: 'absolute',
          zIndex: 2,
          backgroundColor: 'white',
        }}
      >
        <View style={{ height: 30, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 14 }}>
            Recent Gellary
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {this.state.photos.map(({ node }) => {
            const key = this.randomKey();
            return (
              <TouchableOpacity
                key={key}
                style={{ margin: 2 }}
                onPress={() => this.props.select(node.image.uri)}
              >
                <Image
                  style={{
                    width: 120 * d.ratioW,
                    height: 100,
                  }}
                  source={{ uri: node.image.uri }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

Gallery.propTypes = {
  select: PropTypes.func.isRequired,
  onRef: PropTypes.func.isRequired,
};

export default Gallery;
