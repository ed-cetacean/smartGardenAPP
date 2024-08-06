
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import InputCW from '../../../components/Input';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { StyleSheet, KeyboardAvoidingView, ScrollView, View, Platform, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const SignupScreen = () => {
    const navigation = useNavigation();
    const { themePallete } = useTheme();

    // ---------------------------------------------------------------------- //

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ street, setStreet ] = useState('');
    const [ zip, setZip ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ country, setCountry ] = useState('');

    const [ isLoading, setIsLoading ] = useState(false);
    const [ passwordVisible, setPasswordVisible ] = useState(false);

    const isLoginDisabled =
        email.trim() === '' || password.trim() === '' ||
        firstName.trim() === '' || lastName.trim() === '' ||
        street.trim() === '' || zip.trim() === '' ||
        city.trim() === '' || state.trim() === '' || country.trim() === '';

    // ---------------------------------------------------------------------- //

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSignup = async () => {
        setIsLoading(true); // Inicia el estado de carga.
        const userData = { email, password, firstName, lastName, street, zip, city, state, country };

        try {
            const response = await fetch(`${MainSG}Auth/register`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'REGISTRO',
                    text2: 'Usuario creado con exito.',
                    visibilityTime: 4500,
                })

                // console.log('Signup successful');
                navigation.goBack();
            } else {
                // console.log('ERROR: ', response.message);
                Toast.show({
                    type: 'error',
                    text1: 'ERROR',
                    text2: 'Ha ocurrido un error al intentar crear al usuario.',
                    visibilityTime: 4500,
                })
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'No se pudo crear un nuevo usuario.',
                visibilityTime: 4500,
            })

            // console.error('ERROR: Hubo un error al intentar conectar con el servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------------------------------------------------------------- //

    return (
        <KeyboardAvoidingView style={[styles.mainContainer, { backgroundColor: themePallete.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <View style={styles.welcomeContainer}>
                    <Text style={[ styles.titleText, { color: COLORS.accent } ]}>CREAR CUENTA</Text>
                    <Text style={[ styles.subtitleText, { color: themePallete.input } ]}>Ingrese sus datos para continuar</Text>
                </View>

                <View style={styles.formContainer}>
                <InputCW placeholder='Correo electrónico'
                        value={email} onChangeText={setEmail}
                        autoCapitalize='none' inputMode='email' maxLength={64}
                        leftIcon={<Icon name='at' size={SIZES.xLarge} color={COLORS.accent} />}
                    />

                    <InputCW placeholder='Nombres'
                        value={firstName} onChangeText={setFirstName}
                        autoCapitalize='words' maxLength={64}
                        leftIcon={<Icon name='account' size={SIZES.xLarge} color={COLORS.accent} />}
                    />

                    <InputCW placeholder='Apellidos'
                        value={lastName} onChangeText={setLastName}
                        autoCapitalize='words' maxLength={128}
                        leftIcon={<Icon name='account' size={SIZES.xLarge} color={COLORS.accent} />}
                    />

                    <InputCW placeholder='Calle'
                        value={street} onChangeText={setStreet}
                        autoCapitalize='words' maxLength={64}
                        leftIcon={<Icon name='road' size={SIZES.xLarge} color={COLORS.accent} />}
                    />

                    <InputCW placeholder='Código Postal'
                        value={zip} onChangeText={setZip}
                        inputMode='numeric' maxLength={5}
                        leftIcon={<Icon name='mailbox' size={SIZES.xLarge} color={COLORS.accent} />}
                    />

                    <InputCW placeholder='Ciudad'
                        value={city} onChangeText={setCity}
                        autoCapitalize='words' maxLength={64}
                        leftIcon={<Icon name='city' size={SIZES.xLarge} color={COLORS.accent} />}
                    />

                    <InputCW placeholder='Estado'
                        value={state} onChangeText={setState}
                        autoCapitalize='words' maxLength={64}
                        leftIcon={<Icon name='map' size={SIZES.xLarge} color={COLORS.accent} />}
                    />

                    <InputCW placeholder='País'
                        value={country} onChangeText={setCountry}
                        autoCapitalize='words' maxLength={64}
                        leftIcon={<Icon name='earth' size={SIZES.xLarge} color={COLORS.accent} />}
                    />

                    <InputCW placeholder='Contraseña'
                        value={password} onChangeText={setPassword}
                        secureTextEntry={!passwordVisible} autoCapitalize='none' maxLength={64}
                        leftIcon={<Icon name='key' size={SIZES.large} color={COLORS.accent} />}
                        rightIcon={
                            <RNBounceable style={styles.passwordButton} onPress={togglePassword} >
                                <Icon name={passwordVisible ? "eye-off" : "eye"} size={SIZES.large} color={COLORS.accent} />
                            </RNBounceable>
                        }
                    />

                    <RNBounceable disabled={isLoading || isLoginDisabled} bounceFriction={0} onPress={handleSignup}
                        style={[ styles.continueButton, { backgroundColor: isLoginDisabled ? COLORS.disabled : COLORS.accent } ]} >
                        <Text style={[ styles.continueText, { color: isLoginDisabled ? COLORS.alterDisabled : COLORS.disabled} ]}>CONTINUAR</Text>
                    </RNBounceable>

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
        borderRadius: 4,
        width: '100%', height: 60,
        marginTop: 22, marginBottom: 18,

        alignItems: 'center',
        justifyContent: 'center',
    },

    continueText: {
        fontWeight: 'bold',
        fontSize: SIZES.medium,
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

export default SignupScreen;

// -------------------------------------------------------------------------- //
