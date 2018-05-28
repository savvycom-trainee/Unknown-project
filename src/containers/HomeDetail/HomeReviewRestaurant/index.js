import React, { PureComponent } from 'react';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import { Icons } from '../../../themes';
// import Icons from 'react-native-vector-icons';
import Content from './Content';
import Data from './Data';
import Header from '../../../components/Header';
import * as d from '../../../utilities/Tranform';

class HomeReviewRestaurant extends PureComponent {
  state = {
    data: [],
    modalVisible: false,
  };

  componentDidMount() {
    console.log(this.props.data.review);
    const obj = this.props.data.review;
    const arr = Object.keys(obj).map(key => obj[key]);
    console.log(arr);
    this.setState({
      data: arr,
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  addReview = () => {
    this.setModalVisible();
    try {
      firebase
        .database()
        .ref('/restaurant/restaurant/-LDaOpd8zjy0tJad2_ns/review')
        .push({
          comment: 'Nhà hàng như shit',
          iduser: 'user123',
          image: [
            'https://c1.staticflickr.com/9/8345/8233271770_70ee15d73a_b.jpg',
            'https://c1.staticflickr.com/9/8345/8233271770_70ee15d73a_b.jpg',
          ],
          name: 'user123',
          rating: 4,
        });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <View style={styles.ViewMain}>
        <Modal
          style={{ height: 30, width: 30 }}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Header
          leftHeader={<Image source={Icons.back} style={{ marginTop: 2 * d.ratioH }} />}
          onPressLeftHeader={this.props.onPressGoBack}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Review</Text>}
          rightHeader
        />

        <TouchableOpacity style={styles.ViewBtnAdd} onPress={this.addReview}>
          <Text style={styles.BtnAdd}>+</Text>
        </TouchableOpacity>

        <View style={styles.ViewContent}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => <Content data={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
HomeReviewRestaurant.propTypes = {
  onPressGoBack: PropTypes.func,
};

HomeReviewRestaurant.defaultProps = {
  onPressGoBack: () => {},
};

export default HomeReviewRestaurant;
