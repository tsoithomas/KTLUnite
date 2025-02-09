import { SectionList, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import HeaderSemiCircle from '@/components/HeaderSemiCircle';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/i18n';
import { initReactI18next } from "react-i18next";
import translationEn from "../../i18n/locales/en-US/translation.json";
import translationZh from "../../i18n/locales/zh-HK/translation.json";

const resources = {
	"en-US": { translation: translationEn },
	"zh-HK": { translation: translationZh }
};


export default function SettingsScreen() {
	const { t } = useTranslation();
	const [language, setLanguage] = useState('en');
	const { showActionSheetWithOptions } = useActionSheet();


	useEffect(() => {
		const loadLanguage = async () => {
			let lang = await AsyncStorage.getItem("language");
			setLanguage(lang ?? 'en-US');
		};
	
		loadLanguage();
	}, []);

	useEffect(() => {
		const saveLanguage = async () => {
			await AsyncStorage.setItem("language", language);
			i18n.use(initReactI18next).init({
				// compatibilityJSON: "v3",
				resources,
				lng: language,
				fallbackLng: "en-US",
				interpolation: {
					escapeValue: false,
				},
				});
		};
	
		saveLanguage();
	}, [language]);

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
					icon: <MaterialIcons name="language" size={24} color="black" />
				},
			],
		},
		{
			title: t('settings.membership'),
			data: [
				{
					type: 'button',
					key: 'membership',
					name: t('settings.signIn'),
					onPress: () => alert('View Terms of Service'),
					icon: <MaterialIcons name="login" size={24} color="black" />
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
					onPress: () => alert('View Terms of Service'),
					icon: <MaterialIcons name="room-service" size={24} color="black" />
				},
				{ 
					type: 'button',
					key: 'pp', 
					name: t('settings.privacyPolicy'), 
					onPress: () => alert('View Privacy Policy'),
					icon: <MaterialIcons name="privacy-tip" size={24} color="black" />
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
