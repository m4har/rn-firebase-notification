import firebase from 'react-native-firebase'
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase'

export default async (message: RemoteMessage) => {
  // handle your message
  const { title, body, screen } = message.data
  const channel = new firebase.notifications.Android.Channel(
    'prestisa_partner2',
    'prestisa notification2',
    firebase.notifications.Android.Importance.Max
  )
    .setSound('default')
    .enableLights(true)
    .enableVibration(true)
  firebase.notifications().android.createChannel(channel)
  const newNotification = new firebase.notifications.Notification({
    sound: 'default'
  })
    .setNotificationId(message.messageId)
    .setTitle(title)
    .setBody(body)
    .setSound('default')
    .setData({ screen })
    .android.setChannelId(channel.channelId)
    .android.setAutoCancel(true)
    // .android.setSmallIcon('ic_launcher')
    // .android.setLargeIcon('ic_launcher')
    .android.setCategory(firebase.notifications.Android.Category.Alarm)
    // .android.channelId(channel.channelId)

  firebase.notifications().android.createChannel(channel)
  firebase.notifications().displayNotification(newNotification)
  return Promise.resolve()
}
