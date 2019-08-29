/**
 * @format
 */

import { AppRegistry } from 'react-native'
import firebase, { RemoteMessage } from 'react-native-firebase'
import Router from './src/Router'
import bgMessaging from './BgMessage'
import bgActions from './bgActions'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => Router)
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging) // <-- Add this line
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundNotificationAction', () => bgActions)
