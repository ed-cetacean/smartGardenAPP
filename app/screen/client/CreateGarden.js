
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import InputCW from '../../../components/Input';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';
import { useUser } from '../../../core/auth/UserProvider';

import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Flow } from 'react-native-animated-spinkit';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// -------------------------------------------------------------------------- //

const CreateGardenScreen = () => {
    const { user } = useUser();
    const navigation = useNavigation();
    const { themePallete } = useTheme();

    const [ isSaving, setIsSaving ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ userSensors, setUserSensors ] = useState([]);
    const [ selectedSensorPack, setSelectedSensorPack ] = useState(null);

    const [ newGardenInfo, setNewGardenInfo ] = useState({
        name: '', description: '', longitude: '32.468164', latitude: '-116.831490', userId: user.id, sensorPackId: null,
    });

    let isDisabled = newGardenInfo.name.trim() === '' || newGardenInfo.description.trim() === '' ||
        newGardenInfo.longitude.trim() === '' || newGardenInfo.latitude.trim() === null;

    // ---------------------------------------------------------------------- //

    // Carga los paquetes de sensores disponibles del usuario.
    useEffect(() => {
        const fetchUserSensorPacks = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`${MainSG}SensorPack/unassigned/${user.id}`, {
                    method: 'GET', headers: { 'Content-Type': 'application/json' }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserSensors(data);
                } else {
                    console.error('ERROR: Ha ocurrido un error al intentar cargar los paquetes de sensores.');
                }
            } catch (error) {
                console.error('ERROR: No se pudieron cargar los paquetes de sensores.', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserSensorPacks();
    }, []);

    // Ingresa el paquete de sensores seleccionado.
    useEffect(() => {
        setNewGardenInfo((prevInfo) => ({ ...prevInfo, sensorPackId: selectedSensorPack }));
    }, [selectedSensorPack]);

    // ---------------------------------------------------------------------- //

    const handleChange = (field, value) => {
        setNewGardenInfo({ ...newGardenInfo, [field]: value });
    };

    // ---------------------------------------------------------------------- //

    const handleCreateGarden = async () => {
        setIsSaving(true);

        try {
            const response = await fetch(`${MainSG}Jardin`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newGardenInfo),
            });

            if (response.ok) {
                console.log('Jardín creado con éxito');
                navigation.navigate('Gardens');
            } else {
                console.error('ERROR: Ha ocurrido un error al intentar crear el jardín.');
            }
        } catch (error) {
            console.error('ERROR: Ocurrió un problema al intentar crear el jardín.', error);
        } finally {
            setIsSaving(false);
        }
    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* TITULO */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>CREAR JARÐÍN</Text>
            </View>

            <InputCW
                placeholder='Nombre'
                value={newGardenInfo.name}
                onChangeText={(text) => handleChange('name', text)}
                leftIcon={<Icon name='circle-edit-outline' size={SIZES.xLarge} color={COLORS.accent} />}
                autoCapitalize='words'
                maxLength={32}
            />

            <InputCW
                placeholder='Descripción'
                value={newGardenInfo.description}
                onChangeText={(text) => handleChange('description', text)}
                leftIcon={<Icon name='circle-edit-outline' size={SIZES.xLarge} color={COLORS.accent} />}
                autoCapitalize='words'
                maxLength={32}
            />

            {/* Selección del paquete de sensores */}
            <View style={styles.pickerContainer}>
                <View style={styles.pickerTitleContainer}>
                    <Icon name='package' style={styles.pickerIcon} size={SIZES.large + 2} color={COLORS.accent} />
                    <Text style={[ styles.pickerLabel, { color: themePallete.input } ]}>Paquete de sensores</Text>
                </View>

                <Picker selectedValue={selectedSensorPack} style={{ color: themePallete.input }}
                    itemStyle={[ styles.pickerElements, { color: themePallete.input } ]}
                    onValueChange={(itemValue) => setSelectedSensorPack(itemValue)}
                    dropdownIconColor={COLORS.accent} dropdownIconRippleColor={themePallete.alterText}>

                    <Picker.Item style={{ color: COLORS.accent }}
                        label='Seleccione un paquete' value={null} />

                    {userSensors.map((sensorPack) => (
                        <Picker.Item key={sensorPack.id} value={sensorPack.id}
                            label={`${sensorPack.id}: ${sensorPack.sensorPackTypeName}`}
                        />
                    ))}
                </Picker>
            </View>

            <RNBounceable onPress={handleCreateGarden} disabled={isLoading || isDisabled}
                style={[styles.saveButton, { backgroundColor: isLoading || isDisabled ? COLORS.disabled : COLORS.accent }]} >
                {isLoading ? (
                    <Flow size={SIZES.xLarge} color={COLORS.light} />
                ) : (
                    <Text style={[styles.saveText, { color: isLoading || isDisabled ? COLORS.alterDisabled : COLORS.disabled }]}>GUARDAR</Text>
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

    pickerContainer: {
        marginVertical: 4,
    },

    pickerTitleContainer: {
        width: '100%', height: 60,
        flexDirection: 'row', alignItems: 'center',
    },

    pickerIcon: {
        marginLeft: 15, marginRight: 15,
    },

    pickerLabel: {
        fontSize: SIZES.medium,
    },

    // ---------------------------------------------------------------------- //

    pickerElements: {
        opacity: .92,
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

export default CreateGardenScreen;

// -------------------------------------------------------------------------- //