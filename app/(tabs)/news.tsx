import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import HeaderSemiCircle from '@/components/HeaderSemiCircle';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

export default function NewsScreen() {
	const handleMessage = (event: WebViewMessageEvent) => {
		const message = event.nativeEvent.data;
		console.log('Message from WebView:', message);
	};

  return (
	<View style={styles.container}>
		<HeaderSemiCircle  />
		<WebView
			style={styles.webView}
			source={{ uri: 'https://www.ktls.edu.hk/news/app/' }}
			onMessage={handleMessage}
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
