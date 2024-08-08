
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import InputCW from '../../../components/Input';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';
import { Flow } from 'react-native-animated-spinkit';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';

// -------------------------------------------------------------------------- //

const AddInventoryScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { themePallete } = useTheme();
    const { sensorPackId, sensorPackName, sensorPackStock, sensorPackPrice } = route.params;

    const [ newStockValue, setNewStockValue ] = useState(sensorPackStock);
    const [ newPriceValue, setNewPriceValue ] = useState((sensorPackPrice).toFixed(2));

    const [ isLoading, setIsLoading ] = useState(false);
    const isDisabled = newPriceValue === '';

    // ---------------------------------------------------------------------- //

    const handleInspection = async (id, name) => {
        navigation.navigate('SensorPacks', { ID: id, Name: name });
    };

    const handleSaveChanges = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${MainSG}inventario/update/${sensorPackId}`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newStock: newStockValue, newSalePrice: newPriceValue }),
            });

            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'ACTUALIZADO',
                    text2: 'Se ha actualizado el inventario.',
                    visibilityTime: 4500,
                })

                //console.log('Se ha actualizado el inventario.');
                navigation.navigate('Inventory');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'ERROR',
                    text2: 'Ha ocurrido un error al intentar actualizar el inventario.',
                    visibilityTime: 4500,
                })

                // console.error('Ha ocurrido un error al intentar actualizar el inventario.');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'No se pudo actualizar el inventario.',
                visibilityTime: 4500,
            })

            // console.error('No se puddo actualizar el inventario.', error);
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

            {/* EDICIÓN DE INFORMACIÓN */}
            <InputCW placeholder='Stock' value={String(newStockValue)}
                onChangeText={(value) => { const parsedValue = parseInt(value);
                    setNewStockValue(isNaN(parsedValue) ? '' : parsedValue);
                }} keyboardType="numeric"
            />

            <InputCW placeholder='Precio de venta'
                value={newPriceValue}
                keyboardType='decimal-pad' maxLength={6}
                leftIcon={<Icon name='attach-money' size={SIZES.xLarge} color={COLORS.accent} />}
                onChangeText={value => setNewPriceValue(value.toString())}
            />

            {/* BOTONES */}
            <View style={styles.buttonContainer}>
                <RNBounceable onPress={() => { handleInspection(sensorPackId, sensorPackName); } } disabled={isLoading}
                    style={[ styles.saveButton, { backgroundColor: isLoading ? COLORS.disabled : COLORS.accent } ]} >
                    {isLoading ? (
                        <Flow size={SIZES.xLarge} color={COLORS.light} />
                    ) : (
                        <Text style={[styles.saveText, { color: isLoading ? COLORS.alterDisabled : COLORS.disabled} ]}>INSPECCIONAR</Text>
                    )}
                </RNBounceable>

                <RNBounceable onPress={() => { handleSaveChanges(); }} disabled={isLoading || isDisabled || newStockValue < sensorPackStock || newStockValue > sensorPackStock + 10}
                    style={[ styles.saveButton, { backgroundColor: isLoading || isDisabled || newStockValue < sensorPackStock || newStockValue > sensorPackStock + 10 ? COLORS.disabled : COLORS.accent } ]} >
                    {isLoading ? (
                        <Flow size={SIZES.xLarge} color={COLORS.light} />
                    ) : (
                        <Text style={[styles.saveText, { color: isLoading || isDisabled || newStockValue < sensorPackStock || newStockValue > sensorPackStock + 10 ? COLORS.alterDisabled : COLORS.disabled} ]}>GUARDAR</Text>
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

    // ---------------------------------------------------------------------- //

    inputStock: {
        marginBottom: 20,
        borderColor: COLORS.accent,
        borderWidth: 2, borderRadius: 6,
    },
});

// -------------------------------------------------------------------------- //

export default AddInventoryScreen;

// -------------------------------------------------------------------------- //
