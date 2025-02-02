import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { createRef, useEffect, useLayoutEffect, useState } from 'react';
import { router } from 'expo-router';
import { Button, Card, Input, Layout, Modal, Select, SelectItem, Text, ViewPager } from '@ui-kitten/components';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Entypo } from '@expo/vector-icons';

export default function RegisterScreen() {
	const params = useLocalSearchParams<{ closeDialog: string, registerPage: string }>();
	const [visible, setVisible] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		if (params.closeDialog) {
			setVisible(true);
			// setShowAlertDialog(true);
		}
	}, [params.closeDialog]);

	useEffect(() => {
		if (params.registerPage) {
			console.log(params.registerPage);
			setPage(Number.parseInt(params.registerPage));
		}
	}, [params.registerPage]);




	return (
		<View style={styles.container}>

			<View style={{
				position: 'absolute', 
				bottom: 65, 
				left: 0, 
				zIndex: 100,
				flexDirection: 'row',
				width: '100%',
				justifyContent: 'center'
				}}>
				<View style={{
					flexDirection: 'row',
					justifyContent: 'center',
					backgroundColor: '#eeeeee',
					paddingBlock: 5,
					paddingInline: 20,
					borderRadius: 50,
					}}>
					<FontAwesome name="user" size={16} color="black" style={{marginInline: 5}} />
					<Entypo name="dot-single" size={16} color="gray" />
					<FontAwesome name="graduation-cap" size={16} color="gray" style={{marginInline: 5}} />
					<Entypo name="dot-single" size={16} color="gray" />
					<MaterialIcons name="work" size={16} color="gray" style={{marginInline: 5}} />
					<Entypo name="dot-single" size={16} color="gray" />
					<FontAwesome6 name="people-group" size={16} color="gray" style={{marginInline: 5}} />
				</View>
			</View>

			<ViewPager
				swipeEnabled={false}
				selectedIndex={page}
			>
			<Layout
				style={styles.tab}
				level='1'
			>
				<Text category='h6' style={styles.heading}>Personal Particulars</Text>

				<Input
					label='English Name'
					placeholder='Amy Chan'
					style={styles.inputBox}
				/>

				<Input
					label='Chinese Name'
					placeholder='陳小美'
					style={styles.inputBox}
				/>

				<Input
					label='Email'
					placeholder='amychan@gmail.com'
					style={styles.inputBox}
				/>

				<Input
					label='Contact Number'
					placeholder='99887766'
					style={styles.inputBox}
				/>

				<Input
					multiline={true}
					label='Address'
					textStyle={styles.textArea}
				/>

			</Layout>
			<Layout
				style={styles.tab}
				level='1'
			>
				<Text category='h6' style={styles.heading}>Graudation Information</Text>

				<Select
					label='Year of Graduation'
					placeholder='2025'
					style={styles.inputBox}
					selectedIndex={0}
				>
					<SelectItem title='1999' />
					<SelectItem title='2000' />
					<SelectItem title='2001' />
				</Select>


				<Select
					label='Class'
					placeholder='6A'
					style={styles.inputBox}
					selectedIndex={0}
				>
					<SelectItem title='6A' />
					<SelectItem title='6B' />
					<SelectItem title='6C' />
				</Select>

				
				<Select
					label='House'
					placeholder='Blue House'
					style={styles.inputBox}
					selectedIndex={0}
				>
					<SelectItem title='Blue House' />
					<SelectItem title='Red House' />
					<SelectItem title='Green House' />
				</Select>
			</Layout>
			<Layout
				style={styles.tab}
				level='1'
			>
				<Text category='h5'>
		TRANSACTIONS
				</Text>
			</Layout>
			</ViewPager>

			<Modal
				visible={visible}
				backdropStyle={styles.backdrop}
				// onBackdropPress={() => setVisible(false)}
				onBackdropPress={() => {}}
			>
				<Card disabled={true}>
					<Text>Cancel registration?</Text>

					<Layout style={{flexDirection: "row", marginTop: 10, justifyContent: 'space-between'}}>
						<Button 
							status="danger"
							style={styles.closeDialogButton}
							onPress={() => {setVisible(false)
								router.dismiss();
							}}>Yes</Button>
						<Button 
							status="basic"
							style={styles.closeDialogButton}
							onPress={() => setVisible(false)}>No</Button>
					</Layout>
					
				</Card>
			</Modal>

		</View>


	);
}

const styles = StyleSheet.create({
	container: {
	},
	header: {
	  flexShrink: 1,
	},
	backdrop: {
	  backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	closeDialogButton: {
		borderWidth: 0,
		borderRadius: 50,
	},
	tab: {
	  height: '100%',
	  margin: 20,
	},

	heading: {
		marginBottom: 20,
	},

	inputBox: {
		marginBottom: 20,
		borderRadius: 5,
	},
	textArea: {
		marginBottom: 20,
		borderRadius: 5,
		minHeight: 64,
	}
});