import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface JokeProps {
    author: string;
    joke: string;
    categories: string[];
}

const JokeDetails = ({ author, joke, categories }: JokeProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.author}>المؤلف: {author}</Text>
      <Text style={styles.joke}>النكتة: {joke}</Text>
      <Text style={styles.categories}>الفئات: {categories.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
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
    alignItems: 'flex-end', // Align text to the right
  },
  author: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  joke: {
    fontSize: 18,
    marginVertical: 10,
    fontStyle: 'italic',
    color: '#555',
  },
  categories: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
});

export default JokeDetails;
