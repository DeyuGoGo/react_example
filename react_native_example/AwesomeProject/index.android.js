/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  TextInput,
  ListView,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  View,
} = React;
var REQUEST_URL2 = 'http://104.155.238.153:3000/api/comments';
var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL2)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },
  postMessage: function( autohr , message) {
    fetch(REQUEST_URL2,{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: autohr,
        text: message,
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },
  _onPressButton: function(){
    this.postMessage(this.state.author , this.state.message);
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}/>
         <TextInput
         placeholder="Enter Name"
         style={styles.inputText}
         onChangeText={(text) => this.setState({author:text})}
         value={this.state.author}/>
         <TextInput
         placeholder="Enter Message"
         style={styles.inputText}
         onChangeText={(text) => this.setState({message:text})}
         value={this.state.message}/>
          <TouchableNativeFeedback
        onPress={this._onPressButton}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
        <Text style={{margin: 30}}>Button</Text>
      </View>
    </TouchableNativeFeedback>
      </View>
    );
  },
  renderMovie: function(message) {
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.author}>{message.author}
          </Text>
          <Text style={styles.message}>{message.text}</Text>
        </View>
      </View>
    );
  },
  renderLoadingView: function(){
    return(
            <View style={styles.container}>
            <Text style={styles.author}>Loading</Text>
            </View>
      )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  author: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  inputText: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    flex: 1,
    fontSize: 13,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
