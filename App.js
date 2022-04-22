/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef, useEffect} from 'react';
import type {Node} from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import LinearGradient  from 'react-native-linear-gradient'
import {
  Animated,
  SafeAreaView,
  StatusBar,
  TouchableHighlight,
  Platform,
  Text,
  Image,
  View,
} from 'react-native';
const MAX_MODE_INDEX = 100



// 延缓下一个节点的动画 中心开始
function DelayedZoom({delay, speed, endScale, startScale, children}) {
  const zoomAnim = useRef(new Animated.Value(startScale)).current;
  useEffect(() => {
    const zoomIn = () => {
      Animated.timing(zoomAnim, {
        delay: delay,
        toValue: endScale,
        duration: speed,
        useNativeDriver: true,
      }).start();
    };
    zoomIn();
  }, [zoomAnim]);

  return (
    <Animated.View
      style={[
        {
          transform: [{scale: zoomAnim}],
        },
      ]}>
      {children}
    </Animated.View>
  );
}

const Week = ({color, index, delay, pressed})=>{
  const bgColor = index === 6 ?'black' : 'white'
  const textColor = index === 6 ? 'white' : (pressed ? color: 'black')
  return (
    <View key={index}  style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
    }}>
      <DelayedZoom delay={delay} speed={600} endScale={1} startScale={0}>
        <View style={{
          height: 24,
          width: 24,
          backgroundColor: bgColor,
          borderRadius: 5,
          elevation: pressed ? 10 : 0,
        }}>
          <Text style={{
            fontWeight: 'bold',
            marginTop: 'auto',
            marginBottom: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: textColor,
          }}>{getWeek(index)}</Text>
        </View>
      </DelayedZoom>
    </View>
  )
}
const getIcon = (value)=>{
  let faceIcon ='meho'
  if (value >= 90){
    faceIcon = 'smile-circle'
  } else if( value === -1){
    faceIcon = 'questioncircle'
  } 
  return faceIcon
}

const getColors = (color)=>{
    const colorMap = new Map([ 
      ['#52c873', ['#9dfd46', '#4ef46d', '#9efd46']],
      ['#ff823c', ['rgba(255,161,75,255)', 'rgba(255,172,74,255)', 'rgba(255,201,75,255)']],
    ])
  return colorMap.get(color) ?? [color, color, color]
}
const Bar = ({pressed, value, delay, width, height})=>{
  if(height === 0)
    return (<View></View>)
  console.log(height)
  const hei = value < 36 ? 36 : value
  const zoomAnim = useRef(new Animated.Value(0)).current;
  const startHei =24 +  (122 - 24) * value / MAX_MODE_INDEX
  const larg = useRef(new Animated.Value(1000)).current;
  const show = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.sequence([
        Animated.timing(zoomAnim, {
          delay: delay,
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(larg, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(show, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        })
    ]).start()
  }, []);
  return (
      <View
        style={{
        display: 'flex',
        flex: 1,
        position: 'relative',
        borderRadius: width,
        justifyContent: 'flex-end',
      }}>
        <Animated.View style={{
          borderRadius: width,
          height: `${hei}%`,
          borderWidth: 2,
          borderColor: pressed ? 'white' : 'transparent',
          overflow: 'hidden',
          elevation: pressed ? 10:0,
          zIndex: 2,
          width,
          position: 'absolute',
          bottom: 0,
        }}>
          <Animated.View style={{
            height: '100%',
            transform: [{
              translateY: larg,
            }]
          }}>
          <LinearGradient 
            style={{
            height: '100%',
            alignItems: 'center',
            borderRadius: width,
            }}
          colors={pressed ? getColors(getTextColor(value)) : [getTextColor(value), getTextColor(value), getTextColor(value)]}>
            <Animated.Text style={{
              position: 'absolute',
              opacity: value === -1 ? 0 : show,
              top: 4,
              zIndex: 1,
              color: 'white',
              fontWeight: 'bold',
            }}>{value}</Animated.Text>
          </LinearGradient>
          </Animated.View>
          <Animated.View style={{
            transform: [{
              scale: zoomAnim,
            }],
            height: width - 4,
            width: width - 4,
            borderWidth: 2, 
            borderRadius: width,
            borderColor: pressed ? 'transparent': getTextColor(value),
            backgroundColor: pressed ? 'transparent': getTextColor(value),
            position: 'absolute',
            zIndex: 1,
            bottom: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Icon size={width - 12} color={'rgba(255, 255, 255, 0.9)'} name={getIcon(value)}></Icon>
          </Animated.View>
        </Animated.View>
      </View>
  )
}


const BarContainer = ({pressed,value, delay, index, width, height})=>{
  return (
    <View style={{
        height: '100%',
        display: 'flex',
        flex: 1,
    }}>
      <Bar pressed={pressed} value={value} delay={delay} index={index} width={width} height={height}></Bar>
      <Week color={getTextColor(value)} index={index} delay={delay} pressed={pressed} >
      </Week>
    </View>
  )
}

const getTextColor=(value)=>{
  let textColor = '#52c873'
  if (value >= 90){
    textColor = '#ff823c'
  } else if( value === -1){
    textColor = '#cfcfcf'
  } 
  return textColor
}

const Item = ({value, index, delay})=>{
  const [pressed, setPress] = useState(false)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  return (
    <TouchableHighlight 
    onLayout={e=>{
      setWidth(e.nativeEvent.layout.width)
      setHeight(e.nativeEvent.layout.height)
    }}
    style={{ 
      flex: 1,
      display: 'flex',
    }}
    underlayColor= {'transparent'}
      onPressIn={()=>{
        setPress(true)
      }}
      onPressOut={()=>{
        setPress(false)
      }}
    >
      <BarContainer index={index} pressed={pressed} value={value} delay={delay} width={width} height={height}></BarContainer>
    </TouchableHighlight>
  )
}



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
        borderBottomWidth: 2,
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

const ProcessContent = ({values, curr})=>{
  const renderItem = (item, index)=>{
    const delay = (index + 1) * 100
    return (
        <View key={index} style={{
          backgroundColor: 'transparent',
          display: 'flex',
          paddingLeft: 3,
          paddingRight: 3,
          flexDirection: 'column',
          flex:1,
        }}>
          <Item value={item} index={index} delay={delay}></Item>
        </View>
      )
  }
  return (
    <View style={{
      height: 248,
      padding: 2,
      backgroundColor: 'white',
    }}>
      <View style={{
        position: 'absolute',
        width: '100%',
        height: 2,
        top: '40%',
        backgroundColor: 'rgba(0,0,0,0.2)',
      }}></View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        flex:1,
      }}>
        {values.map(renderItem)}
      </View>
    </View>
  )

}


const App: () => Node = () => {
  const values = Array(7).fill(null).map((_, index)=>{
    if(index === 3)
        return -1
    return Math.floor(Math.random() * MAX_MODE_INDEX + 1)
  })
  const avarage = Math.round(values.reduce((a,b)=> (a === -1 ? 0 : a) + (b === -1 ? 0 : b)) / values.length)

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
        <User avarage={avarage} username={'李强'}></User>
        <ProcessContent values={values} curr={6}></ProcessContent>
      </View>
    </SafeAreaView>
  );
};

// for android and ios
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
const getWeek = (nu)=>{
    switch(nu){
    case 0:
        return '六'
    case 1:
        return '日'
    case 2:
        return '一'
    case 3:
        return '二'
    case 4:
        return '三'
    case 5:
        return '四'
    case 6:
        return '五'
    default:
      return ''
    }

}
export default App;
