import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Text, View } from '@/components/Themed';
import { Input,InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { FormControl } from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';

export default function MembershipScreen() {
	const [showPassword, setShowPassword] = useState(false);
	const handleState = () => {
		setShowPassword((showState) => {
			return !showState
		})
	}

	return (
		<View style={styles.container}>
			<Image 
				style={styles.logo}
				source={require("../../assets/images/HeaderMain.svg")}
			/>

			<FormControl className="mx-12 my-8 rounded-lg border-outline-200">
				<Image 
					style={styles.tlgirl}
					source={require("../../assets/images/tlgirl1.png")}
				/>
				<VStack space="xl">
					<VStack space="xs" className=" bg-gray-100">
						<Input size="xl">
							<InputField type="text" placeholder="Email" autoComplete="email" inputMode="email" />
						</Input>
					</VStack>
					<VStack space="xs">
						<Input className="bg-gray-100" size="xl">
							<InputField type={showPassword ? "text" : "password"} placeholder="Password" />
							<InputSlot className="pr-3" onPress={handleState}>
								<InputIcon
									as={showPassword ? EyeIcon : EyeOffIcon}
									className="text-gray-500"
								/>
							</InputSlot>
						</Input>
					</VStack>
					<Button
						size="xl"
						className="mx-auto w-48 bg-cyan-700 rounded-full"
						onPress={() => {
							// setShowModal(false)
						}}
					>
						<ButtonText className="text-typography-0">Sign in</ButtonText>
					</Button>
					<Button
						size="xl"
						className="mx-auto w-48 bg-cyan-700 rounded-full"
						onPress={() => {
							// setShowModal(false)
						}}
					>
						<ButtonText className="text-typography-0">Join</ButtonText>
					</Button>
				</VStack>
			</FormControl>

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
		resizeMode: 'contain',
		marginHorizontal: 'auto',
		top: 6,
		zIndex: 100
	},
	loginForm: {
		paddingHorizontal: 40,
		paddingVertical: 40,
	}
});
