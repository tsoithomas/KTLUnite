import { StyleSheet, Switch } from 'react-native';
import { View } from '@/components/Themed';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { createRef, useEffect, useLayoutEffect, useState } from 'react';
import { router } from 'expo-router';
import { Button, Card, Input, Layout, Modal, Text, ViewPager } from '@ui-kitten/components';
import { FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from "react-i18next";

export default function RegisterScreen() {
	const { t } = useTranslation();
	const params = useLocalSearchParams<{ closeDialog: string, pageNumber: string }>();
	const [visible, setVisible] = useState(false);
	const [pageNumber, setPageNumber] = useState(0);
	const [shareStatusChecked, setShareStatusChecked] = useState(true);
	const [receiveNewsChecked, setReceiveNewsChecked] = useState(true);
	const [selectedYear, setSelectedYear] = useState(null);
	const [selectedClass, setSelectedClass] = useState(null);
	const [selectedHouse, setSelectedHouse] = useState(null);
	const [selectedStatus, setSelectedStatus] = useState(null);
	const [selectedMembership, setSelectedMembership] = useState('general');

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

	const currentYear = new Date().getFullYear();
	const yearSelectItems = Array.from(
		{ length: currentYear - 1949 + 1 }, 
		(_, i) => {
			const year = currentYear - i;
			return { label: String(year), value: String(year) };
		}
	);

	const classSelectItems = Array.from({ length: 6 }, (_, form) => {
		const formNumber = 6 - form; 
		return ['A', 'B', 'C', 'D'].map(classLetter => ({
			label: `${formNumber}${classLetter}`,
			value: `${formNumber}${classLetter}`
		}));
	}).flat();

	const houseSelectItems = [
		{label: t('register.redHouse'), value: 'red'},
		{label: t('register.greenHouse'), value: 'green'},
		{label: t('register.purpleHouse'), value: 'purple'},
		{label: t('register.blueHouse'), value: 'blue'},
	];

	const statusSelectItems = [
		{label: t('register.working'), value: 'working'},
		{label: t('register.studying'), value: 'studying'},
		{label: t('register.unemployed'), value: 'unemployed'},
		{label: t('register.retired'), value: 'retired'},
	];

	const membershipSelectItems = [
		{label: t('register.generalMembership'), value: 'general'},
		{label: t('register.permanentMembership'), value: 'permanent'},
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
					<Text category='h6' style={styles.heading}>{t('register.personalParticulars')}</Text>

					<Text style={styles.label}>{t('register.englishName')}</Text>
					<Input
						placeholder='Amy Chan'
						style={styles.inputBox}
						textStyle={styles.inputBoxText}
					/>

					<Text style={styles.label}>{t('register.chineseName')}</Text>
					<Input
						placeholder='陳小美'
						style={styles.inputBox}
					/>

					<Text style={styles.label}>{t('register.email')}</Text>
					<Input
						placeholder='amychan@gmail.com'
						style={styles.inputBox}
					/>

					<Text style={styles.label}>{t('register.contactNumber')}</Text>
					<Input
						placeholder='99887766'
						style={styles.inputBox}
					/>

					<Text style={styles.label}>{t('register.address')}</Text>
					<Input
						multiline={true}
						style={styles.inputBox}
						textStyle={styles.textArea}
					/>

				</Layout>
				<Layout style={styles.tab} level='1'>
					<Text category='h6' style={styles.heading}>{t('register.graduationInformation')}</Text>

					<Text style={styles.label}>{t('register.yearOfGraduation')}</Text>
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

					
					<Text style={styles.label}>{t('register.class')}</Text>
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

					<Text style={styles.label}>{t('register.house')}</Text>
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
					<Text category='h6' style={styles.heading}>{t('register.currentStatus')}</Text>

					<Text style={styles.label}>{t('register.status')}</Text>
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

					<Text style={styles.label}>{t('register.institution')}</Text>
					<Input
						placeholder=''
						style={styles.inputBox}
					/>

					<Text style={styles.label}>{t('register.additionalInformation')}</Text>
					<Input
						multiline={true}
						style={styles.inputBox}
						textStyle={styles.textArea}
					/>

					<View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
						<Text style={styles.label}>{t('register.shareStatus')}</Text>
						<Switch
							trackColor={{false: '#767577', true: '#7CC4EB'}}
							onValueChange={(isChecked): void => {
								setShareStatusChecked(isChecked);
							}}
							value={shareStatusChecked}
						/>
					</View>


				</Layout>
				<Layout style={styles.tab} level='1'>
					<Text category='h6' style={styles.heading}>{t('register.alumniAssociation')}</Text>

					<Text style={styles.label}>{t('register.membership')}</Text>
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
						<Text style={styles.label}>{t('register.fee')}</Text>
						<Text style={styles.label}>
							${selectedMembership=='permanent'?'1000':'100'}
						</Text>
					</View>

					<View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20}}>
						<Text style={styles.label}>{t('register.receiveNews')}</Text>
						<Switch
							trackColor={{false: '#767577', true: '#7CC4EB'}}
							onValueChange={(isChecked): void => {
								setReceiveNewsChecked(isChecked);
							}}
							value={receiveNewsChecked}
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
							<Text style={{color: '#16297C', marginLeft: 5, width: 180}}>{t('register.membershipInfo')}</Text>
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
					<Text>{t('register.cancel')}</Text>

					<Layout style={{flexDirection: "row", marginTop: 10, justifyContent: 'space-between'}}>
						<Button 
							status="basic"
							style={styles.closeDialogButton}
							onPress={() => {setVisible(false)
								router.dismiss();
							}}>{t('register.yes')}</Button>
						<Button 
							style={{...styles.closeDialogButton, ...styles.highlightDialogButton}}
							onPress={() => setVisible(false)}>{t('register.no')}</Button>
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
		marginTop: 2,
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
		marginTop: 2,
		marginBottom: 20,
		borderRadius: 5,
		minHeight: 64,
	},
	dropdown: {
		marginTop: 2,
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