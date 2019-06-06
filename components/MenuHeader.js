import React from 'react';
import {Text, Image, View, StyleSheet, Platform,TouchableHighlight} from 'react-native';
import { MonoText } from './StyledText';
import TabBarIcon from './TabBarIcon';
import {Header} from 'react-native-elements';
/*
<View style={styles.header}>
  <TabBarIcon name={Platform.OS === 'ios' ? 'ios-arrow-round-back' : 'md-arrow-round-back'} style={styles.headIcon}/>
    <Image source = {require('../assets/images/westmount-logo.png')} style={styles.welcomeImage}/>
</View>
*/
export default class ThisHeader extends React.Component {

  _press = (navigation) =>{
    navigation.navigate('Drawer');
    navigation.toggleDrawer();
  }

  render(){
    const {goBack} = this.props.navigation;
    return(
      <Header
      leftComponent={
        <View style={{paddingBottom: 20, paddingLeft: 10}} hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
          <TouchableHighlight onPress={() => this._press(this.props.navigation) }>
            <TabBarIcon name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'} style={{color: '#1874CD'}}/>
          </TouchableHighlight>
        </View>
      }
      centerComponent={
        <View style={{paddingBottom: 20}}>
          <Image source = {require('../assets/images/westmount-logo.png')} style={styles.welcomeImage}/>
        </View>
      }
      containerStyle={{backgroundColor: 'white'}}
      />
    );
  }
}

const styles = StyleSheet.create({
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
  headIcon: {
  }
});
