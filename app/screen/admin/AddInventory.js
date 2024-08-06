
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import InputCW from '../../../components/Input';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Flow, Swing } from 'react-native-animated-spinkit';
import InputSpinner from 'react-native-input-spinner';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { MaterialIcons as Icon } from '@expo/vector-icons';

// -------------------------------------------------------------------------- //

const AddInventoryScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { themePallete } = useTheme();
    const { sensorPackId, sensorPackStock, sensorPackPrice } = route.params;

    const [ newStockAndPrice, setNewStockAndPrice ] = useState({
        newStock: sensorPackStock,
        newSalePrice: sensorPackPrice.toFixed(2),
    });

    const [ isLoading, setIsLoading ] = useState(false);
    const isDisabled = newStockAndPrice.newSalePrice === '';

    // ---------------------------------------------------------------------- //

    const handleInspection = async () => {
        console.log('...');
    };

    const handleSaveChanges = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${MainSG}inventario/update/${sensorPackId}`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStockAndPrice)
            });

            if (response.ok) {
                console.log('Se ha actualizado el inventario.');
                navigation.navigate('Inventory');
            } else {
                console.error('Ha ocurrido un error al intentar actualizar el inventario.');
            }
        } catch (error) {
            console.error('No se puddo actualizar el inventario.', error);
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
            <InputSpinner min={sensorPackStock} max={sensorPackStock + 10} step={1}
                initialValue={sensorPackStock} value={parseInt(newStockAndPrice.newStock)}
                style={styles.inputStock} rounded={false} disabled={isLoading}
                selectionColor={COLORS.accent} textColor={themePallete.text}
                buttonStyle={{ borderRadius: 4 }} color={COLORS.accent}
                onValueChange={value => setNewStockAndPrice({ ...newStockAndPrice, newStock: value.toString() })}
            />

            <InputCW placeholder='Precio de venta'
                value={newStockAndPrice.newSalePrice}
                keyboardType='decimal-pad' maxLength={6}
                leftIcon={<Icon name='attach-money' size={SIZES.xLarge} color={COLORS.accent} />}
                onChangeText={value => setNewStockAndPrice({ ...newStockAndPrice, newSalePrice: value.toString() })}
            />

            {/* BOTONES */}
            <View style={styles.buttonContainer}>
                <RNBounceable onPress={() => { handleInspection(); } } disabled={isLoading}
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
