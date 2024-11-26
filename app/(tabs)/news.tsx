import { ActivityIndicator, Dimensions, StyleSheet, Text } from 'react-native';
import { View } from '@/components/Themed';
import HeaderSemiCircle from '@/components/HeaderSemiCircle';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { router, useLocalSearchParams } from 'expo-router';
import { createRef, useEffect, useState } from 'react';

export default function NewsScreen() {
	const params = useLocalSearchParams<{ reloadKey: string }>();
	const [reloadKey, setReloadKey] = useState(0);
	const { width, height } = Dimensions.get('window');
	const [loading, setLoading] = useState(true);
	const webViewRef = createRef<WebView>();
	
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

	const hideSpinner = () => {
		setLoading(false);
	}

	useEffect(() => {
		let newReloadKey = Number(params.reloadKey);
		if (newReloadKey > reloadKey) {
			setLoading(true);
			setReloadKey(newReloadKey);
		}
	}, [params.reloadKey]);

	return (
		<View style={styles.container}>
			<HeaderSemiCircle style={styles.headerSemiCircle} />
			<WebView
				ref={webViewRef}
				key={reloadKey}
				style={styles.webView}
				source={{ uri: 'https://www.ktls.edu.hk/news/app/' }}
				onMessage={handleMessage}
				onLoad={() => hideSpinner()}
			/>
			{loading && (
				<ActivityIndicator
					style={[styles.webView, { position: "absolute", top: height / 2 - 100, left: width / 2 - 12 }]}
					size="large"
					/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		position: 'relative',
	},
	header: {
		flexShrink: 1,
	},
	headerSemiCircle: {
		position: "absolute", 
		top: 0, 
		left: 0, 
		width: 402, 
		height: 23,
		zIndex: 1,
	},
	webView: {
		flex:1,
		flexGrow: 1,
	}
});
