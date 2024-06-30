
// -------------------------------------------------------------------------- //

import { SourceIMG } from '../../../ui/Images';
import { COLORS, SIZES } from '../../../ui/Styles';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { StyleSheet, ImageBackground, View, Image, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const StartScreen = () => {
    const navigation = useNavigation();

    // ---------------------------------------------------------------------- //

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    const handleSignupPress = () => {
        navigation.navigate('Signup');
    };

    // ---------------------------------------------------------------------- //

    return (
        <ImageBackground style={styles.mainContainer} source={SourceIMG.startBG} blurRadius={12}>
            <SafeAreaView style={styles.safeContainer}>

                {/* Logotipo de la aplicación */}
                <Image source={SourceIMG.mainLogo} style={styles.imageApp} />

                {/* Botones para accesar tanto a LOGIN como a SIGNUP */}
                <View style={styles.buttonContainer}>
                    <RNBounceable style={styles.button} onPress={handleLoginPress}>
                        <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
                    </RNBounceable>

                    <RNBounceable style={styles.button} onPress={handleSignupPress}>
                        <Text style={styles.buttonText}>CREAR CUENTA</Text>
                    </RNBounceable>
                </View>

            </SafeAreaView>
        </ImageBackground>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
    },

    safeContainer: {
        flex: 1, backgroundColor: COLORS.darkTransparent,
        alignItems: 'center', justifyContent: 'center',
    },

    imageApp: {
        marginTop: 120,
        marginBottom: 180,
        width: 320, height: 120,
    },

    buttonContainer: {
        width: '70%',
    },

    button: {
        borderRadius: 4,
        marginVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', height: 50,
        backgroundColor: COLORS.accent,
    },

    buttonText: {
        fontWeight: 'bold',
        color: COLORS.disabled,
        fontSize: SIZES.medium - 2,
    },

});

// -------------------------------------------------------------------------- //

export default StartScreen;

// -------------------------------------------------------------------------- //