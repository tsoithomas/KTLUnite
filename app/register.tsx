import { StyleSheet, Switch } from 'react-native';
import { View } from '@/components/Themed';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { createRef, useEffect, useLayoutEffect, useState } from 'react';
import { router } from 'expo-router';
import { Button, IndexPath, Card, Input, Layout, Modal, Select, SelectItem, Text, ViewPager } from '@ui-kitten/components';
import { Entypo, FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';


import { Dropdown } from 'react-native-element-dropdown';


export default function RegisterScreen() {
	const params = useLocalSearchParams<{ closeDialog: string, pageNumber: string }>();
	const [visible, setVisible] = useState(false);
	const [pageNumber, setPageNumber] = useState(0);
	const [shareStatusChecked, setShareStatusChecked] = useState(true);
	const [selectedYear, setSelectedYear] = useState(null);
	const [selectedClass, setSelectedClass] = useState(null);
	const [selectedHouse, setSelectedHouse] = useState(null);
	const [selectedStatus, setSelectedStatus] = useState(null);
	const [selectedMembership, setSelectedMembership] = useState({label: 'General', value: 'General'});

	useEffect(() => {
		if (params.closeDialog) {
			setVisible(true);
		}
	}, [params.closeDialog]);

	useEffect(() => {
		if (params.pageNumber) {
			setPageNumber(Number.parseInt(params.pageNumber));
		}
	}, [params.pageNumber]);

	const yearSelectItems = [
		{label: '2025', value: '2025'},
		{label: '2024', value: '2024'},
		{label: '2023', value: '2023'},
	];

	const classSelectItems = [
		{label: '6A', value: '6A'},
		{label: '6B', value: '6B'},
		{label: '6C', value: '6C'},
		{label: '6D', value: '6D'},
	];

	const houseSelectItems = [
		{label: 'Blue', value: 'Blue'},
		{label: 'Green', value: 'Green'},
		{label: 'White', value: 'White'},
		{label: 'Red', value: 'Red'},
	];

	const statusSelectItems = [
		{label: 'Working', value: 'Working'},
		{label: 'Studying', value: 'Studying'},
		{label: 'Unemployed', value: 'Unemployed'},
	];

	const membershipSelectItems = [
		{label: 'General', value: 'General'},
		{label: 'Permanent', value: 'Permanent'},
	];


	return (
		<View style={styles.container}>

			<View style={{
				position: 'absolute', 
				top: 10, 
				left: 0, 
				zIndex: 100,
				flexDirection: 'row',
				width: '100%',
				justifyContent: 'center'
				}}>
				<View style={{
					flexDirection: 'row',
					justifyContent: 'center',
					paddingBlock: 5,
					paddingInline: 20,
					borderRadius: 50,
					}}>
					<FontAwesome name="user" size={16} color={pageNumber==0?'rgba(73,118,180,1)':"rgba(73,118,180,0.5)"} style={{marginInline: 5}} />
					<MaterialIcons name="arrow-forward-ios" size={16} color="rgba(73,118,180,0.5)" />
					<FontAwesome name="graduation-cap" size={16} color={pageNumber==1?'rgba(73,118,180,1)':"rgba(73,118,180,0.5)"} style={{marginInline: 5}} />
					<MaterialIcons name="arrow-forward-ios" size={16} color="rgba(73,118,180,0.5)" />
					<MaterialIcons name="work" size={16} color={pageNumber==2?'rgba(73,118,180,1)':"rgba(73,118,180,0.5)"} style={{marginInline: 5}} />
					<MaterialIcons name="arrow-forward-ios" size={16} color="rgba(73,118,180,0.5)" />
					<FontAwesome6 name="people-group" size={16} color={pageNumber==3?'rgba(73,118,180,1)':"rgba(73,118,180,0.5)"} style={{marginInline: 5}} />
				</View>
			</View>

			<ViewPager style={styles.viewPager} swipeEnabled={false} selectedIndex={pageNumber}>
				<Layout style={styles.tab} level='1'>
					<Text category='h6' style={styles.heading}>Personal Particulars</Text>

					<Text style={styles.label}>English Name</Text>
					<Input
						placeholder='Amy Chan'
						style={styles.inputBox}
						textStyle={styles.inputBoxText}
					/>

					<Text style={styles.label}>Chinese Name</Text>
					<Input
						placeholder='陳小美'
						style={styles.inputBox}
					/>

					<Text style={styles.label}>Email</Text>
					<Input
						placeholder='amychan@gmail.com'
						style={styles.inputBox}
					/>

					<Text style={styles.label}>Contact Number</Text>
					<Input
						placeholder='99887766'
						style={styles.inputBox}
					/>

					<Text style={styles.label}>Address</Text>
					<Input
						multiline={true}
						style={styles.inputBox}
						textStyle={styles.textArea}
					/>

				</Layout>
				<Layout style={styles.tab} level='1'>
					<Text category='h6' style={styles.heading}>Graudation Information</Text>

					<Text style={styles.label}>Year of Graduation</Text>
					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						iconStyle={styles.iconStyle}
						data={yearSelectItems}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder=""
						value={selectedYear}
						onChange={item => {
							setSelectedYear(item.value);
						}}
					/>

					
					<Text style={styles.label}>Class</Text>
					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						iconStyle={styles.iconStyle}
						data={classSelectItems}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder=""
						value={selectedClass}
						onChange={item => {
							setSelectedClass(item.value);
						}}
					/>

					<Text style={styles.label}>House</Text>
					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						iconStyle={styles.iconStyle}
						data={houseSelectItems}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder=""
						value={selectedHouse}
						onChange={item => {
							setSelectedHouse(item.value);
						}}
					/>
				</Layout>
				<Layout style={styles.tab} level='1'>
					<Text category='h6' style={styles.heading}>Current Status</Text>

					<Text style={styles.label}>Status</Text>
					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						iconStyle={styles.iconStyle}
						data={statusSelectItems}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder=""
						value={selectedStatus}
						onChange={item => {
							setSelectedStatus(item.value);
						}}
					/>

					<Text style={styles.label}>Institution</Text>
					<Input
						placeholder=''
						style={styles.inputBox}
					/>

					<Text style={styles.label}>Additional Information</Text>
					<Input
						multiline={true}
						style={styles.inputBox}
						textStyle={styles.textArea}
					/>

					<View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
						<Text style={styles.label}>Share my status on the AA website</Text>
						<Switch
							trackColor={{false: '#767577', true: '#7CC4EB'}}
							// thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
							// ios_backgroundColor="#3e3e3e"
							onValueChange={(isChecked): void => {
								setShareStatusChecked(isChecked);
							}}
							value={shareStatusChecked}
						/>
					</View>


				</Layout>
				<Layout style={styles.tab} level='1'>
					<Text category='h6' style={styles.heading}>Alumni Association</Text>

					<Text style={styles.label}>Membership</Text>
					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						iconStyle={styles.iconStyle}
						data={membershipSelectItems}
						maxHeight={300}
						labelField="label"
						valueField="value"
						value={selectedMembership}
						onChange={item => {
							setSelectedMembership(item.value);
						}}
					/>

					<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginBottom: 20}}>
						  <Text style={styles.label}>Fee</Text>
						  <Text style={styles.label}>$100</Text>
					</View>

					<View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20}}>
						<Text style={styles.label}>Receive alumni news from AA</Text>
						<Switch
							trackColor={{false: '#767577', true: '#7CC4EB'}}
							// thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
							// ios_backgroundColor="#3e3e3e"
							onValueChange={(isChecked): void => {
								setShareStatusChecked(isChecked);
							}}
							value={shareStatusChecked}
						/>
					</View>

					<View style={{
							flexDirection: "row", 
							justifyContent: "flex-start", 
							}}>
						<View style={{
							flexDirection: "row", 
							backgroundColor: '#f2f9ff',
							borderWidth: 1,
							borderColor: '#7CC4EB',
							width: 250,
							borderRadius: 10,
							padding: 15,
							}}>
							<MaterialIcons name="info-outline" size={24} color='#16297C' />
							<Text style={{color: '#16297C', marginLeft: 5, width: 180}}>
							The membership fee payment will be arranged offline, and the school office will contact you promptly.
							</Text>
						</View>
						<Image 
							style={styles.tlgirl}
							contentFit='contain'
							source={require("../assets/images/winter_uniform2.png")}
							/>
					</View>
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
							status="basic"
							style={styles.closeDialogButton}
							onPress={() => {setVisible(false)
								router.dismiss();
							}}>Yes</Button>
						<Button 
							style={{...styles.closeDialogButton, ...styles.highlightDialogButton}}
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
	heading: {
		marginBottom: 20,
		textTransform: 'uppercase',
		color: '#16297C',
	},
	label: {
		color: '#16297C',
		fontSize: 16,
		marginBottom: 2,
	},
	backdrop: {
	  backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	closeDialogButton: {
		borderWidth: 0,
		borderRadius: 5,
		color: '#16297C',
	},
	highlightDialogButton: {
		backgroundColor: '#16297C',
		color: '#ffffff',
	},
	viewPager: {
		marginTop: 20,
	},
	tab: {
	  height: '100%',
	  margin: 20,
	},
	inputBox: {
		marginBottom: 20,
		borderRadius: 5,
		backgroundColor: '#f2f9ff',
		borderColor: '#7CC4EB',
	},
	inputBoxText: {
		color: '#16297C',
		backgroundColor: '#f2f9ff',
	},
	textArea: {
		marginBottom: 20,
		borderRadius: 5,
		minHeight: 64,
	},
	dropdown: {
		marginBottom: 20,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#7CC4EB',
		paddingInline: 10,
		paddingBlock: 10,
		color: '#16297C',
		backgroundColor: '#f2f9ff',
	}, 
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
		color: '#16297C',
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	buttonGroup: {
		margin: 2,
	},
	tlgirl: {
		height: 152,
		width: 100,
		left: -8,
		zIndex: 100
	},
});