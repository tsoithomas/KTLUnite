import { SectionList, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import HeaderSemiCircle from '@/components/HeaderSemiCircle';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';


export default function SettingsScreen() {
	const [language, setLanguage] = useState('en');
	const { showActionSheetWithOptions } = useActionSheet();

	const selectLanguage = () => {
		const options = ['English', '中文', 'Cancel'];
		const cancelButtonIndex = 2;
	
		showActionSheetWithOptions({options, cancelButtonIndex}, (selectedIndex?: number) => {
			if (selectedIndex === undefined) {
				return;
			}

			switch (selectedIndex) {
				case 0:
					setLanguage('en');
					break;
				case 1:
					setLanguage('zh');
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
			title: 'Interface',
			data: [
				{ 
					type: 'button',
					key: 'language', 
					name: 'Language', 
					onPress: selectLanguage,
					icon: <MaterialIcons name="language" size={24} color="black" />
				},
			],
		},
		{
			title: 'Membership',
			data: [
				{
					type: 'button',
					key: 'membership',
					name: 'Log in',
					onPress: () => alert('View Terms of Service'),
					icon: <MaterialIcons name="login" size={24} color="black" />
				},
			],
		},
		{
			title: 'About',
			data: [
				{ 
					type: 'button',
					key: 'tos', 
					name: 'Terms of Service', 
					onPress: () => alert('View Terms of Service'),
					icon: <MaterialIcons name="room-service" size={24} color="black" />
				},
				{ 
					type: 'button',
					key: 'pp', 
					name: 'Privacy Policy', 
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
									<Text style={styles.itemValue}>{ language == 'zh' ? '中文' : 'English' }</Text>
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
