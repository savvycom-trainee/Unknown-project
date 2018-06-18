import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Remote debugger',
  'source.uri should not be an empty string',
]);
AppRegistry.registerComponent('unknown', () => App);
