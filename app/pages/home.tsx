import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { useState } from 'react';
import JokeDetails, { JokeProps } from '@/components/Joke'; // Import the Joke component

export default function HomeScreen() {
  const [joke, setJoke] = useState<JokeProps | null>(null);

  const fetchjoke = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/sa5afa/api/refs/heads/main/jokes.json'); // Replace with your actual API URL
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomJoke = data[randomIndex];
      setJoke(randomJoke); // Set joke to state
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
