
// -------------------------------------------------------------------------- //

import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import React from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// -------------------------------------------------------------------------- //

const SalesInfoScreen = () => {
    const route = useRoute();
    const { purchaseDate, totalPrice, clientName, sensorPackName, saleId } = route.params;
    const { themePallete } = useTheme();

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* TITULO */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>INFORMACIÓN DE VENTA</Text>
            </View>

            {/* ID DE VENTA */}
            <View style={styles.infoContainer}>
                <Icon name='identifier' style={styles.infoIcon} size={SIZES.xLarge} color={COLORS.accent} />
                <Text style={[styles.infoText, { color: themePallete.text }]}>ID DE VENTA: </Text>
                <Text style={[styles.infoAltText, { color: themePallete.text }]}>{saleId}</Text>
            </View>

            {/* NOMBRE DEL CLIENTE */}
            <View style={styles.infoContainer}>
                <Icon name='account' style={styles.infoIcon} size={SIZES.large} color={COLORS.accent} />
                <Text style={[styles.infoText, { color: themePallete.text }]}>CLIENTE: </Text>
                <Text style={[styles.infoAltText, { color: themePallete.text }]}>{clientName}</Text>
            </View>

            {/* PRODUCTO */}
            <View style={styles.infoContainer}>
                <Icon name='shopping-outline' style={styles.infoIcon} size={SIZES.large} color={COLORS.accent} />
                <Text style={[styles.infoText, { color: themePallete.text }]}>PRODUCTO: </Text>
                <Text style={[styles.infoAltText, { color: themePallete.text }]}>{sensorPackName}</Text>
            </View>

            {/* FECHA DE COMPRA */}
            <View style={styles.infoContainer}>
                <Icon name='calendar' style={styles.infoIcon} size={SIZES.large} color={COLORS.accent} />
                <Text style={[styles.infoText, { color: themePallete.text }]}>FECHA: </Text>
                <Text style={[styles.infoAltText, { color: themePallete.text }]}>{new Date(purchaseDate).toLocaleString()}</Text>
            </View>

            {/* PRECIO TOTAL */}
            <View style={styles.infoContainer}>
                <Icon name='cash' style={styles.infoIcon} size={SIZES.xLarge} color={COLORS.accent} />
                <Text style={[styles.infoText, { color: themePallete.text }]}>PRECIO: </Text>
                <Text style={[styles.infoAltText, { color: themePallete.text }]}>$ {totalPrice}.00</Text>
            </View>

        </View>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },

    // ---------------------------------------------------------------------- //

    titleContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    titleText: {
        fontWeight: 'bold',
        color: COLORS.accent,
        fontSize: SIZES.large + 2,
    },

    // ---------------------------------------------------------------------- //

    infoContainer: {
        paddingHorizontal: 20,
        width: '100%',
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },

    infoIcon: {
        width: 40,
        paddingRight: 10,
    },

    infoText: {
        fontWeight: 'bold',
        fontSize: SIZES.xSmall + 2,
    },

    infoAltText: {
        fontWeight: 'bold',
        fontSize: SIZES.small + 1,
    },
});

// -------------------------------------------------------------------------- //

export default SalesInfoScreen;

// -------------------------------------------------------------------------- //
