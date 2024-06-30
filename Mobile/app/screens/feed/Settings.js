
// -------------------------------------------------------------------------- //

import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { StyleSheet, ScrollView, View, Text, Switch } from 'react-native';

// -------------------------------------------------------------------------- //

const SettingsScreen = () => {
    const navigation = useNavigation();
    const { toggleTheme, themePallete, isDark } = useTheme();

    const handleLogout = () => {
        navigation.reset({ index: 0,
            routes: [{ name: 'Start' }],
        });
    };

    // ---------------------------------------------------------------------- //

    return (
        <ScrollView style={[ styles.mainContainer, { backgroundColor: themePallete.background } ]}>

            {/* Cambiar tema */}
            <View style={styles.optionContainer}>
                <MaterialCommunityIcons name={isDark ? 'weather-night' : 'weather-sunny' }
                    size={SIZES.xLarge} color={ COLORS.accent } style={styles.iconOption} />

                <Text style={[ styles.textOption, { color: themePallete.text } ]}>Tema oscuro</Text>

                <Switch value={isDark} onValueChange={toggleTheme} style={styles.switchOption}
                    trackColor={{ false: COLORS.disabled, true: COLORS.alterDisabled }}
                    thumbColor={COLORS.accent}
                />
            </View>

            {/* Otras opciones... Hehe */}
            <View style={styles.optionContainer}></View>
            <View style={styles.optionContainer}></View>

            {/* Cerrar sesión */}
            <RNBounceable style={[ styles.optionContainer, styles.logoutContainer ]} onPress={handleLogout} >
                <MaterialCommunityIcons name="logout" size={SIZES.xLarge} color={COLORS.accent} style={styles.iconOption} />
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