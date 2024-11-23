import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import JokeDetails, { JokeProps } from '@/components/Joke'; // Import the Joke component

export default function HomeScreen() {
  const [joke, setJoke] = useState<JokeProps | null>(null);
  const [jokeFetchedToday, setJokeFetchedToday] = useState<boolean>(false);

  useEffect(() => {
    const loadJoke = async () => {
      const storedJoke = await AsyncStorage.getItem('joke');
      const fetchedToday = await AsyncStorage.getItem('jokeFetchedToday');
      const fetchTime = await AsyncStorage.getItem('fetchTime');

      const currentTime = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (fetchTime && (currentTime - parseInt(fetchTime)) > twentyFourHours) {
        // Clear storage if more than 24 hours have passed
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
      Alert.alert('Info', 'لقد حصلت على نكتة اليوم بالفعل. حاول مرة أخرى غداً.');
      return;
    }

    try {
      const response = await fetch('https://raw.githubusercontent.com/sa5afa/api/refs/heads/main/jokes.json'); // Replace with your actual API URL
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomJoke = data[randomIndex];
      setJoke(randomJoke); // Set joke to state
      setJokeFetchedToday(true); // Mark that a joke has been fetched today

      // Store the joke, the fetched status, and the fetch time in AsyncStorage
      await AsyncStorage.setItem('joke', JSON.stringify(randomJoke));
      await AsyncStorage.setItem('jokeFetchedToday', JSON.stringify(true));
      await AsyncStorage.setItem('fetchTime', new Date().getTime().toString());
    } catch (error) {
      console.error('Error fetching joke:', error);
      Alert.alert('Error', 'حدث خطأ، حاول مرة أخرى لاحقاً.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>سخافة</Text>
      {joke && (
        <JokeDetails author={joke.author} joke={joke.joke} categories={joke.categories} />
      )}
      <Button title="سخف عليا" onPress={fetchjoke} color="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
