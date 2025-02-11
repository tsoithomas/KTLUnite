import { createRef, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from "react-i18next";
import { View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import WebView from 'react-native-webview';
import HeaderSemiCircle from '@/components/HeaderSemiCircle';

export default function ActivitiesScreen() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme || "light"];

	const params = useLocalSearchParams<{ reloadKey: string }>();
	const [reloadKey, setReloadKey] = useState(0);
	const { width, height } = Dimensions.get('window');
	const [loading, setLoading] = useState(true);
	const webViewRef = createRef<WebView>();

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
            source={{ uri: 'https://www.ktls.edu.hk/news/alumni/' }}
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
