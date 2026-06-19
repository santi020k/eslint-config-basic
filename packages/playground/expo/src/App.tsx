import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  }
})

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Expo Playground</Text>
    </View>
  )
}
