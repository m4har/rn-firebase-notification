/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Router from './src/Router';
import bgMessaging from './BgMessage';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Router);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line
