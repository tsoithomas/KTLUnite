import { StyleSheet, Switch } from 'react-native';
import { View } from '@/components/Themed';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { createRef, useEffect, useLayoutEffect, useState } from 'react';
import { router } from 'expo-router';
import { Button, IndexPath, Card, Input, Layout, Modal, Select, SelectItem, Text, ViewPager } from '@ui-kitten/components';
import { Entypo, FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function RegisterScreen() {
	const params = useLocalSearchParams<{ closeDialog: string, pageNumber: string }>();
	const [visible, setVisible] = useState(false);
	const [pageNumber, setPageNumber] = useState(0);
	const [shareStatusChecked, setShareStatusChecked] = useState(true);
	const [yearSelectedIndex, setYearSelectedIndex] = useState<IndexPath>(new IndexPath(0));
	const [classSelectedIndex, setClassSelectedIndex] = useState<IndexPath>(new IndexPath(0));
	const [houseSelectedIndex, setHouseSelectedIndex] = useState<IndexPath>(new IndexPath(0));
	const [statusSelectedIndex, setStatusSelectedIndex] = useState<IndexPath>(new IndexPath(0));
	const [membershipSelectedIndex, setMembershipSelectedIndex] = useState<IndexPath>(new IndexPath(0));

	useEffect(() => {
		if (params.closeDialog) {
			setVisible(true);
			// setShowAlertDialog(true);
		}
	}, [params.closeDialog]);

	useEffect(() => {
		if (params.pageNumber) {
			setPageNumber(Number.parseInt(params.pageNumber));
		}
	}, [params.pageNumber]);

	interface SelectItemData {
		key: string;
	  }

	const renderOption = (item: SelectItemData): React.ReactElement => (
		<SelectItem key={item.key} title={item.key} />
	);

	const yearSelectItems = [
		{key: '2025'},
		{key: '2024'},
		{key: '2023'},
	];

	const classSelectItems = [
		{key: '6A'},
		{key: '6B'},
		{key: '6C'},
		{key: '6D'},
	];

	const houseSelectItems = [
		{key: 'Blue'},
		{key: 'Green'},
		{key: 'White'},
		{key: 'Red'},
	];

	const statusSelectItems = [
		{key: 'Working'},
		{key: 'Studying'},
		{key: 'Unemployed'},
	];

	const membershipSelectItems = [
		{key: 'General'},
		{key: 'Permanent'},
	];

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
					backgroundColor: 'rgba(73,118,180,0.1)',
					paddingBlock: 5,
					paddingInline: 20,
					borderRadius: 50,
					}}>
					<FontAwesome name="user" size={16} color={pageNumber==0?'rgba(73,118,180,1)':"rgba(73,118,180,0.5)"} style={{marginInline: 5}} />
					<Entypo name="dot-single" size={16} color="rgba(73,118,180,0.5)" />
					<FontAwesome name="graduation-cap" size={16} color={pageNumber==1?'rgba(73,118,180,1)':"rgba(73,118,180,0.5)"} style={{marginInline: 5}} />
					<Entypo name="dot-single" size={16} color="rgba(73,118,180,0.5)" />
					<MaterialIcons name="work" size={16} color={pageNumber==2?'rgba(73,118,180,1)':"rgba(73,118,180,0.5)"} style={{marginInline: 5}} />
					<Entypo name="dot-single" size={16} color="grrgba(73,118,180,0.5)ay" />
					<FontAwesome6 name="people-group" size={16} color={pageNumber==3?'rgba(73,118,180,1)':"rgba(73,118,180,0.5)"} style={{marginInline: 5}} />
				</View>
			</View>

			<ViewPager swipeEnabled={false} selectedIndex={pageNumber}>
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
						textStyle={styles.textArea}
					/>

				</Layout>
				<Layout style={styles.tab} level='1'>
					<Text category='h6' style={styles.heading}>Graudation Information</Text>

					<Text style={styles.label}>Year of Graduation</Text>
					<Select
						style={styles.select}
						selectedIndex={yearSelectedIndex}
						value={yearSelectItems[yearSelectedIndex.row].key}
						onSelect={index => setYearSelectedIndex(index as IndexPath)}
					>
						{yearSelectItems.map(renderOption)}
					</Select>

					<Text style={styles.label}>Class</Text>
					<Select
						style={styles.select}
						selectedIndex={classSelectedIndex}
						value={classSelectItems[classSelectedIndex.row].key}
						onSelect={index => setClassSelectedIndex(index as IndexPath)}
					>
						{classSelectItems.map(renderOption)}
					</Select>

					<Text style={styles.label}>House</Text>
					<Select
						style={styles.select}
						selectedIndex={houseSelectedIndex}
						value={houseSelectItems[houseSelectedIndex.row].key}
						onSelect={index => setHouseSelectedIndex(index as IndexPath)}
					>
						{houseSelectItems.map(renderOption)}
					</Select>
				</Layout>
				<Layout style={styles.tab} level='1'>
					<Text category='h6' style={styles.heading}>Current Status</Text>

					<Text style={styles.label}>Status</Text>
					<Select
						style={styles.select}
						selectedIndex={statusSelectedIndex}
						value={statusSelectItems[statusSelectedIndex.row].key}
						onSelect={index => setStatusSelectedIndex(index as IndexPath)}
					>
						{statusSelectItems.map(renderOption)}
					</Select>

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
							trackColor={{false: '#767577', true: '#4976B4'}}
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
					<Select
						style={styles.select}
						selectedIndex={membershipSelectedIndex}
						value={membershipSelectItems[membershipSelectedIndex.row].key}
						onSelect={index => setMembershipSelectedIndex(index as IndexPath)}
					>
						{membershipSelectItems.map(renderOption)}
					</Select>

					<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginBottom: 20}}>
						  <Text style={styles.label}>Fee</Text>
						  <Text style={styles.label}>$100</Text>
					</View>

					<View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20}}>
						<Text style={styles.label}>Receive alumni news from AA</Text>
						<Switch
							trackColor={{false: '#767577', true: '#4976B4'}}
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
							backgroundColor: '#eeeeee',
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
	},
	highlightDialogButton: {
		backgroundColor: '#0E6279',
		color: '#ffffff',
	},
	tab: {
	  height: '100%',
	  margin: 20,
	},
	inputBox: {
		marginBottom: 20,
		borderRadius: 5,
	},
	inputBoxText: {
		color: '#16297C',
	},
	textArea: {
		marginBottom: 20,
		borderRadius: 5,
		minHeight: 64,
	},
	select: {
		marginBottom: 20,
		borderRadius: 5,
	},
	buttonGroup: {
		margin: 2,
	},
	tlgirl: {
		height: 152,
		width: 100,
		left: -6,
		zIndex: 100
	},
});