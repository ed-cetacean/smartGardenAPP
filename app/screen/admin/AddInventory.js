
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

    const initialPrice = sensorPackPrice ? sensorPackPrice.toFixed(2).toString() : '0.00';


    const [ newStockAndPrice, setNewStockAndPrice ] = useState({
        // newStock: sensorPackStock,
        // newSalePrice: sensorPackPrice

        newStock: sensorPackStock.toString(),
        newSalePrice: initialPrice,


    });

    const [ isLoading, setIsLoading ] = useState(false);
    const isDisabled = newStockAndPrice.newSalePrice === '';

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
