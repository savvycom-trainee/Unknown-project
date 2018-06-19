import React, { Component } from 'react';
import { View, Image, Animated } from 'react-native';

export default class AsyncImage extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      loaded: false,
      imageOpacity: props.placeholderSource ? new Animated.Value(1.0) : new Animated.Value(0.0),
      placeholderOpacity: new Animated.Value(1.0),
      placeholderScale: new Animated.Value(1.0),
    };
  }
  _onLoad = () => {
    // This only exists so the transition can be seen
    // if loaded too quickly.
    setTimeout(() => {
      this.setState(() => ({ loaded: true }));
    }, 1500);
  };

  render() {
    const { placeholderColor, style, source } = this.props;
    return (
      <View>
        <Image source={source} style={[style]} onLoad={this._onLoad} />

        {!this.state.loaded && (
          <View
            style={[
              style,
              {
                backgroundColor: placeholderColor || '#90a4ae',
                position: 'absolute',
              },
            ]}
          />
        )}
      </View>
    );
  }
}
