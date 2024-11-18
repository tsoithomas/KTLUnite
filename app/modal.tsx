import { ActivityIndicator, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import WebView from 'react-native-webview';
import { useLayoutEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ModalScreen() {
	const params = useLocalSearchParams<{ url: string, title: string }>();
	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);

	useLayoutEffect(() => {
		navigation.setOptions({ 
			title: params.title || '',
		});
	  }, [params, navigation]);

	let postUrl = params.url + '?src=app';

	return (
		<View style={styles.container}>
		{loading && (
			<View style={styles.loadingOverlay}>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
		)}
		<WebView
			style={styles.webView}
			source={{ uri: postUrl }}
			onLoadStart={() => setLoading(true)} // Show loading spinner
			onLoadEnd={() => setLoading(false)} // Hide loading spinner
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
	},
	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly transparent background
	},
});