import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  PanResponder,
  LayoutAnimation,
} from 'react-native';

var NativeModules = require('NativeModules');
var {UIManager} = NativeModules;

export default function Game2048() {
  return (
    <View>
      <Text>2048</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
