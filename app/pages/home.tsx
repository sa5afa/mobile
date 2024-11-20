import { StyleSheet, View, Text, Button } from 'react-native';

export default function HomeScreen() {
  const handlePress = () => {
    alert('Button pressed!');
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
