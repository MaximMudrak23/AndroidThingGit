import { Text, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useMessageStore } from '@/store/messageStore';

export default function Lab3Taker() {
    const { message } = useMessageStore();

  const animatedValue = useRef(new Animated.Value(0)).current;

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
      <Text style={styles.text}>Ваше повідомлення:</Text>
      <Text style={[styles.text, {marginTop: 5}]}>{`"${message}"`}</Text>
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
});