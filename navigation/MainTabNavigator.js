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
      name: 'Bible'
    }
  },
  Class2: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Bilavi Series'
    },
    params: {
      name: 'Bilavi'
    }
  },
  Class3: {
    screen: ClassScreen,
    navigationOptions: {
      drawerLabel: 'Chasidus'
    },
    params: {
      name: 'Chasidus'
    }
  }
});

ClassesDrawer.navigationOptions = {
  header: null
}

const ClassesStack = createStackNavigator({
  Classes: ClassesDrawer
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
