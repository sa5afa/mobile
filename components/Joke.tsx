import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import Expo's icon library

export interface JokeProps {
    author: string;
    joke: string;
    categories: string[];
}

const JokeDetails = ({ author, joke, categories }: JokeProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.author}>
        <MaterialIcons name="person" size={20} color="#333" /> المؤلف: {author}
      </Text>
      <Text style={styles.joke}>
        <MaterialIcons name="insert-emoticon" size={20} color="#555" /> النكتة: {joke}
      </Text>
      <Text style={styles.categories}>
        <MaterialIcons name="category" size={20} color="#888" /> الفئات: {categories.join(', ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF9C4',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  author: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  joke: {
    fontSize: 20,
    marginVertical: 10,
    fontStyle: 'italic',
    color: '#555',
  },
  categories: {
    fontSize: 18,
    color: '#888',
    marginTop: 5,
  },
});

export default JokeDetails;
