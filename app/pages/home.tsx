import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Simple Screen!</Text>
      <Text>
        This is a simplified version of the Home Screen.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A1CEDC', // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
