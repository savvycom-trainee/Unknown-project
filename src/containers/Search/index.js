import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, StatusBar, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { search, header } from './style';
// import images from '../../themes/Images';
import Card from './components/Card';
import { fetchDatagetSearchRecomend } from '../../actions/getSearchRecomend';
import Loading from '../../components/LoadingContainer';

class Search extends PureComponent {
  state = {
    queryText: '',
  };

  componentDidMount() {
    this.props.fetchDatagetSearchRecomend(this.state.queryText);
  }

  searchSubmit = () => {
    this.props.fetchDatagetSearchRecomend(this.state.queryText);
  };

  searchBlur = () => {
    console.log('blur');
  };

  renderRecomened = (data) => {
    if (data.isFetching === true) {
      return <Loading />;
    }
    return (
      <View style={search.resultView}>
        <FlatList
          style
          data={data.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('HomeDetail', { data: item.idRestaurant });
              }}
            >
              <Card dataSearch={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={search.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={header.container}>
          <View style={header.searchView}>
            <TextInput
              ref={(ref) => {
                this.search = ref;
              }}
              placeholder="Search Restaurants and ..."
              style={[header.input, { textAlign: 'center' }]}
              underlineColorAndroid="transparent"
              onSubmitEditing={this.searchSubmit}
              onBlur={this.searchBlur}
              onChangeText={text => this.setState({ queryText: text })}
            />
          </View>
        </View>
        <Text style={search.title}> Recommended for you </Text>
        {this.renderRecomened(this.props.dataSearchRecomend)}
      </View>
    );
  }
}

// export default Search;
Search.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    //   // getParam: PropTypes.func.isRequired,
    //   // goBack: PropTypes.func.isRequired,
  }).isRequired,
  fetchDatagetSearchRecomend: PropTypes.func.isRequired,
  dataSearchRecomend: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dataSearchRecomend: state.getSearchRecomendReducers,
});

const mapDispatchToProps = dispatch => ({
  fetchDatagetSearchRecomend: queryText => dispatch(fetchDatagetSearchRecomend(queryText)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
