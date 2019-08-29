import React from 'react'
import firebase from 'react-native-firebase'

class Notification extends React.Component {
  componentDidMount () {
    this.checkPermission()
  }

  async getToken () {
    try {
      const fcmToken = await firebase.messaging().getToken()
      console.log(fcmToken)
    } catch (error) {
      console.warn(error)
    }
  }

  async requestPermission () {
    try {
      await firebase.messaging().requestPermission()
      // User has authorised
      this.getToken()
      this.createNotificationListeners()
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected')
    }
  }

  async checkPermission () {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      this.getToken()
      this.createNotificationListeners()
    } else {
      this.requestPermission()
    }
  }

  createNotificationListeners () {
    try {
      const channel = new firebase.notifications.Android.Channel('channel_name1', 'channel_name1', firebase.notifications.Android.Importance.High)
      // .setDescription('channel_name')
        .setSound('default')
      firebase.notifications().android.createChannel(channel)
      /*
       * Triggered when a particular notification has been received in foreground
       * */

      this.notificationListener = firebase
        .notifications()
        .onNotification(notification => {
          const { title, body, data, notificationId } = notification
          const localNotification = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true
          })
            .setNotificationId(new Date().valueOf().toString())
            .setTitle(title)
            .setSound('default')
            .setBody(body)
            .setData({
              now: new Date().toISOString(),
              payload: data
            })
            .android.setAutoCancel(true)
            .android.setBigText(body)
            // .android.setLargeIcon('ic_launchers')
            .android.setVibrate(1000)
            .android.setColor('#74c900')
            .android.setColorized(true)
            .android.setChannelId(channel.channelId) // e.g. the id you chose above
            // .android.setSmallIcon('ic_launchers') // create this icon in Android Studio
            .android.setPriority(firebase.notifications.Android.Priority.High)

          firebase
            .notifications()
            .displayNotification(localNotification)
        })

      /*
       * If your app is in background, you can listen for when a notification is
       * clicked / tapped / opened as follows:
       * */
      this.notificationOpenedListener = firebase
        .notifications()
        .onNotificationOpened(notificationOpen => {
          const { title, body, data } = notificationOpen.notification
          console.log('open screen', { title, body, data })
          switch (data.screen) {
            case 'web':
              return this.props.navigation.navigate('Web')
            default:
              break
          }

          firebase
            .notifications()
            .removeDeliveredNotification(
              notificationOpen.notification.notificationId
            )
        })

      /*
       * If your app is closed, you can check if it was opened by a notification
       * being clicked / tapped / opened as follows:
       * */
      firebase
        .notifications()
        .getInitialNotification()
        .then(notificationOpen => {
          if (notificationOpen) {
            const { title, body, data } = notificationOpen.notification
            console.log('closed screen', { title, body, data })
            switch (data.screen) {
              case 'web':
                return this.props.navigation.navigate('Web')
              default:
                break
            }
          }
        })

      /*
       * Triggered for data only payload in foreground
       * */
      this.messageListener = firebase.messaging().onMessage(message => {
        // process data message
        console.log(JSON.stringify(message))
      })
    } catch (error) {}
  }

  render () {
    return null
  }
}

export default Notification
