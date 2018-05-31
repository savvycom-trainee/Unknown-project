import React, { Component } from 'react';
import { View, Text, ScrollView, CameraRoll, TouchableOpacity, Image } from 'react-native';
import * as d from '../../utilities/Tranform.js';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      isShow: false,
      selectPhoto: {},
    };
    this.loadPhoto();
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
      console.log(data);
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
    for (let i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  select = (node) => {
    console.log('selectNode');
    this.setState({
      isShow: !this.state.isShow,
      selectPhoto: node,
    });
  };
  showGallery = () => {
    console.log('showgallery');
    this.setState({
      isShow: !this.state.isShow,
    });
  };
  render() {
    return !this.state.isShow ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => this.showGallery()}>
          <Text>Load</Text>
        </TouchableOpacity>
        {this.state.selectPhoto.image ? (
          <Image
            source={{ uri: this.state.selectPhoto.image.uri }}
            style={{ marginTop: 30, width: 120, height: 100 }}
          />
        ) : null}
      </View>
    ) : (
      <ScrollView style={{ flex: 1 }}>
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
              <TouchableOpacity key={key} style={{ margin: 2 }} onPress={() => this.select(node)}>
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

export default Gallery;
