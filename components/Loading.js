import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native'

export default class Loading extends React.Component {
  render(){
    return(
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#808080"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    paddingTop: '5%',
    justifyContent: "center"
  }
});
