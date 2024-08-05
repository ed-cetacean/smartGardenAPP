
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import InputCW from '../../../components/Input';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Swing, Flow } from 'react-native-animated-spinkit';
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
    const [ fetchLoading, setFetchLoading ] = useState(false);
    let isDisabled = gardenData.name.trim() === '' || gardenData.description.trim() === '';


    // ---------------------------------------------------------------------- //

    useEffect(() => {
        const fetchGardenData = async () => {
            setFetchLoading(true);

            try {
                const response = await fetch(`${MainSG}jardin/${gardenId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    const data = await response.json();
                    setGardenData(data);
                } else {
                    console.error('ERROR: Ha ocurrido un error al intentar cargar los datos del usuario.');
                }
            } catch (error) {
                console.error('ERROR: No se pudieron cargar los datos del usuario.', error);
            } finally {
                setFetchLoading(false);
            }
        };

        fetchGardenData();
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
                navigation.navigate('Gardens');
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

    if (fetchLoading) {
        return (
            <View style={[styles.mainContainer, { backgroundColor: themePallete.background, alignItems: 'center', justifyContent: 'center', }]}>
                <Swing size={SIZES.xxLarge * 1.8} color={COLORS.accent} />
            </View>
        );
    }

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* TITULO */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>EDITAR JARÐÍN</Text>
            </View>

            <InputCW
                placeholder='Nombre'
                value={gardenData.name}
                onChangeText={(text) => handleChange('name', text)}
                leftIcon={<Icon name='circle-edit-outline' size={SIZES.xLarge} color={COLORS.accent} />}
                autoCapitalize='words'
                maxLength={32}
            />

            <InputCW
                placeholder='Descripción'
                value={gardenData.description}
                onChangeText={(text) => handleChange('description', text)}
                leftIcon={<Icon name='circle-edit-outline' size={SIZES.xLarge} color={COLORS.accent} />}
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
        flex: 1, padding: 40, paddingTop: 0,
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
        padding: 15,
        marginTop: 20,
        borderRadius: 4,
        alignItems: 'center',
    },

    saveText: {
        fontWeight: 'bold',
        fontSize: SIZES.medium,
    },
});

// -------------------------------------------------------------------------- //

export default EditGardenScreen;

// -------------------------------------------------------------------------- //
