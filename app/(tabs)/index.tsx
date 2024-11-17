import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Text, View } from '@/components/Themed';

export default function MembershipScreen() {
	return (
		<View style={styles.container}>
			<Image 
			style={styles.logo}
				source={require("../../assets/images/HeaderMain.svg")}

			/>
			{/* <Text style={styles.title}>Tab One</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<EditScreenInfo path="app/(tabs)/index.tsx" /> */}
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
});
