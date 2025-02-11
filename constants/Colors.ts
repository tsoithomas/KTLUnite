const primaryColorLight = '#7CC4EB';
const secondaryColorLight = '#16297C';
const tintColorDark = '#fff';

export default {
	light: {
		text: secondaryColorLight,
		background: '#fff',
		tint: primaryColorLight,
		tabIconDefault: '#ffffff',
		tabIconSelected: 'rgba(255,255,255,0.6)',
		tabIconBackground: secondaryColorLight,
		buttonBackground: secondaryColorLight,
	},
	dark: {
		text: '#fff',
		background: '#000',
		tint: tintColorDark,
		tabIconDefault: '#ccc',
		tabIconSelected: tintColorDark,
		tabIconBackground: secondaryColorLight,
		buttonBackground: secondaryColorLight,
	},
};
