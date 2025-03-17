import { createRef, useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Platform, Share, useColorScheme, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTranslation } from "react-i18next";

export default function ModalScreen() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme || "light"];

	return (
		<ScrollView style={styles.container}>
	
		<View style={styles.section}>
			<Text style={styles.subtitle}>1. Acceptance of Terms</Text>
			<Text style={styles.paragraph}>
				By using the App, you agree to comply with and be bound by these Terms and our Privacy Policy. We may modify or update these Terms at any time, and the changes will be effective immediately upon posting.
			</Text>
		</View>

		<View style={styles.section}>
			<Text style={styles.subtitle}>2. User Eligibility</Text>
			<Text style={styles.paragraph}>
				The App is intended for alumni of [Your Institution Name]. You must be at least 18 years old to use the App.
			</Text>
		</View>

		<View style={styles.section}>
			<Text style={styles.subtitle}>3. Account Registration</Text>
			<Text style={styles.paragraph}>
				To use certain features of the App, you may be required to register for an account. You agree to provide accurate and complete information during registration and to update your information as necessary. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
			</Text>
		</View>

		<View style={styles.section}>
			<Text style={styles.subtitle}>4. User Conduct</Text>
			<Text style={styles.paragraph}>
				You agree to use the App only for lawful purposes. You must not violate any applicable laws, regulations, or third-party rights. You must not engage in any conduct that could damage, disable, overburden, or impair the App. You must not post any content that is defamatory, offensive, or unlawful.
			</Text>
		</View>

		<View style={styles.section}>
			<Text style={styles.subtitle}>5. Privacy</Text>
			<Text style={styles.paragraph}>
				Your use of the App is also governed by our Privacy Policy. By using the App, you consent to the collection and use of your personal information as described in the Privacy Policy.
			</Text>
		</View>

		<View style={styles.section}>
			<Text style={styles.subtitle}>6. Intellectual Property</Text>
			<Text style={styles.paragraph}>
				The content and features of the App, including but not limited to text, graphics, logos, and software, are the property of [Your Company Name] and are protected by copyright, trademark, and other intellectual property laws.
			</Text>
		</View>

		<View style={styles.section}>
			<Text style={styles.subtitle}>7. Termination</Text>
			<Text style={styles.paragraph}>
				We may suspend or terminate your account if you violate these Terms. You may also terminate your account at any time by contacting us.
			</Text>
		</View>

		<View style={styles.section}>
			<Text style={styles.subtitle}>8. Disclaimer of Warranties</Text>
			<Text style={styles.paragraph}>
				The App is provided "as is" and "as available." We do not warrant that the App will be error-free or uninterrupted, and we disclaim all warranties, whether express or implied.
			</Text>
		</View>

		<View style={styles.section}>
			<Text style={styles.subtitle}>9. Limitation of Liability</Text>
			<Text style={styles.paragraph}>
				To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the App.
			</Text>
		</View>

		<View style={styles.section}>
			<Text style={styles.subtitle}>10. Indemnification</Text>
			<Text style={styles.paragraph}>
				You agree to indemnify and hold harmless [Your Company Name], its affiliates, officers, employees, and agents from any claims, damages, or liabilities arising from your use of the App.
			</Text>
		</View>

		<View style={styles.section}>
			<Text style={styles.subtitle}>11. Governing Law</Text>
			<Text style={styles.paragraph}>
				These Terms shall be governed by the laws of [Insert Jurisdiction]. Any disputes will be resolved in the courts of [Insert Jurisdiction].
			</Text>
		</View>

		<View style={styles.section}>
			<Text style={styles.subtitle}>12. Contact Information</Text>
			<Text style={styles.paragraph}>
				If you have any questions or concerns about these Terms, please contact us at [Your Contact Information].
			</Text>
		</View>
	</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		position: 'relative',
		padding: 20,
	},
	header: {
		flexShrink: 1,
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	date: {
		fontSize: 14,
		textAlign: 'center',
		marginTop: 5,
		color: 'gray',
	},
	section: {
		marginBottom: 20,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: '600',
	},
	paragraph: {
		fontSize: 14,
		lineHeight: 22,
		marginTop: 5,
	},
});