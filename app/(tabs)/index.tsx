import { useState, useEffect, useRef } from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const router = useRouter();

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

  const [selectedHero, setSelectedHero] = useState('Invoker');

  const heroImages: { [key: string]: any } = {
    'Invoker': require('../../assets/images/invoker.png'),
    'Phantom Assassin': require('../../assets/images/phantom.png'),
    'Pudge': require('../../assets/images/pudge.png'),
    'Juggernaut': require('../../assets/images/jugg.png')
  }
  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <Image source={heroImages[selectedHero] || null} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={() => console.log(selectedHero)}>
        <Text numberOfLines={1} style={styles.text}>{selectedHero}</Text>
      </TouchableOpacity>
      <Picker
        selectedValue={selectedHero}
        style={{ height: 80, width: '60%' }}
        onValueChange={(itemValue) => setSelectedHero(itemValue)}>
          <Picker.Item label="Invoker" value="Invoker" />
          <Picker.Item label="Phantom Assassin" value="Phantom Assassin" />
          <Picker.Item label="Pudge" value="Pudge" />
          <Picker.Item label="Juggernaut" value="Juggernaut" />
      </Picker>
      <TouchableOpacity style={{marginTop: 100}} onPress={() => router.push('/Lab3Screen')}>
        <Text style={[styles.text]}>Перейти до вводу повідомлення</Text>
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
  button: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 250,
    height: 150,
    marginBottom: 50,
    borderRadius: 10,
  },
});
