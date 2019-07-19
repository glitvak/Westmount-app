import React from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import { MonoText } from '../components/StyledText';
import {Button, ListItem} from 'react-native-elements';
import ThisHeader from '../components/MenuHeader';
import Loading from '../components/Loading';
import TabBarIcon from '../components/TabBarIcon';
import * as FileSystem from 'expo-file-system';

export default class ClassScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state ={
    classList: [],
    isDeleteMode: false,
    isLoadingComplete:false
  }

  downloadTest(){
    FileSystem.downloadAsync('http://westmountshul.com/wp-content/uploads/Parsha-June-20-2019.mp3',
    FileSystem.documentDirectory+ 'yes.mp3')
      .then(({ uri }) => {
      console.log('Finished downloading to ', uri);
    });
  }

  checkUp(){
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory+'/downloads')
    .then(dir => this.setState({
      classList: dir,
      isDeleteMode: this.state.isDeleteMode,
      isLoadingComplete: true
    }));
  }
  delete(){
    /*
    navigate('Player',{
      uri: FileSystem.documentDirectory+'downloads/slayer.mp3',
      title: item
    })
    */
    FileSystem.deleteAsync(FileSystem.documentDirectory+'slayer.mp3');
    this.checkUp();
  }

  icon(){
    if (Platform.OS === 'ios') {
      if (this.state.isDeleteMode) {
        return 'ios-close';
      }
      else {
        return 'ios-arrow-forward';
      }
    }
    else {
      if (this.state.isDeleteMode) {
        return 'md-close';
      }
      else {
        return 'md-arrow-forward';
      }
    }
  }

  press(item){
    const {navigate} = this.props.navigation;
    if (this.state.isDeleteMode) {
      FileSystem.deleteAsync(FileSystem.documentDirectory+'/downloads/'+item);
      this.checkUp();
    }
    else {
      navigate('Player',{
        uri: FileSystem.documentDirectory+'/downloads/'+item,
        title: item
      });
    }
  }

  renderClassList(){

    const {navigate} = this.props.navigation;
    return this.state.classList.map((item, i) => {
      return(
        <View key={i}>
          <ListItem title={item} onPress={()=>this.press(item)} rightIcon={<TabBarIcon name={this.icon()}
          />} onLongpress={()=> this.delete()} delayLongPress={10}
          titleStyle={{fontSize:14}} bottomDivider={true} topDivider={true}/>
        </View>
      );
    })
  }

  CheckDeleteStatus(){
    if (this.state.isDeleteMode) {
      this.setState({
        classList: this.state.classList,
        isDeleteMode: false,
        isLoadingComplete: this.state.isLoadingComplete
      });
    }
    else {
      this.setState({
        classList: this.state.classList,
        isDeleteMode: true,
        isLoadingComplete: this.state.isLoadingComplete
      });
    }
  }

  componentDidMount(){
    // FileSystem.deleteAsync(FileSystem.documentDirectory+'/downloads/Class330-20June2019ParshasBeha\'alosecha-5779-TheInvertedHistoricalProcessParshaJune202019')
    // this.downloadTest();
    this.checkUp();
  }
  render() {
    if (this.state.isLoadingComplete) {
      return(
        <View style={styles.container}>
          <ThisHeader navigation={this.props.navigation}/>
          <View>
            {
              this.renderClassList()
            }
            <Button onPress={()=> this.CheckDeleteStatus()} title={this.state.isDeleteMode ? 'Done': 'Delete Classes'}/>
          </View>
        </View>
      );
    }
    else {
      return(
        <View>
          <ThisHeader navigation={this.props.navigation}/>
          <Loading/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: "15%" //13%
  },
  contentContainer: {
    flex: 1,
    height: 100
  },
  pickerStyle:{
    height: 150,
    width: "80%",
    color: '#344953',
    justifyContent: 'center',
  },
  title:{
    fontSize: 19,
    color: '#4E443C',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txt: {
    fontSize: 14,
    marginTop: '2%',
    color: '#666',
    paddingHorizontal: '2%'
  }
});
