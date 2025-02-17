import { createRef, useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, useColorScheme } from 'react-native';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTranslation } from "react-i18next";
import { Button, Card, Input, Layout, Modal, Text, ViewPager } from '@ui-kitten/components';
import { FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { Image } from 'expo-image';
import { Connection } from '@/services/Connection'

export default function RegisterScreen() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme || "light"];
	
	const params = useLocalSearchParams<{ closeDialog: string, pageNumber: string, submit: string }>();
	const [visible, setVisible] = useState(false);
	const [pageNumber, setPageNumber] = useState(0);

	const [englishName, setEnglishName] = useState('');
	const [chineseName, setChineseName] = useState('');
	const [email, setEmail] = useState('');
	const [contactNumber, setContactNumber] = useState('');
	const [address, setAddress] = useState('');

	const [yearGraduation, setYearGraduation] = useState(null);
	const [classGraduation, setClassGraduation] = useState(null);
	const [houseGraduation, setHouseGraduation] = useState(null);

	const [currentStatus, setCurrentStatus] = useState(null);

	const [institution, setInstitution] = useState('');
	const [additionalInformation, setAdditionalInformation] = useState('');
	const [shareStatus, setShareStatus] = useState(true);

	const [membershipType, setMembershipType] = useState('general');
	const [receiveNews, setReceiveNews] = useState(true);

	useEffect(() => {
		if (params.closeDialog) {
			setVisible(true);
		}
	}, [params.closeDialog]);

	useEffect(() => {
		if (params.submit) {
			const data = {
				englishName: englishName, 
				chineseName: chineseName,
				email: email,
				contactNumber: contactNumber,
				address: address,
				yearGraduation: yearGraduation,
				classGraduation: classGraduation,
				houseGraduation: houseGraduation,
				currentStatus: currentStatus,
				institution: institution,
				additionalInfo: additionalInformation,
				shareStatus: shareStatus,
				membershipType: membershipType,
				receiveNews: receiveNews,
			}
			Connection.sendApplication(data);
		}
	}, [params.submit]);

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
		<ScrollView style={styles.container} 
		automaticallyAdjustKeyboardInsets={true}
		scrollEnabled={false}
		>

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
						value={englishName}
						onChangeText={(nextValue) => setEnglishName(nextValue)}
					/>

					<Text style={styles.label}>{t('register.chineseName')}</Text>
					<Input
						placeholder='陳小美'
						style={styles.inputBox}
						value={chineseName}
						onChangeText={(nextValue) => setChineseName(nextValue)}
					/>

					<Text style={styles.label}>{t('register.email')}</Text>
					<Input
						placeholder='amychan@gmail.com'
						style={styles.inputBox}
						value={email}
						onChangeText={(nextValue) => setEmail(nextValue)}
					/>

					<Text style={styles.label}>{t('register.contactNumber')}</Text>
					<Input
						placeholder='99887766'
						style={styles.inputBox}
						value={contactNumber}
						onChangeText={(nextValue) => setContactNumber(nextValue)}
					/>

					<Text style={styles.label}>{t('register.address')}</Text>
					<Input
						multiline={true}
						style={styles.inputBox}
						textStyle={styles.textArea}
						value={address}
						onChangeText={(nextValue) => setAddress(nextValue)}
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
						value={yearGraduation}
						onChange={item => {
							setYearGraduation(item.value);
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
						value={classGraduation}
						onChange={item => {
							setClassGraduation(item.value);
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
						value={houseGraduation}
						onChange={item => {
							setHouseGraduation(item.value);
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
						value={currentStatus}
						onChange={item => {
							setCurrentStatus(item.value);
						}}
					/>

					<Text style={styles.label}>{t('register.institution')}</Text>
					<Input
						placeholder=''
						style={styles.inputBox}
						value={institution}
						onChangeText={(nextValue) => setInstitution(nextValue)}
					/>

					<Text style={styles.label}>{t('register.additionalInformation')}</Text>
					<Input
						multiline={true}
						style={styles.inputBox}
						textStyle={styles.textArea}
						value={additionalInformation}
						onChangeText={(nextValue) => setAdditionalInformation(nextValue)}
					/>

					<View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
						<Text style={styles.label}>{t('register.shareStatus')}</Text>
						<Switch
							trackColor={{false: '#767577', true: '#7CC4EB'}}
							onValueChange={(isChecked): void => {
								setShareStatus(isChecked);
							}}
							value={shareStatus}
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
						value={membershipType}
						onChange={item => {
							setMembershipType(item.value);
						}}
					/>

					<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginBottom: 20}}>
						<Text style={styles.label}>{t('register.fee')}</Text>
						<Text style={styles.label}>
							${membershipType=='permanent'?'1000':'100'}
						</Text>
					</View>

					<View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20}}>
						<Text style={styles.label}>{t('register.receiveNews')}</Text>
						<Switch
							trackColor={{false: '#767577', true: '#7CC4EB'}}
							onValueChange={(isChecked): void => {
								setReceiveNews(isChecked);
							}}
							value={receiveNews}
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
			
		</ScrollView>


	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
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