import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { createRef, useEffect, useLayoutEffect, useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';


export default function RegisterScreen() {
	const params = useLocalSearchParams<{ closeDialog: string }>();
	const [showAlertDialog, setShowAlertDialog] = useState(false);
	const handleClose = () => setShowAlertDialog(false);

	useEffect(() => {
		if (params.closeDialog == '1') {
			setShowAlertDialog(true);
		}
	}, [params.closeDialog]);

	return (
		<View style={styles.container}>
			<Button onPress={() => {
				console.log(showAlertDialog);
				setShowAlertDialog(true);
				}}>
				<ButtonText>Pay</ButtonText>
			</Button>
			<AlertDialog isOpen={true} onClose={handleClose} size="md">
				<AlertDialogBackdrop />
				<AlertDialogContent>
					<AlertDialogHeader>
					<Heading className="text-typography-950 font-semibold" size="md">
						Are you sure you want to delete this post?
					</Heading>
					</AlertDialogHeader>
					<AlertDialogBody className="mt-3 mb-4">
					<Text size="sm">
						Deleting the post will remove it permanently and cannot be undone.
						Please confirm if you want to proceed.
					</Text>
					</AlertDialogBody>
					<AlertDialogFooter className="">
					<Button
						variant="outline"
						action="secondary"
						onPress={handleClose}
						size="sm"
					>
						<ButtonText>Cancel</ButtonText>
					</Button>
					<Button size="sm" onPress={handleClose}>
						<ButtonText>Delete</ButtonText>
					</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</View>


	);
}

const styles = StyleSheet.create({
	container: {
	},
	header: {
	  flexShrink: 1,
	},
});