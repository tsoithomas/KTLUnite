import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import HeaderSemiCircle from '@/components/HeaderSemiCircle';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

import { Stack, router } from 'expo-router';

export default function NewsScreen() {
  const navigation = useNavigation();
	const handleMessage = (event: WebViewMessageEvent) => {
		const url = event.nativeEvent.data;
		router.push({
			pathname: '/modal',
			params: {
				title: 'School News',
				url: url,
			}
		});
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
