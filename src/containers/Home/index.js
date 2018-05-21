import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Header } from '../../components';
import styles from './styles';
import { Icons, Images } from '../../themes';
import * as d from '../../utilities/Tranform';
import data from './data';
import ModalView from './Modal';

const shadow = {
  shadowRadius: 2.5,
  shadowOpacity: 0.1,
  elevation: 1,
  shadowOffset: { width: 2, height: 1 },
};
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      // starCount: 2.5,
    };
  }
  state = {};

  hideModal = (message) => {
    this.setModalVisible(message);
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _renderNewFeed() {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.formItem}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('HomeDetail');
              }}
            >
              <View>
                <View>
                  <Image source={Images.restaurantPhoto} />
                </View>
                <View style={styles.viewPointForm}>
                  <View style={styles.viewPoint}>
                    <Text style={styles.textPoint}>{item.rating}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.formItemText}>
                <View style={styles.viewNameRow1}>
                  <Text style={styles.textName}>{item.name}</Text>
                </View>
                <View style={styles.viewNameRow2}>
                  <View>
                    <Text style={styles.textNameRow2}>{item.type}</Text>
                  </View>
                  <View>
                    <StarRating
                      disabled={false}
                      emptyStar="ios-star-outline"
                      fullStar="ios-star"
                      iconSet="Ionicons"
                      maxStars={5}
                      rating={item.rating}
                      fullStarColor="#4CB33E"
                      reversed
                      starSize={12}
                    />
                  </View>
                </View>
                <View style={styles.viewNameRow3}>
                  <View>
                    {item.follow ? (
                      <Text style={styles.textNameRow2Flowed}>Followed</Text>
                    ) : (
                      <Text style={styles.textNameRow2}>Follow</Text>
                    )}
                  </View>
                  <View style={styles.viewNameRow2Item}>
                    <Text style={styles.textNameRow2}> • {item.form} from you</Text>
                  </View>
                  <View style={styles.viewNameRow2Item}>
                    <Text style={styles.textNameRow2}> • {item.local}</Text>
                  </View>
                </View>
                <View />
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Header
            leftHeader={<Image source={Icons.menu} style={{ marginTop: 2 * d.ratioH }} />}
            centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>NewFeeed</Text>}
            rightHeader={<Image source={Icons.user} />}
          />
          <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
            <ModalView hideModal={this.hideModal} />
          </Modal>
          <ScrollView style={{ height: '100%' }}>
            <View style={styles.viewMenu}>
              <View style={[styles.viewMenuItem, shadow]}>
                <View style={[styles.itemMenu]}>
                  <TouchableOpacity
                    style={styles.itemMenuIcon}
                    onPress={() => {
                      this.setModalVisible(true);
                    }}
                  >
                    <Image source={Icons.add} />
                  </TouchableOpacity>
                </View>
                <View style={styles.itemMenu}>
                  <TouchableOpacity style={styles.itemMenuIcon}>
                    <Image source={Icons.profile} />
                  </TouchableOpacity>
                </View>
                <View style={styles.itemMenu}>
                  <TouchableOpacity style={styles.itemMenuIcon}>
                    <Image source={Icons.direct} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.viewContent}>
              <View style={styles.viewContentForm}>{this._renderNewFeed()}</View>
            </View>
          </ScrollView>
        </View>
        {/* <Button
          onPress={() => {
            this.props.navigation.navigate('HomeDetail');
          }}
          title="HomeDetailStack"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        /> */}
      </View>
    );
  }
}
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
