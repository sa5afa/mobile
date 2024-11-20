import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const handlePress = async () => {
    const jokeKey = 'joke_expires';

    try {
      // Retrieve the expiration time from AsyncStorage
      const storedExpiration = await AsyncStorage.getItem(jokeKey);

      if (storedExpiration) {
        const expirationDate = new Date(storedExpiration);
        const now = new Date();

        // Check if the current time is past the expiration time
        if (now < expirationDate) {
          Alert.alert('Error', 'روح اشتغل يا فاضي!! تعالى لنا بكرة');
          return;
        }
      }

      // Set a new expiration date to midnight the next day
      const newExpiration = new Date();
      newExpiration.setHours(24, 0, 0, 0); // Midnight the next day
      await AsyncStorage.setItem(jokeKey, newExpiration.toISOString());

      // Show the joke or success message
      alert('Button pressed! Joke generated.');
    } catch (error) {
      console.error('Error handling joke press:', error);
      Alert.alert('Error', 'حدث خطأ، حاول مرة أخرى لاحقاً.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>سخافة</Text>
      <Button title="سخف عليا" onPress={handlePress} color="green" />
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
