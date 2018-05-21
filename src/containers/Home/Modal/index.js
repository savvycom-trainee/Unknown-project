import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  CameraRoll,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Icons } from '../../../themes';

const iosConfig = {};
const androidConfig = {};
export default class ModalView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Name Restaurant',
      photos: [],
    };
  }
  _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then((r) => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
        // Error Loading Images
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewHead}>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.hideModal(false);
              }}
            >
              <Image source={Icons.close} style={styles.imgClose} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.textPost}>Post</Text>
          </View>
          <View />
        </View>
        <View style={styles.viewContent}>
          <ScrollView>
            <View style={styles.viewform}>
              <View style={styles.viewTextInput}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                />
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                />
              </View>
              <View>
                <View style={styles.viewOption}>
                  <View style={styles.viewItemOption}>
                    <Image source={Icons.direct} />
                  </View>
                  <View style={styles.viewItemOption}>
                    <TouchableOpacity onPress={() => this._handleButtonPress()}>
                      <Icon name="md-image" size={25} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewItemOption} />
                </View>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.textButtonPost}>Post</Text>
                </TouchableOpacity>
                <View style={styles.viewItemImages}>
                  {this.state.photos.map((p, i) => (
                    <TouchableOpacity key={i} style={styles.viewItemImagesList}>
                      <Icon name="md-image" size={25} color="#fff" />
                      <Image
                        key={i}
                        style={{
                          width: 84,
                          height: 84,
                        }}
                        source={{ uri: p.node.image.uri }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
