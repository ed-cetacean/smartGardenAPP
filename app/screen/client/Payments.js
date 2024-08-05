// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';
import { useUser } from '../../../core/auth/UserProvider';

import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, RefreshControl, ScrollView, View, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const PaymentScreen = () => {
    const { user } = useUser();
    const navigation = useNavigation();
    const { themePallete } = useTheme();

    const [ refreshing, setRefreshing ] = useState(false);
    const [ userPayments, setUserPayments ] = useState([]);

    // ---------------------------------------------------------------------- //

    const fetchUserPayments = async () => {
        try {
            const response = await fetch(`${MainSG}Venta/client/${user.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setUserPayments(data);
            } else {
                console.error('ERROR: Ha ocurrido un error al intentar cargar las facturas del usuario.');
            }
        } catch (error) {
            console.error('ERROR: No se pudieron cargar las facturas del usuario.', error);
        }
    };

    useEffect(() => {
        fetchUserPayments();
    }, [refreshing]);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        fetchUserPayments().finally(() => setRefreshing(false));
    }, []);

    const showPaymentInfo = (paymentData) => {
        navigation.navigate('PaymentInfo', {
            payment: paymentData,
        });
    };

    // ---------------------------------------------------------------------- //

    const PaymentList = () => {
        return userPayments.map((payment, index) => (
            <RNBounceable key={payment.id} style={[ styles.itemContainer, { backgroundColor: themePallete.background } ]}
                onPress={() => showPaymentInfo(payment)}>

                {/* Índice de pago */}
                <View style={styles.indexItem}>
                    <Text style={styles.indexText}>{index + 1}</Text>
                </View>

                {/* Información de pago */}
                <View style={styles.infoContainer}>
                    <Text style={[ styles.infoText, { color: themePallete.text } ]}>{payment.sensorPackType}</Text>
                    <Text style={ { color: themePallete.text} }>{new Date(payment.purchaseDate).toLocaleString()}</Text>
                </View>
            </RNBounceable>
        ));
    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* TITULO */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>HISTORIAL DE COMPRAS</Text>
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}
                    progressBackgroundColor={themePallete.alterText} colors={[ themePallete.background ]} /> }>

                {/* Lista de pagos */}
                <PaymentList />
            </ScrollView>
        </View>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 40, paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
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

    scrollContainer: {
        width: '100%',
    },

    // ---------------------------------------------------------------------- //

    itemContainer: {
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%', height: 80,
        opacity: .9, elevation: 4,
    },

    // ---------------------------------------------------------------------- //

    indexItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '14%', height: '100%',
        backgroundColor: COLORS.accent,
    },

    indexText: {
        fontWeight: 'bold',
        color: COLORS.light,
        fontSize: SIZES.large,
    },

    // ---------------------------------------------------------------------- //

    infoContainer: {
        paddingHorizontal: 14,
        justifyContent: 'center',
        width: '100%', height: '100%',
    },

    infoText: {
        fontWeight: 'bold',
        fontSize: SIZES.medium,
    },
});

// -------------------------------------------------------------------------- //

export default PaymentScreen;

// -------------------------------------------------------------------------- //
