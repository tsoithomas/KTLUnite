import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from "react-i18next";
import Colors from '@/constants/Colors';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { Image } from 'expo-image';
import HeaderSemiCircle from '@/components/HeaderSemiCircle';
import { Connection } from '@/services/Connection'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


type CallbackFunction = (data: UserData) => void;
type UserData = {
	accountId: number;
	name: string;
	memberSince: number;
};

export default function MembershipScreen() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme || "light"];

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [accountId, setAccountId] = useState(0);
	const [name, setName] = useState('');
	const [memberSince, setMemberSince] = useState(0);

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
		setName(data.name);
		setMemberSince(data.memberSince);
	}

	const saveLoginData: CallbackFunction = async (data: UserData) => {
		setAccountId(data.accountId);
		setName(data.name);
		setMemberSince(data.memberSince);

		const userData: UserData = {
			accountId: data.accountId ?? 0,
			name: data.name ?? '',
			memberSince: data.memberSince ?? 0,
		}

		await AsyncStorage.setItem("userData", JSON.stringify(userData));

		setEmail('');
		setPassword('');
	}

	const toggleSecureEntry = (): void => {
		setSecureTextEntry(!secureTextEntry);
	};

	const login = (): void => {
		console.log('pressed');
		const data = {
			username: email, 
			password: password,
		}
		Connection.login(data, saveLoginData);
	};

	const loginForm = (
		<Layout style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 50}}>
			<Image
				style={styles.tlgirl1}
				contentFit='contain'
				source={require("../../assets/images/tlgirl1.png")}
			/>
			
			<Input
				style={styles.input}
				placeholder={t('home.email')}
				value={email}
				size='large'
				onChangeText={nextValue => setEmail(nextValue)}
			/>

			<Input
				style={styles.input}
				value={password}
				placeholder={t('home.password')}
				size='large'
				accessoryRight={
					<TouchableWithoutFeedback onPress={toggleSecureEntry}>
						<MaterialCommunityIcons 
							name={secureTextEntry ? 'eye-off' : 'eye'}
							color={theme.tint}
							size={24} />
					</TouchableWithoutFeedback>
				}
				secureTextEntry={secureTextEntry}
				onChangeText={nextValue => setPassword(nextValue)}
			/>

			<Button
				style={styles.signInButton} onPress={login}>
				{t('home.signIn')}
			</Button>

			<Button
				style={styles.joinButton}
				onPress={() => {
					router.navigate({
						pathname: '/register',
					});
				}}
				>
				{t('home.join')}
			</Button>
		</Layout>
	);

	const membershipCard = (
		<Layout style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 50}}>
			<View style={styles.membershipCard}>
				<View style={styles.membershipCardUpper}>
					<Text style={styles.membershipCardText}>{name}</Text>
					<Text style={styles.membershipCardText}>{String(accountId).padStart(6, '0')}</Text>
				</View>
				<View style={styles.membershipCardLower}>
					<Text style={styles.membershipCardText}>Member since {
					new Intl.DateTimeFormat('en-US', { 
						month: '2-digit', 
						year: 'numeric' 
					  }).format(new Date(memberSince * 1000)).replace(',', '')
					}</Text>
				</View>
			</View>
			<Image
				style={styles.tlgirl2}
				contentFit='contain'
				source={require("../../assets/images/tlgirl2.png")}
			/>
		</Layout>
	);

	return (
		<View style={styles.container}>
        	<HeaderSemiCircle style={styles.headerSemiCircle} />
			{ accountId === 0 ? loginForm : membershipCard }
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
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
	logo: {
	  width: "100%",
	  height: 200,
	},
	tlgirl1: {
		height: 100,
		width: 200,
		marginHorizontal: 'auto',
		top: 6,
		zIndex: 100
	},
	tlgirl2: {
		height: 200,
		width: 200,
		marginHorizontal: 'auto',
		top: -23,
		zIndex: 1
	},
	loginForm: {
		paddingHorizontal: 40,
		paddingVertical: 40,
	},
	headerSemiCircle: {
		position: "absolute", 
		top: 0, 
		left: 0, 
		width: 402, 
		height: 23,
		zIndex: 1,
	},
	signInButton: {
		backgroundColor: Colors.light.buttonBackground,
		borderWidth: 0,
		borderRadius: 50,
		marginTop: 20,
		width: 200,
	},
	joinButton: {
		backgroundColor: Colors.light.buttonBackground,
		borderWidth: 0,
		borderRadius: 50,
		marginTop: 20,
		width: 200,
	},
	input: {
		width: '70%',
		marginBottom: 6,
		backgroundColor: '#f2f9ff',
		borderColor: '#7CC4EB',
	},
	captionContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	captionIcon: {
		width: 10,
		height: 10,
		marginRight: 5,
	},
	captionText: {
		fontSize: 12,
		fontWeight: '400',
		fontFamily: 'opensans-regular',
		color: '#8F9BB3',
	},
	membershipCard: {
		width: 280,
		height: 180,
		borderRadius: 10,
		backgroundColor: Colors.light.buttonBackground,
		padding: 20,
		flexDirection: 'column',
		justifyContent: 'space-between',
		zIndex: 100,
	},
	membershipCardUpper: {
		
	},
	membershipCardLower: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	membershipCardText: {
		color: '#fff',
	},
});
