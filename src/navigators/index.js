import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RootNavigator from './rootNavigator';
import { addListener } from '../utilities/redux';

class AppWithNavigationState extends React.PureComponent {
  render() {
    const { dispatch, navigation } = this.props;
    return (
      <RootNavigator
        navigation={{
          dispatch,
          state: navigation,
          addListener,
        }}
      />
    );
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.navigation,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
