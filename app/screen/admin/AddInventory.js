
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import InputCW from '../../../components/Input';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Flow } from 'react-native-animated-spinkit';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// -------------------------------------------------------------------------- //

const AddInventoryScreen = () => {
    const route = useRoute();
    const { userId } = route.params;
    const navigation = useNavigation();
    const { themePallete } = useTheme();

    const [ userData, setUserData ] = useState({
        email: '', firstName: '', lastName: '',
        street: '', zip: '', city: '', state: '', country: ''
    });

    const isDisabled = userData.email.trim() === '' || userData.firstName.trim() === '' || userData.lastName.trim() === '' ||
        userData.street.trim() === '' || userData.zip.trim() === '' || userData.city.trim() === '' || userData.state.trim() === '' || userData.country.trim() === '';

    const [ isLoading, setIsLoading ] = useState(false);

    // ---------------------------------------------------------------------- //

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${MainSG}Usuario/${userId}`, {
                    method: 'GET', headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('ERROR: Ha ocurrido un error al intentar cargar los datos del usuario.');
                }
            } catch (error) {
                console.error('ERROR: No se pudieron cargar los datos del usuario.', error);
            }
        };

        fetchUserData();
    }, []);

    // ---------------------------------------------------------------------- //

    const handleChange = (field, value) => {
        setUserData({ ...userData, [field]: value });
    };

    // ---------------------------------------------------------------------- //

    const handleSaveChanges = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${MainSG}Usuario/${userId}`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                console.log('Se han actualizado los datos del usuario.');
                navigation.navigate('Users');
            } else {
                console.error('ERROR: Ha ocurrido un error al intentar actualizar los datos del usuario.');
            }
        } catch (error) {
            console.error('ERROR: Ocurrió un problema al intentar actualizar los datos del usuario.', error);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------------------------------------------------------------- //

    const handleDeleteUser = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${MainSG}Usuario/${userId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                console.log('Se ha eliminado el usuario.');
                navigation.navigate('Users');
            } else {
                console.error('ERROR: Ha ocurrido un error al intentar eliminar el usuario.');
            }
        } catch (error) {
            console.error('ERROR: Ocurrio un problema al intentar eliminar el usuario.', error);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* TITULO */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>AUMENTAR INVENTARIO</Text>
            </View>

            <InputCW
                placeholder='Correo electrónico'
                value={userData.email}
                onChangeText={(text) => handleChange('email', text)}
                leftIcon={<Icon name='at' size={SIZES.xLarge} color={COLORS.accent} />}
                autoCapitalize='none'
                inputMode='email'
                maxLength={64}
            />

            <InputCW
                placeholder='Nombres'
                value={userData.firstName}
                onChangeText={(text) => handleChange('firstName', text)}
                leftIcon={<Icon name='account' size={SIZES.xLarge} color={COLORS.accent} />}
                autoCapitalize='words'
                maxLength={64}
            />

            <InputCW
                placeholder='Apellidos'
                value={userData.lastName}
                onChangeText={(text) => handleChange('lastName', text)}
                leftIcon={<Icon name='account' size={SIZES.xLarge} color={COLORS.accent} />}
                autoCapitalize='words'
                maxLength={128}
            />

            <InputCW
                placeholder='Calle'
                value={userData.street}
                onChangeText={(text) => handleChange('street', text)}
                leftIcon={<Icon name='road' size={SIZES.xLarge} color={COLORS.accent} />}
                autoCapitalize='words'
                maxLength={64}
            />

            <InputCW
                placeholder='Código Postal'
                value={userData.zip}
                onChangeText={(text) => handleChange('zip', text)}
                leftIcon={<Icon name='mailbox' size={SIZES.xLarge} color={COLORS.accent} />}
                inputMode='numeric'
                maxLength={5}
            />

            <InputCW
                placeholder='Ciudad'
                value={userData.city}
                onChangeText={(text) => handleChange('city', text)}
                leftIcon={<Icon name='city' size={SIZES.xLarge} color={COLORS.accent} />}
                autoCapitalize='words'
                maxLength={64}
            />

            <InputCW
                placeholder='Estado'
                value={userData.state}
                onChangeText={(text) => handleChange('state', text)}
                leftIcon={<Icon name='map' size={SIZES.xLarge} color={COLORS.accent} />}
                autoCapitalize='words'
                maxLength={64}
            />

            <InputCW
                placeholder='País'
                value={userData.country}
                onChangeText={(text) => handleChange('country', text)}
                leftIcon={<Icon name='earth' size={SIZES.xLarge} color={COLORS.accent} />}
                autoCapitalize='words'
                maxLength={64}
            />

            <View style={styles.buttonContainer}>
                <RNBounceable onPress={() => { handleDeleteUser();} } disabled={isLoading}
                    style={[ styles.saveButton, { backgroundColor: isLoading ? COLORS.disabled : COLORS.accent } ]} >
                    {isLoading ? (
                        <Flow size={SIZES.xLarge} color={COLORS.light} />
                    ) : (
                        <Text style={[styles.saveText, { color: isLoading ? COLORS.alterDisabled : COLORS.disabled} ]}>INSPECCIONAR</Text>
                    )}
                </RNBounceable>

                <RNBounceable onPress={() => { handleSaveChanges(); }} disabled={isLoading || isDisabled}
                    style={[ styles.saveButton, { backgroundColor: isLoading || isDisabled ? COLORS.disabled : COLORS.accent } ]} >
                    {isLoading ? (
                        <Flow size={SIZES.xLarge} color={COLORS.light} />
                    ) : (
                        <Text style={[styles.saveText, { color: isLoading || isDisabled ? COLORS.alterDisabled : COLORS.disabled} ]}>GUARDAR</Text>
                    )}
                </RNBounceable>
            </View>

        </View>
    );
};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 40, paddingTop: 0,
    },

    // ---------------------------------------------------------------------- //

    titleContainer: {
        width: '100%', height: '10%',
        alignItems: 'center', justifyContent: 'center',
    },

    titleText: {
        fontWeight: 'bold',
        color: COLORS.accent,
        fontSize: SIZES.large + 2,
    },

    // ---------------------------------------------------------------------- //

    saveButton: {
        width: '48%',
        padding: 15,
        marginTop: 20,
        borderRadius: 4,
        alignItems: 'center',
    },

    saveText: {
        fontWeight: 'bold',
        fontSize: SIZES.medium,
    },

    // ---------------------------------------------------------------------- //

    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

// -------------------------------------------------------------------------- //

export default AddInventoryScreen;

// -------------------------------------------------------------------------- //
