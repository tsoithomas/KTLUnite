import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import HeaderSemiCircle from '@/components/HeaderSemiCircle';
import WebView from 'react-native-webview';

export default function ActivitiesScreen() {
  return (
    <View style={styles.container}>
      <HeaderSemiCircle  />
      <WebView
        style={styles.webView}
        source={{ uri: 'https://www.ktls.edu.hk/news/alumni/' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
	  flexShrink: 1,
  },
  webView: {
    flex:1,
    flexGrow: 1,
  }
});
