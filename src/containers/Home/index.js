import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import { Header } from '../../components';
import styles from './styles';
import { Icons } from '../../themes';
import * as d from '../../utilities/Tranform';
import { fetchDatagetNewFeed } from '../../actions/getNewFeedAction';
import ModalView from './Modal';
import Loading from '../../components/LoadingContainer';

const shadow = {
  // elevation: 6,
  // shadowColor: 'rgba(0,0,0,0.6)',
  // shadowOffset: { width: 0, height: 0 },
  // shadowOpacity: 0.4,
  // shadowRadius: 20,
};
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      modalVisible: false,
      error: null,
      // starCount: 2.5,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.props.fetchDatagetNewFeed();
    console.log(this.props.dataNewFeed.data);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  hideModal = (message) => {
    this.setModalVisible(message);
  };

  /* eslint-disable */
  deg2rad = deg => deg * (Math.PI / 180);
  _getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
    /* eslint-enable */
  };

  _renderNewFeed() {
    if (this.props.dataNewFeed.isFetching === true) {
      return <Loading />;
    }
    if (this.props.dataNewFeed.dataSuccess === true) {
      return (
        <FlatList
          data={this.props.dataNewFeed.data.reverse()}
          renderItem={({ item }) => {
            const distance = this._getDistanceFromLatLonInKm(
              item.geometry.location.lat,
              item.geometry.location.lng,
              this.state.latitude,
              this.state.longitude,
            );
            return (
              <View style={styles.formItem}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('HomeDetail', { data: item.key });
                  }}
                >
                  <View>
                    <View style={styles.imageContent}>
                      <Image source={{ uri: item.photos[0] }} style={styles.imageContent} />
                    </View>
                    <View style={styles.viewPointForm}>
                      <View style={styles.viewPoint}>
                        <Text style={styles.textPoint}>{item.rating}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.formItemText}>
                    <View style={styles.viewNameRow1}>
                      <Text numberOfLines={1} style={styles.textName}>
                        {item.iduser}
                      </Text>
                    </View>
                    <View style={styles.viewNameRow2}>
                      <View>
                        <Text numberOfLines={1} style={styles.textNameUserRow2}>
                          {item.name}
                        </Text>
                      </View>
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
                        {Math.round(distance) < 1 ? (
                          <Text style={styles.textNameRow2}>
                            {' '}
                            • {Math.round(distance)} m from you{' '}
                          </Text>
                        ) : (
                          <Text style={styles.textNameRow2}>
                            {' '}
                            • {Math.round(distance)} km from you{' '}
                          </Text>
                        )}
                      </View>
                      <View style={styles.viewNameRow2Item}>
                        <Text style={styles.textNameRow2} numberOfLines={1}>
                          {' '}
                          • {item.vicinity}
                        </Text>
                      </View>
                    </View>
                    <View />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
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
          <Modal
            animationType="slide"
            transparent={false}
            onRequestClose={() => {}}
            visible={this.state.modalVisible}
          >
            <ModalView hideModal={this.hideModal} />
          </Modal>
          <ScrollView style={{ flex: 1 }}>
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
                  <TouchableOpacity
                    style={styles.itemMenuIcon}
                    onPress={() => this.props.navigation.navigate('Account')}
                  >
                    <Icon name="md-contacts" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.itemMenu}>
                  <TouchableOpacity
                    style={styles.itemMenuIcon}
                    onPress={() => this.props.navigation.navigate('FindAround')}
                  >
                    <Icon name="ios-navigate" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.viewContent}>
              <View style={styles.viewContentForm}>{this._renderNewFeed()}</View>
            </View>
          </ScrollView>
          {/* </View> */}
        </View>
      </View>
    );
  }
}
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  fetchDatagetNewFeed: PropTypes.func.isRequired,
  dataNewFeed: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    dataNewFeed: state.getNewFeedReducers,
    user: state.user,
  };
};
export default connect(mapStateToProps, { fetchDatagetNewFeed })(Home);
