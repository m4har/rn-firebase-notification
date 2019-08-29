import { createAppContainer, createStackNavigator } from 'react-navigation'
import { fromLeft, flipX } from 'react-navigation-transitions'
import App from './screens/App'
import Web from './screens/WebView'

const AppNavigator = createStackNavigator(
  {
    App: {
      screen: App,
      navigationOptions: {
        header: null
      }
    },
    Web
  },
  {
    initialRouteName: 'App',
    transitionConfig: () => flipX(600)
  }
)

export default createAppContainer(AppNavigator)
