import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import BulletinScreen from '../screens/BulletinScreen';
import ContactScreen from '../screens/ContactScreen';
import ClassesScreen from '../screens/ClassesScreen';
import ClassScreen from '../screens/ClassScreen';
import PostScreen from '../screens/PostScreen';
import PlayerScreen from '../screens/PlayerScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Post: PostScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

const BulletinStack = createStackNavigator({
  Bulletin: BulletinScreen,
});

BulletinStack.navigationOptions = {
  tabBarLabel: 'Bulletin',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-document' : 'md-document'}
    />
  ),
};

const ContactStack = createStackNavigator({
  Contact: ContactScreen,
});

ContactStack.navigationOptions = {
  tabBarLabel: 'Contact Us',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-call' : 'md-call'}
    />
  ),
};

const ClassesDrawer = createDrawerNavigator({
  Classes_Home: {
    screen: ClassesScreen,
    navigationOptions: {
      drawerLabel: 'Classes Home'
    }
  },
  Class: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Bible / Chumash',
    },
    params: {
      name: 'Bible',
      link: 'http://westmountshul.com/online-learning/audio-archive/bible-chumash/'
    }
  },
  Class2: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Bilavi Series'
    },
    params: {
      name: 'Bilavi',
      link: 'http://westmountshul.com/online-learning/audio-archive/bilvavi/'
    }
  },
  Class3: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Chasidus'
    },
    params: {
      name: 'Chasidus',
      link: 'http://westmountshul.com/online-learning/audio-archive/chasidus/'
    }
  },
  Class4: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Halacha / Jewish Law'
    },
    params: {
      name: 'Halacha',
      link: 'http://westmountshul.com/online-learning/audio-archive/halacha-jewish-law/'
    }
  },
  Class5: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Hashkafa / Philosophy'
    },
    params: {
      name: 'Hashkafa',
      link: 'http://westmountshul.com/online-learning/audio-archive/hashkafa-philosophy/'
    }
  },
  Class6: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Holidays and Seasonal'
    },
    params: {
      name: 'Holidays',
      link: 'http://westmountshul.com/online-learning/audio-archive/holidays-and-seasonal/'
    }
  },
  Class7: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Prayer'
    },
    params: {
      name: 'Prayer',
      link: 'http://westmountshul.com/online-learning/audio-archive/prayer/'
    }
  },
  Class8: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Prophets and Writings'
    },
    params: {
      name: 'Prophets',
      link: 'http://westmountshul.com/online-learning/audio-archive/prophets-and-writings/'
    }
  },
  Class9: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Relationships'
    },
    params: {
      name: 'Rambam',
      link: 'http://westmountshul.com/online-learning/audio-archive/relationships/'
    }
  },
  Class10: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Shabbos'
    },
    params: {
      name: 'Shabbos',
      link: 'http://westmountshul.com/online-learning/audio-archive/shabbos/'
    }
  },
  Class11: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Talmud'
    },
    params: {
      name: 'Talmud',
      link: 'http://westmountshul.com/online-learning/audio-archive/talmud/'
    }
  },
  Class12: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Teshuva'
    },
    params: {
      name: 'Teshuva',
      link: 'http://westmountshul.com/online-learning/audio-archive/teshuva/'
    }
  }
});

ClassesDrawer.navigationOptions = {
  header: null
}

const ClassesStack = createStackNavigator({
  Classes: ClassesDrawer,
  Player: PlayerScreen
});

ClassesStack.navigationOptions = {
  tabBarLabel: 'Classes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
    focused = {focused}
    name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  BulletinStack,
  ClassesStack,
  ContactStack,
});
