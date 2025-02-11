import { createRef, useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Platform, Share, useColorScheme } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTranslation } from "react-i18next";
import WebView from 'react-native-webview';

export default function ModalScreen() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme || "light"];

	const params = useLocalSearchParams<{ url: string, title: string, shareKey: string }>();
	const { width, height } = Dimensions.get('window');
	const navigation = useNavigation();
	const webViewRef = createRef<WebView>();
	const [loading, setLoading] = useState(true);
	const [reloadKey, setReloadKey] = useState(0);
	const [url, setUrl] = useState('');

	useLayoutEffect(() => {
		if (params.title) {
			navigation.setOptions({ 
				title: params.title,
			});
		}
	}, [params.url, navigation]);

	useEffect(() => {
		if (params.shareKey) {
			const originalUrl = url.substring(0, url.indexOf('?')) || url;
			console.log('Sharing ' + originalUrl);

			shareWebAddress(originalUrl);
			
			// Sharing.shareAsync(originalUrl, {
			// 	dialogTitle: 'sharing', 
			// 	mimeType: 'text/plain', 
			// 	UTI: 'public.url'
			// });
		}
	}, [params.shareKey]);

	const shareWebAddress = async(url: string) => {
		try {
			await Share.share(
				Platform.select({
					ios: { url: url }, 
					android: { message: url }, 
					default: { message: url }
				})
			);
		}
		catch (error) {
			console.error("Error sharing the web address:", error);
		}
	}
	
	useEffect(() => {
		if (params.url && params.url.startsWith('http')) {
			setUrl(params.url + '?src=app');
		}
	}, [params.url]);

	const hideSpinner = () => {
		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<WebView
				ref={webViewRef}
				key={reloadKey}
				style={styles.webView}
				source={{ uri: url }}
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
	webView: {
	  flex:1,
	  flexGrow: 1,
	},
});