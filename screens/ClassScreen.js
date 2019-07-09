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
const cheerio = require('react-native-cheerio');

export default class ClassScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    classList: [],
    currentClass: 'no class',
    isLoadingComplete: false
  }

  getClassList = async() =>{
    let link = this.props.navigation.getParam('link', 'error');
    const resp = await fetch(link);
    try{
      const $ = cheerio.load(resp._bodyInit);
      let tempClass = [];
      $('.ccchildpage').each((i,post) => {
        tempClass.push({
          title: $(post).find('h3').text().replace(/\s\s+/g, '').trim(),
          link: $(post).find('a.ccpage_title_link').attr('href')
        })
      });

      this.setState({
        classList: tempClass,
        currentClass: this.state.currentClass,
        isLoadingComplete: true
      });
    }
    catch(e){
      console.log(e);
      alert('Error: Cannot connect to server!');
    }
  }

  componentDidMount(){
    this.getClassList();
  }

  buttonList() {
    return this.state.classList.map((data,i) => {
      return (
        <View key={i} style={{paddingBottom:'2%'}}>
          <Button onPress={()=> this.setState({
            classList: this.state.classList,
            currentClass: this.loadClass(data.link),
            isLoadingComplete: false
          })} title={data.title}/>
        </View>
      );
    })
  }

  renderClassList(){
    const {navigate} = this.props.navigation;
    return this.state.currentClass.classes.map((item, i) => {
      return(
        <View key={i}>
          <ListItem title={item.title} onPress={()=>navigate('Player',{
            uri: item.link,
            title: item.title
          })} rightIcon={<TabBarIcon name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
          />}
          titleStyle={{fontSize:14}} bottomDivider={true} topDivider={true}/>
        </View>
      );
    })
  }

  loadClass = async(link)=>{
    const resp = await fetch(link);
    try{
      let thisClass = {};
      var $ = cheerio.load(resp._bodyInit);
      thisClass.title = $('h1.entry-title').text().replace(/\s\s+/g, '').trim();
      thisClass.desc = $('span.tablepress-table-description').text().replace(/\s\s+/g, '').trim();
      thisClass.classes = [];
      let x = 0;
      $('tbody').find('tr').each((i,post)=>{
        if (x<5 && $(post).find('td.column-2').text()!='') {
          x++;
          thisClass.classes.push({
            title: $(post).text().replace(/\s\s+/g, '').trim(),
            link: $(post).find('td.column-2 a').attr('href')
          })
        }
      });
      this.setState({
        classList: this.state.classList,
        currentClass: thisClass,
        isLoadingComplete: true
      });
    }
    catch(e){
      console.log(e);
      alert('Error connecting to server!');
    }
  }

  render() {
    if (this.state.isLoadingComplete) {
      if (this.state.currentClass == 'no class') {
        return(
          <View style={styles.container}>
            <ThisHeader navigation={this.props.navigation}/>
            <ScrollView>
              <View style={styles.container}>
              {
                this.buttonList()
              }
              </View>
            </ScrollView>
          </View>
        );
      }
      else {
        return(
          <View style={styles.container}>
            <ThisHeader navigation={this.props.navigation}/>
            <View>
              <ScrollView contentContainerStyle={{justifyContent: 'space-between'}}>
                <Text style={styles.title}>{this.state.currentClass.title}</Text>
                <Text style={styles.txt}>{this.state.currentClass.desc}</Text>
                {
                  this.renderClassList()
                }
                <Button onPress={()=>this.setState({
                  classList: this.state.classList,
                  currentClass: 'no class',
                  isLoadingComplete: true
                })} title={'Go Back'}/>
              </ScrollView>
            </View>
          </View>
        );
      }
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
