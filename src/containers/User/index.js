import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { Icons, Colors } from '../../themes';
import Content from './Content';
import styles from './styles';
import { fetchDatagetUser, fetchDatagetSearchUser } from '../../actions';
import LoadingContainers from '../../components/LoadingContainer';

class User extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      queryText: '',
      checklist: true,
    };
  }
  componentDidMount() {
    this.props.fetchDatagetUser();
  }
  _validateSearch() {
    if (this.state.queryText === '') {
      return true;
    }

    return false;
  }
  _onSearch() {
    const { queryText } = this.state;
    if (!this._validateSearch()) {
      this.props.fetchDatagetSearchUser(queryText);
      this.setState({
        ...this.state,
        checklist: false,
      });
    } else {
      Alert.alert('Mày Nhập hộ tao cái ');
    }
  }
  render() {
    return (
      <View style={styles.ViewMain}>
        <Header
          leftHeader={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={Icons.back} style={styles.back} />
            </TouchableOpacity>
          }
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>User</Text>}
        />
        <View>
          <View style={styles.viewFromSearch}>
            <View style={styles.viewTextInputSearch}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Search Friends"
                placeholderTextColor={Colors.default}
                style={styles.textInputSearch}
                onChangeText={text => this.setState({ queryText: text })}
              />
            </View>
            <View style={styles.ViewButtonSearch}>
              <TouchableOpacity style={styles.buttonSearch} onPress={() => this._onSearch()}>
                <Icon name="md-search" color={Colors.default} size={38} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.viewFlatList}>
          {this.state.checklist === true ? (
            <View>
              {this.props.dataUser.isFetching ? (
                <View style={styles.viewLoad}>
                  <LoadingContainers />
                </View>
              ) : (
                <FlatList
                  data={this.props.dataUser.data}
                  renderItem={({ item }) => <Content data={item} />}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
            </View>
          ) : (
            <View>
              {this.props.dataSearchUser.isFetching ? (
                <View style={styles.viewLoad}>
                  <LoadingContainers />
                </View>
              ) : (
                <View>
                  {this.props.dataSearchUser.data.length === 0 ? (
                    <View style={styles.viewDataUser}>
                      <Text style={styles.textFindUser}>No find User</Text>
                    </View>
                  ) : (
                    <FlatList
                      data={this.props.dataSearchUser.data}
                      renderItem={({ item }) => <Content data={item} />}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
}
User.propTypes = {
  navigation: PropTypes.object.isRequired,
  dataUser: PropTypes.object.isRequired,
  dataSearchUser: PropTypes.object.isRequired,
  fetchDatagetUser: PropTypes.func.isRequired,
  fetchDatagetSearchUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  dataUser: state.getUserReducers,
  dataSearchUser: state.getUserSearchReducers,
});
export default connect(
  mapStateToProps,
  { fetchDatagetUser, fetchDatagetSearchUser },
)(User);
