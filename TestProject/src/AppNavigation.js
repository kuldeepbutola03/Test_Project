import {Navigation} from 'react-native-navigation';

export default function homeScreen () {
  Navigation.setRoot ({
    root: {
      stack: {
        children: [
          {
            component: {
              id: 'HomeScreen', // Optional, Auto generated if empty
              name: 'HomeScreen',
              passProps: {
                data: this.state,
              },
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                  animate: false,
                },
              },
            },
          },
        ],
      },
    },
  });
}
