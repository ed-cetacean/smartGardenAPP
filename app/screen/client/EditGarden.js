
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

const EditGardenScreen = () => {
    const route = useRoute();
    const { gardenId } = route.params;
    const navigation = useNavigation();
    const { themePallete } = useTheme();

    // ---------------------------------------------------------------------- //

    const [ gardenData, setGardenData ] = useState({
        name: '', description: '', longitude: '', latitude: '', userId: '', sensorPackId: '',
    });

    const [ isLoading, setIsLoading ] = useState(false);
    let isDisabled = gardenData.name.trim() === '' || gardenData.description.trim() === '';


    // ---------------------------------------------------------------------- //

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${MainSG}jardin/${gardenId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.error(data);
                    setGardenData(data);
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
        setGardenData({ ...gardenData, [field]: value });
    };

    // ---------------------------------------------------------------------- //

    const handleSaveChanges = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${MainSG}jardin/${gardenId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gardenData)
            });

            if (response.ok) {
                console.log('Se han actualizado los datos del jardín.');
                navigation.goBack();
            } else {
                console.error('ERROR: Ha ocurrido un error al intentar actualizar los datos del jardín.');
            }
        } catch (error) {
            console.error('ERROR: Ocurrió un problema al intentar actualizar los datos del jardín.', error);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>
            <InputCW
                placeholder='Nombre'
                value={gardenData.name}
                onChangeText={(text) => handleChange('name', text)}
                leftIcon={<Icon name='at' size={SIZES.xLarge} color={COLORS.accent} />}
                autoCapitalize='none'
                inputMode='email'
                maxLength={32}
            />

            <InputCW
                placeholder='Descripción'
                value={gardenData.description}
                onChangeText={(text) => handleChange('description', text)}
                leftIcon={<Icon name='account' size={SIZES.xLarge} color={COLORS.accent} />}
                autoCapitalize='words'
                maxLength={32}
            />



            <RNBounceable onPress={handleSaveChanges} disabled={isLoading || isDisabled}
                style={[ styles.saveButton, { backgroundColor: isLoading || isDisabled ? COLORS.disabled : COLORS.accent } ]} >
                {isLoading ? (
                    <Flow size={SIZES.xLarge} color={COLORS.light} />
                ) : (
                    <Text style={[styles.saveText, { color: isLoading || isDisabled ? COLORS.alterDisabled : COLORS.disabled} ]}>GUARDAR</Text>
                )}
            </RNBounceable>

        </View>
    );
};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 40,
    },
    saveButton: {
        backgroundColor: COLORS.accent,
        borderRadius: 4,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    saveText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: SIZES.medium,
    },
});

// -------------------------------------------------------------------------- //

export default EditGardenScreen;

// -------------------------------------------------------------------------- //
