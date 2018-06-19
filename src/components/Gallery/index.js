import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, CameraRoll, TouchableOpacity, Image } from 'react-native';
import * as d from '../../utilities/Tranform.js';
import { Icons } from '../../themes';
import styles from './style';
import Header from '../Header';

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
      first: 50,
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
      <View style={styles.container}>
        <Header
          leftHeader={<Image source={Icons.back} />}
          onPressLeftHeader={this.close}
          centerHeader={<Text style={styles.title}>Recent Gellary</Text>}
        />
        <ScrollView horizontal style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
          <View style={styles.scrollView}>
            {this.state.photos.map(({ node }) => (
              <TouchableOpacity
                key={node.image.uri}
                style={{ margin: 2 }}
                onPress={() => this.props.select(node.image.uri)}
              >
                <Image
                  style={{
                    width: 120 * d.ratioW,
                    height: 111 * d.ratioH,
                    alignContent: 'center',
                  }}
                  source={{ uri: node.image.uri }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

Gallery.propTypes = {
  select: PropTypes.func.isRequired,
  onRef: PropTypes.func.isRequired,
};

export default Gallery;
