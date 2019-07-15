import React from 'react';
import firebase from 'react-native-firebase';

class Notification extends React.Component {
  componentDidMount() {
    this.createNotificationListeners();
  }
  createNotificationListeners() {
    try {
      const channel = new firebase.notifications.Android.Channel(
        'fcm_default_channel',
        'Demo app name',
        firebase.notifications.Android.Importance.High
      )
        .setDescription('Demo app description')
        .setSound('teleporter.wav');
      firebase.notifications().android.createChannel(channel);
      /*
       * Triggered when a particular notification has been received in foreground
       * */

      this.notificationListener = firebase
        .notifications()
        .onNotification(notification => {
          const { title, body, data, notificationId } = notification;
          const localNotification = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
            show_in_background: true,
            opened_from_tray: true,
          })
            // .setSound('teleporter.wav')
            .setNotificationId(notificationId)
            .setTitle(title)
            // .setSubtitle(notification.subtitle)
            .setBody(body)
            .setData(data)
            .android.setBigPicture(data.image)
            .android.setChannelId(channel.channelId) // e.g. the id you chose above
            // .android.setSmallIcon('@mipmap/ic_stat_paninbank_app_icon') // create this icon in Android Studio
            .android.setColor('#000000'); // you can set a color here
          // .android.setPriority(firebase.notifications.Android.Priority.High);

          firebase
            .notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));
          firebase
            .notifications()
            .removeDeliveredNotification(localNotification.notificationId);
        });

      /*
       * If your app is in background, you can listen for when a notification is
       * clicked / tapped / opened as follows:
       * */
      this.notificationOpenedListener = firebase
        .notifications()
        .onNotificationOpened(notificationOpen => {
          const { title, body, data } = notificationOpen.notification;
          console.log('open screen', { title, body, data });
          switch (data.screen) {
            case 'web':
              return this.props.navigation.navigate('Web')          
            default:
              break;
          }

          firebase
            .notifications()
            .removeDeliveredNotification(
              notificationOpen.notification.notificationId
            );
        });

      /*
       * If your app is closed, you can check if it was opened by a notification
       * being clicked / tapped / opened as follows:
       * */
      firebase
        .notifications()
        .getInitialNotification()
        .then(notificationOpen => {
          if (notificationOpen) {
            const { title, body, data } = notificationOpen.notification;
            console.log('closed screen', { title, body, data });
            switch (data.screen) {
              case 'web':
                return this.props.navigation.navigate('Web')          
              default:
                break;
            }
          }
        });

      /*
       * Triggered for data only payload in foreground
       * */
      this.messageListener = firebase.messaging().onMessage(message => {
        //process data message
        console.log(JSON.stringify(message));
      });
    } catch (error) {}
  }
  render() {
    return null;
  }
}

export default Notification;
