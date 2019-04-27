/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import ConsentForm from './scenes/consentform';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => ConsentForm);
