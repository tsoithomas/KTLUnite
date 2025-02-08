import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import HeaderSemiCircle from '@/components/HeaderSemiCircle';
import { router } from 'expo-router';

import * as eva from '@eva-design/eva';
import { Layout, Icon, IconElement, Input, Text, Button, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';


export default function MembershipScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const toggleSecureEntry = (): void => {
		setSecureTextEntry(!secureTextEntry);
	};


	return (
		<View style={styles.container}>
        	<HeaderSemiCircle style={styles.headerSemiCircle} />
			<Layout style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 50}}>
				<Image 
						style={styles.tlgirl}
						contentFit='contain'
						source={require("../../assets/images/tlgirl1.png")}
					/>
					
				<Input
					style={styles.input}
					placeholder='Email'
					value={email}
					size='large'
					onChangeText={nextValue => setEmail(nextValue)}
				/>

				<Input
					style={styles.input}
					value={password}
					placeholder='Password'
					size='large'
					accessoryRight={
						<TouchableWithoutFeedback onPress={toggleSecureEntry}>
							<MaterialCommunityIcons 
								name={secureTextEntry ? 'eye-off' : 'eye'}
								color="#7CC4EB"
								size={24} />
						</TouchableWithoutFeedback>
					}
					secureTextEntry={secureTextEntry}
					onChangeText={nextValue => setPassword(nextValue)}
				/>

				<Button style={styles.signInButton}>
					Sign in
				</Button>

				<Button 
					style={styles.joinButton}
					onPress={() => {
						router.navigate({
							pathname: '/register',
						});
					}}
					>
					Join
				</Button>


			</Layout>
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
	tlgirl: {
		height: 100,
		width: 200,
		marginHorizontal: 'auto',
		top: 6,
		zIndex: 100
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
		backgroundColor: "#16297C",
		borderWidth: 0,
		borderRadius: 50,
		marginTop: 20,
		width: 200,
	},
	joinButton: {
		backgroundColor: "#16297C",
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
});
