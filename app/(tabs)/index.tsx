import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function HomeScreen() {
  const animatedValue = useRef(new Animated.Value(0)).current; // Используем useRef

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const bgColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#ff9a9e', '#fad0c4', '#FF8800'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <TouchableOpacity style={styles.button} onPress={() => console.log('zxczxc')}>
        <Text style={styles.text}>zxc</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'black',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
