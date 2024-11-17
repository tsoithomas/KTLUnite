import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import HeaderSemiCircle from '@/components/HeaderSemiCircle';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <HeaderSemiCircle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column", 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
