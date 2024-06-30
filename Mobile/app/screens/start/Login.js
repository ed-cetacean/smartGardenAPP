
// -------------------------------------------------------------------------- //

import InputCW from '../../../components/Input';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { StyleSheet, KeyboardAvoidingView, ScrollView, View, Platform, Text, TouchableOpacity } from 'react-native';

// -------------------------------------------------------------------------- //

const LoginScreen = () => {
    const navigation = useNavigation();
    const { themePallete } = useTheme();

    // ---------------------------------------------------------------------- //

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ passwordVisible, setPasswordVisible ] = useState(false);

    const isLoginDisabled = email.trim() === '' || password.trim() === '';

    // ---------------------------------------------------------------------- //

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = () => {
        setIsLoading(true);
        navigation.reset({ index: 0,
            routes: [{ name: 'BottomNav' }],
        });
        setIsLoading(false);
    };

    const handleForgot = () => {
        navigation.navigate('Forgot');
    };

    // ---------------------------------------------------------------------- //

    return (
        <KeyboardAvoidingView style={[styles.mainContainer, { backgroundColor: themePallete.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <View style={styles.welcomeContainer}>
                    <Text style={[ styles.titleText, { color: COLORS.accent } ]}>INICIAR SESIÓN</Text>
                    <Text style={[ styles.subtitleText, { color: themePallete.input } ]}>Ingrese sus datos para continuar</Text>
                </View>

                <View style={styles.formContainer}>
                    <InputCW placeholder='Correo electrónico'
                        value={email} onChangeText={setEmail}
                        autoCapitalize='none'
                        leftIcon={<Icon name='at' size={SIZES.xLarge} color={COLORS.accent} />}
                    />

                    <InputCW placeholder='Contraseña'
                        value={password} onChangeText={setPassword}
                        secureTextEntry={!passwordVisible} autoCapitalize='none'
                        leftIcon={<Icon name='key' size={SIZES.large} color={COLORS.accent} />}
                        rightIcon={
                            <RNBounceable style={styles.passwordButton} onPress={togglePassword} >
                                <Icon name={passwordVisible ? "eye-off" : "eye"} size={SIZES.large} color={COLORS.accent} />
                            </RNBounceable>
                        }
                    />

                    <RNBounceable disabled={isLoading || isLoginDisabled} bounceFriction={0} onPress={handleLogin}
                        style={[ styles.continueButton, { backgroundColor: isLoginDisabled ? COLORS.disabled : COLORS.accent } ]} >
                        <Text style={[ styles.continueText, { color: isLoginDisabled ? COLORS.alterDisabled : COLORS.disabled} ]}>CONTINUAR</Text>
                    </RNBounceable>

                    <TouchableOpacity onPress={handleForgot} >
                        <Text style={styles.forgotText}>
                            ¿Ha olvidado su contraseña?
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
    },

    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    formContainer: {
        width: '70%',
    },

    passwordButton: {
        width: '100%', height: '100%',
        alignItems: 'center', justifyContent: 'center',
    },

    continueButton: {
        borderRadius: 6,
        width: '100%', height: 60,
        marginTop: 22, marginBottom: 18,

        alignItems: 'center',
        justifyContent: 'center',
    },

    continueText: {
        fontWeight: 'bold',
        fontSize: SIZES.medium,
    },

    forgotText: {
        alignSelf: 'center',
        color: COLORS.accent,
        fontSize: SIZES.small,
        paddingBottom: 80,
    },

    welcomeContainer: {
        width: '70%', paddingVertical: 80,
    },

    titleText: {
        fontSize: SIZES.xxLarge,
        fontWeight: 'bold', color: COLORS.c400,
    },

    subtitleText: {
        paddingBottom: 80,
        fontSize: SIZES.medium, color: COLORS.c100,
    },

});

// -------------------------------------------------------------------------- //

export default LoginScreen;

// -------------------------------------------------------------------------- //
