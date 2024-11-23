import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface JokeProps {
    author:string;
    joke:string;
    categories: string[]
}

const JokeDetails = ({ author, joke, categories }: JokeProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.author}>Author: {author}</Text>
      <Text style={styles.joke}>Joke: {joke}</Text>
      <Text style={styles.categories}>Categories: {categories.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  author: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  joke: {
    fontSize: 16,
    marginVertical: 8,
  },
  categories: {
    fontSize: 14,
    color: 'gray',
  },
});

export default JokeDetails;
