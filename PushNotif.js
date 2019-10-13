import PushNotification from 'react-native-push-notification';

import config from './Config';

export default PushNotif = {
  fetchNotification() {
    fetch(config.server_url + '/api/notifications', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_key: config.app_key
      })
    }).then((resp) => resp.json()).then((response) => {
      if(response.message !== null) {
        PushNotification.localNotification({
          title: 'Tomas Claudio College Voting App',
          message: response.message
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }
};
