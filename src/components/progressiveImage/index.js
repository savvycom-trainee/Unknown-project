import React, { Component, PropTypes } from 'react';
import { Animated, View, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class progressiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }
  onLoad() {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 250,
    }).start();
  }
  render() {
    return (
      <View width={300} height={300} backgroundColor="#ffffff">
        <Animated.Image
          resizeMode="contain"
          key={this.props.key}
          style={[
            {
              opacity: this.state.opacity,
            },
            this.props.style,
          ]}
          source={this.props.source}
          onLoad={event => this.onLoad(event)}
        />
      </View>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(progressiveImage);
