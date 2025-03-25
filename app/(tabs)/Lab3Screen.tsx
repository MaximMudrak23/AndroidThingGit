import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated } from 'react-native';
import { useMessageStore } from '@/store/messageStore';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';

export default function Lab3Screen() {
    const { setMessage } = useMessageStore();
    const router = useRouter();
    const [message, setLocalMessage] = useState<string>('');

    const handleSendMessage = () => {
        setMessage(message);
        router.push('/Lab3Taker');
        setLocalMessage('');
    };

    const handleSendToEmail = () => {
        const email = 'example@gmail.com';
        const subject = 'Повідомлення з додатку';
        const body = message;
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
        Linking.openURL(url);
    };

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
        <TextInput 
            style={styles.input}
            placeholder='Введіть ваше повідомлення'
            value={message}
            onChangeText={setLocalMessage}
        />
        <View style={[styles.view]}>
            <TouchableOpacity style={styles.button} onPress={handleSendMessage}><Text>Надіслати на іншу сторінку</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSendToEmail}><Text>Надіслати на пошту</Text></TouchableOpacity>
        </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        width: '90%',
        marginBottom: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
    },
    view: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5',
    }
});
