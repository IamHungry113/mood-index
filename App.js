/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  Text,
  useColorScheme,
  Image,
  View,
} from 'react-native';

const User = ({avarage, username})=>{
  return (
      <View style={{
        backgroundColor: 'white',
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        height: 200,
        shadowColor: 'rgba(0,0,0,0.8)',
        elevation: 20,
        padding: 26,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.01)',
      }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: 36,
          lineHeight: 36,
          justifyContent: 'center',
        }}>
          <Image source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
            height: 36,
            width: 36,
          }} ></Image>
          <Text style={{
            marginLeft: 8,
            height: 24,
            lineHeight: 24,
          }}>{username}</Text>
        </View>
        <View style={{
        }}>
          <Text style={{
            fontSize: 56,
            fontWeight: 'bold',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 8,
          }}>{avarage}</Text>
          <Text style={{
            marginTop: 8,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>周平均心情指数</Text>
        </View>
      </View>
  )
}

const ProcessContent = ({values, })=>{
  return (
    <View style={{
      height: 248,
      backgroundColor: 'white',
    }}>

    </View>
  )

}


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{
      display: 'flex',
      flex: 1,
    }}>
      <StatusBar barStyle={'light-content'} />
      <View style={{
        height: 36,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 24,
      }}>
        <Icon name='arrowleft' size={24} style={{
          height: 24,
          width: 24,
          marginLeft: 8,
        }}></Icon>
        <Text style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          fontWeight: 'bold',
        }}>历史心情指数</Text>
      </View>
      <View style={{
        display: 'flex',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        padding: 8,
        paddingTop: 16,
      }}>
        <User avarage={88} username={'李强'}></User>
        <ProcessContent></ProcessContent>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadowProp: getShadow('rgba(0,0,0,0.2)', -2, 4, 0.2, 3, 20),
});
function getShadow(color, width, height, shadowOpacity, shadowRadius, elevation ){
  if(Platform.OS === 'ios'){
    return {
      shadowColor: color,
      shadowOffset: { width, height},
      shadowOpacity,
      shadowRadius,
    }
  } else if( Platform.OS === 'android'){
    return {
      elevation,
      shadowColor: color,
    }
  }
}

export default App;
