import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SectionList, StyleSheet, Switch, TouchableOpacity, useColorScheme } from 'react-native';
import { useTranslation } from "react-i18next";
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadLanguage } from "../../i18n/loadLangage";
import HeaderSemiCircle from '@/components/HeaderSemiCircle';
import { useFocusEffect } from '@react-navigation/native';

type UserData = {
	accountId: number;
	name: string;
	memberSince: number;
};

export default function SettingsScreen() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme || "light"];
	const { showActionSheetWithOptions } = useActionSheet();

	const [language, setLanguage] = useState('en-US');
	const [accountId, setAccountId] = useState(0);

	useEffect(() => {
		const loadLanguage = async () => {
			let lang = await AsyncStorage.getItem("language");
			setLanguage(lang ?? 'en-US');
		};
	
		loadLanguage();
	}, []);

	useFocusEffect(
		useCallback(() => {
			loadLoginData();
			return () => {};
		}, [])
	);

	const loadLoginData = async () => {
		const userData = await AsyncStorage.getItem("userData");
		const data = JSON.parse(userData ?? '');
		setAccountId(data.accountId);
	}
	
	useEffect(() => {
		const saveLanguage = async () => {
			await AsyncStorage.setItem("language", language);
			loadLanguage(language);
		};
	
		saveLanguage();
	}, [language]);

	const signIn = () => {
		console.log('sign in');
	}

	const signOut = async () => {
		const userData: UserData = {
			accountId: 0,
			name: '',
			memberSince: 0,
		}

		await AsyncStorage.setItem("userData", JSON.stringify(userData));
		setAccountId(0);
	}

	const selectLanguage = () => {
		const options = ['English', '中文', 'Cancel'];
		const cancelButtonIndex = 2;
	
		showActionSheetWithOptions({options, cancelButtonIndex}, (selectedIndex?: number) => {
			if (selectedIndex === undefined) {
				return;
			}

			switch (selectedIndex) {
				case 0:
					setLanguage('en-US');
					break;
				case 1:
					setLanguage('zh-HK');
					break;
		  }});
	}

	const showTermsOfService = () => {
		router.push({
			pathname: '/terms',
		});
	}
	
	type DataItem =
		| { type: 'button'; key: string; name: string; onPress: () => void; icon?: React.ReactNode }
		| { type: 'switch'; key: string; name: string; isSwitch: true; value: boolean; onValueChange: () => void };

	type Section = {
		title: string;
		data: DataItem[];
	};

	const DATA: Section[] = [
		{
			title: t('settings.interface'),
			data: [
				{ 
					type: 'button',
					key: 'language', 
					name: t('settings.language'), 
					onPress: selectLanguage,
					icon: <MaterialIcons name="language" size={24} color={Colors.light.text} />
				},
			],
		},
		{
			title: t('settings.membership'),
			data: [
				{
					type: 'button',
					key: 'membership',
					name: accountId ? t('settings.signOut') : t('settings.signIn'),
					onPress: () => accountId ? signOut() : signIn(),
					icon: accountId 
						? <MaterialIcons name="logout" size={24} color={Colors.light.text} /> 
						: <MaterialIcons name="login" size={24} color={Colors.light.text} />
				},
			],
		},
		{
			title: t('settings.about'),
			data: [
				{ 
					type: 'button',
					key: 'tos', 
					name: t('settings.termsOfService'), 
					onPress: () => showTermsOfService(),
					icon: <MaterialIcons name="room-service" size={24} color={Colors.light.text} />
				},
				{ 
					type: 'button',
					key: 'pp', 
					name: t('settings.privacyPolicy'), 
					onPress: () => alert('View Privacy Policy'),
					icon: <MaterialIcons name="privacy-tip" size={24} color={Colors.light.text} />
				},
			],
		},
	];

	return (
		<View style={styles.container}>
			<HeaderSemiCircle style={styles.headerSemiCircle} />
			<SectionList
				contentContainerStyle={styles.list}
				sections={DATA}
				scrollEnabled={false}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => {
					if (item.type === 'button') {
						if (item.key == 'language') {
							return (
								<TouchableOpacity onPress={item.onPress} style={styles.item}>
									<View style={styles.iconContainer}>
										{item.icon}
									</View>

									<Text style={styles.itemText}>{item.name}</Text>
									<Text style={styles.itemValue}>{ language == 'zh-HK' ? '中文' : 'English' }</Text>
								</TouchableOpacity>
							)
						}

						return (
							<TouchableOpacity onPress={item.onPress} style={styles.item}>
								<View style={styles.iconContainer}>
									{item.icon}
								</View>
								<Text style={styles.itemText}>{item.name}</Text>
							</TouchableOpacity>
						)
					}

					return <View />;
				}

					
				}
				renderSectionHeader={({ section: { title } }) => (
					<Text style={styles.sectionHeader}>{title}</Text>
				)}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
				style={styles.container}
			/>
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
	headerSemiCircle: {
		position: "absolute", 
		top: 0, 
		left: 0, 
		width: 402, 
		height: 23,
		zIndex: 1,
	},

	list: {
		marginTop: 33,
	},
	iconContainer: {
		flexShrink: 1,
		marginRight: 4,
	},

	sectionHeader: {
		fontSize: 18,
		fontWeight: 'bold',
		backgroundColor: '#f0f0f0',
		padding: 10,
	},
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15,
		backgroundColor: 'white',
	},
	itemText: {
		fontSize: 16,
		flexGrow: 1
	},
	itemValue: {
		fontSize: 16,
		flexShrink: 1
	},
	separator: {
		height: 1,
		backgroundColor: '#f7f7f7',
	},
	sectionSeparator: {
		height: 1,
		backgroundColor: '#f7f7f7',
	},
});
