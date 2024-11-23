import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JokeDetails, { JokeProps } from '@/components/Joke';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

export default function HomeScreen() {
  const [joke, setJoke] = useState<JokeProps | null>(null);
  const [jokeFetchedToday, setJokeFetchedToday] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  useEffect(() => {
    const loadJoke = async () => {
      const storedJoke = await AsyncStorage.getItem('joke');
      const fetchedToday = await AsyncStorage.getItem('jokeFetchedToday');
      const fetchTime = await AsyncStorage.getItem('fetchTime');

      const currentTime = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (fetchTime && (currentTime - parseInt(fetchTime)) > twentyFourHours) {
        await AsyncStorage.removeItem('joke');
        await AsyncStorage.removeItem('jokeFetchedToday');
        await AsyncStorage.removeItem('fetchTime');
      }

      if (storedJoke) {
        setJoke(JSON.parse(storedJoke));
      }
      if (fetchedToday) {
        setJokeFetchedToday(JSON.parse(fetchedToday));
      }
    };

    loadJoke();
  }, []);

  const fetchjoke = async () => {
    if (jokeFetchedToday) {
      setModalMessage('لقد حصلت على نكتة اليوم بالفعل. حاول مرة أخرى غداً.');
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch('https://raw.githubusercontent.com/sa5afa/api/refs/heads/main/jokes.json');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomJoke = data[randomIndex];
      setJoke(randomJoke);
      setJokeFetchedToday(true);

      await AsyncStorage.setItem('joke', JSON.stringify(randomJoke));
      await AsyncStorage.setItem('jokeFetchedToday', JSON.stringify(true));
      await AsyncStorage.setItem('fetchTime', new Date().getTime().toString());
    } catch (error) {
      console.error('Error fetching joke:', error);
      setModalMessage('حدث خطأ، حاول مرة أخرى لاحقاً.');
      setModalVisible(true);
    }
  };

  const openLink = () => {
    Linking.openURL('https://adambashaahmednaji.com/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>سخافة</Text>
      {joke && (
        <JokeDetails author={joke.author} joke={joke.joke} categories={joke.categories} />
      )}
      <View style={styles.buttonContainer}>
        <MaterialIcons.Button
          name="mood"
          backgroundColor="#4CAF50"
          onPress={fetchjoke}
        >
          سخف عليا
        </MaterialIcons.Button>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={openLink}>
          <Text style={styles.footerText}>تم الإنشاء بواسطة آدم باشا</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>إغلاق</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEB3B',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    textDecorationLine: 'underline',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
