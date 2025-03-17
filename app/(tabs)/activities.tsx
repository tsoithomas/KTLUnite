import { createRef, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from "react-i18next";
import { View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import HeaderSemiCircle from '@/components/HeaderSemiCircle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ActivitiesScreen() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme || "light"];

	const params = useLocalSearchParams<{ reloadKey: string }>();
	const webViewRef = createRef<WebView>();
	const { width, height } = Dimensions.get('window');
	const [reloadKey, setReloadKey] = useState(0);
	const [loading, setLoading] = useState(true);
	const [language, setLanguage] = useState('en-US');

	const handleMessage = (event: WebViewMessageEvent) => {
		const url = event.nativeEvent.data;
		router.push({
			pathname: '/modal',
			params: {
				title: 'Alumni News',
				url: url,
			}
		});
	};

	const hideSpinner = () => {
		setLoading(false);
	}

	const loadLanguage = async () => {
		let lang = await AsyncStorage.getItem("language");
		setLanguage(lang ?? 'en-US');
	};
	
	useFocusEffect(
		useCallback(() => {
			loadLanguage();
			return () => {};
		}, [])
	);

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
				source={{ uri: language == 'en-US' ? 'https://www.ktls.edu.hk/news/alumni/' : 'https://www.ktls.edu.hk/zh/news-zh/alumni/' }}
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
