
// -------------------------------------------------------------------------- //

import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';
import { useUser } from '../../../core/auth/UserProvider';

import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { StyleSheet, ScrollView, View, Text, Switch } from 'react-native';

// -------------------------------------------------------------------------- //

const SettingsScreen = () => {
    const { logout } = useUser();
    const navigation = useNavigation();
    const { toggleTheme, themePallete, isDark } = useTheme();

    // ---------------------------------------------------------------------- //

    const handleFAQ = () => {
        navigation.navigate('Gardens');
    };

    const handleInfo = () => {
        navigation.navigate('About');
    };

    const handleLogout = () => {
        logout();
    };

    // ---------------------------------------------------------------------- //

    return (
        <ScrollView style={[ styles.mainContainer, { backgroundColor: themePallete.background } ]}>

            {/* Cambiar tema */}
            <View style={styles.optionContainer}>
                <MaterialCommunityIcons name={ isDark ? 'weather-night' : 'weather-sunny' }
                    size={SIZES.xLarge} color={ COLORS.accent } style={styles.iconOption} />

                <Text style={[ styles.textOption, { color: themePallete.text } ]}>Tema oscuro</Text>

                <Switch value={isDark} onValueChange={toggleTheme} style={styles.switchOption}
                    trackColor={{ false: COLORS.disabled, true: COLORS.alterDisabled }}
                    thumbColor={COLORS.accent}
                />
            </View>

            {/* Otras opciones... Hehe */}
            <View style={styles.optionContainer}>
                <RNBounceable style={[ styles.optionAltContainer, styles.logoutContainer ]} onPress={handleFAQ} >
                    <MaterialCommunityIcons name='comment-question' size={SIZES.xLarge} color={ COLORS.accent } style={styles.iconOption} />
                    <Text style={[ styles.textOption, { color: themePallete.text } ]}>Dudas frecuentes</Text>
                </RNBounceable>
            </View>

            <View style={styles.optionContainer}>
                <RNBounceable style={[ styles.optionAltContainer, styles.logoutContainer ]} onPress={handleInfo} >
                    <MaterialCommunityIcons name='information' size={SIZES.xLarge} color={ COLORS.accent } style={styles.iconOption} />
                    <Text style={[ styles.textOption, { color: themePallete.text } ]}>información</Text>
                </RNBounceable>
            </View>

            {/* Cerrar sesión */}
            <RNBounceable style={[ styles.optionContainer, styles.logoutContainer ]} onPress={handleLogout} >
                <MaterialCommunityIcons name='logout' size={SIZES.xLarge} color={COLORS.accent} style={styles.iconOption} />
                <Text style={[ styles.textOption, { color: themePallete.text } ]}>Cerrar sesión</Text>
            </RNBounceable>

        </ScrollView>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
    },

    optionAltContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%', height: 72,

        marginVertical: 4,
        borderBottomWidth: .6,
        borderColor: COLORS.alterDisabled,
    },

    optionContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '82%', height: 72,

        marginVertical: 4,
        paddingHorizontal: 22,
        borderBottomWidth: .6,
        borderColor: COLORS.alterDisabled,
    },

    iconOption: {
        paddingRight: 12,
    },

    textOption: {
        fontWeight: '500',
        fontSize: SIZES.medium,
    },

    switchOption: {
        marginRight: 24,
        position: 'absolute', right: 0,
    },

    logoutContainer: {
        borderBottomWidth: 0,
    },

});

// -------------------------------------------------------------------------- //

export default SettingsScreen;

// -------------------------------------------------------------------------- //
