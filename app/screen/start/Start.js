
// -------------------------------------------------------------------------- //

import { SourceIMG } from '../../../ui/Images';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';
import { useUser } from '../../../core/auth/UserProvider';

import React, { useEffect, useState } from 'react';
import { Flow } from 'react-native-animated-spinkit';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { StyleSheet, ImageBackground, View, Image, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const StartScreen = () => {
    const { user } = useUser();
    const navigation = useNavigation();
    const { themePallete } = useTheme();

    const [ loading, setLoading ] = useState(true);
    const [ showContent, setShowContent ] = useState(false);

    // ---------------------------------------------------------------------- //

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    const handleSignupPress = () => {
        navigation.navigate('Signup');
    };

    // ---------------------------------------------------------------------- //

    useEffect(() => {

        if (user) {
            if (user.role === 'client') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomNavClient' }],
                });
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomNavAdmin' }],
                });
            }
        }

    }, [user, navigation]);

    // ---------------------------------------------------------------------- //


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <View style={[styles.mainContainer, { backgroundColor: themePallete.background, alignItems: 'center', justifyContent: 'center' }]}>
                <Flow size={SIZES.xxLarge * 2} color={COLORS.accent} />
            </View>
        );
    }

    return (
        <ImageBackground style={styles.mainContainer} source={SourceIMG.startBG} blurRadius={12}>
            <SafeAreaView style={styles.safeContainer}>
                <Image source={SourceIMG.mainLogo} style={styles.imageApp} />
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
