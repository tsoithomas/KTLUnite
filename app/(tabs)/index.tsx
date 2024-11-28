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

			<FormControl className="m-4 p-4 border rounded-lg border-outline-300">
				<VStack space="xl">
					<Heading className="text-typography-900 leading-3">Login</Heading>
					<VStack space="xs">
						<Text className="text-typography-500 leading-1">Email</Text>
						<Input>
						<InputField type="text" />
						</Input>
					</VStack>
					<VStack space="xs">
						<Text className="text-typography-500 leading-1">Password</Text>
						<Input className="text-center">
						<InputField type={showPassword ? "text" : "password"} />
						<InputSlot className="pr-3" onPress={handleState}>
							{/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
							<InputIcon
								as={showPassword ? EyeIcon : EyeOffIcon}
								className="text-gray-700"
							/>
						</InputSlot>
						</Input>
					</VStack>
					<Button
						className="ml-auto"
						onPress={() => {
							// setShowModal(false)
						}}
					>
						<ButtonText className="text-typography-0">Save</ButtonText>
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
	loginForm: {
		paddingHorizontal: 40,
		paddingVertical: 40,
	}
});
