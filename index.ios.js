/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

var simpleStore = require('react-native-simple-store');


var asyncTest2 = React.createClass({

  getInitialState: function(){

      this.holderArray = [];

      return {
          words: '',
          daArray: [],
          savedArray: []
      };
  },

  componentWillMount: function(){
      //console.log("Component Mounted");

      var _this = this;

      this.getArray();

      this.checkStore();

      if(!this.checkStore()) {
        simpleStore.save('theArray', {
          arra: []
        })
      } else {
        simpleStore.get('theArray')
        .then(theArray => {
            var addArray = theArray.arra;
            console.log("Old array " + addArray);
            combined = this.holderArray.concat(addArray);
            _this.holderArray = combined;
        })
      }


      // simpleStore.get('theArray')
      // .then(theArray => {
      //     console.log("This is the saved array " + theArray.arra);
      // });

     // var newArray = this.holderArray.concat(saved);
     // this.holderArray = newArray;
  },

  checkStore: function(){
      return simpleStore.get('theArray') !== null
  },

  sendToStorage: function(){
      //this.holderArray.concat(this.state.words)
     // console.log("Yea submit it working")
      this.holderArray.push(this.state.words)
      //console.log(this.holderArray)

      simpleStore.update('theArray', {
        arra: this.holderArray
      })

      this.setState({
        daArray: this.holderArray
      });
  },

  getArray: function(){
      simpleStore.get('theArray')
        .then(theArray => {
            this.setState({
                savedArray: theArray.arra
            });
        }) 
        .catch(error => {
          console.log(error.message);
        }); 
  },

  componentWillUpdate: function(nextProps, nextState){
      if(nextState !== this.state) {
        this.getArray();
      }
  },

  render: function() {

    var finalArray = this.state.daArray.map(function(obj){
        return ( <Text key={Math.random() * (1000 - 10) + 10}> {obj} </Text> );
    });

    var finalSaved = this.state.savedArray.map(function(obj){
        return ( <Text key={Math.random() * (2000 - 1010) + 1010} > {obj} </Text>);
    });

    return (
      <View style={styles.container}>
          <View style={styles.arrayContainer}>
            <View style={styles.halfSpace}>
                {finalArray}
            </View>
            <View style={styles.halfSpace}>
              {finalSaved}
            </View>
          </View>
          <View>
            <TextInput
                style={styles.formInput}
                onSubmitEditing={() => this.sendToStorage()}
                onChangeText={(text) => this.setState({words: text })}
                value={this.state.text}
            />
          </View>

      </View>
    );
  }


});

var styles = StyleSheet.create({
  container: {
      padding: 30,
      flex: 1,
      justifyContent: "center",
      alignItems: "stretch",
      backgroundColor: "#F5FCFF",
  },
  arrayContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  halfSpace: {
    flex: 1
  },
  formInput: {
    flex: 1,
    height: 26,
    fontSize: 13,
    borderWidth: 2,
    borderColor: "#555555",
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('asyncTest2', () => asyncTest2);
