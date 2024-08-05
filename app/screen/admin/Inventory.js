
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import { Swing } from 'react-native-animated-spinkit';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { StyleSheet, ScrollView, RefreshControl, View, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const UsersScreen = () => {
    const navigation = useNavigation();
    const { themePallete } = useTheme();
    const [ inventory, setInventory ] = useState([]);
    const [ sensorPackType, setSensorPackType ] = useState([]);

    const [ loading, setLoading ] = useState(false);

    // ---------------------------------------------------------------------- //

    const fetchInventory = async () => {
        try {
            const response = await fetch(`${MainSG}Inventario`, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setInventory(data);
                console.log('Inventario recuperado con éxito.');

                fetchSensorPackType();
            } else {
                console.error('ERROR: Ha ocurrido un error al intentar recuperar el inventario.');
            }
        } catch (error) {
            console.error('ERROR: No se pudo recuperar el inventario.', error);
        }
    };

    const fetchSensorPackType = async () => {
        try {
            const response = await fetch(`${MainSG}SensorPackType`, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setSensorPackType(data);

                console.log('Tipos de SensorPack recuperado con éxito.');
            } else {
                console.error('ERROR: Ha ocurrido un error al intentar recuperar lost tipos de SensorPack.');
            }
        } catch (error) {
            console.error('ERROR: No se pudo recuperar los tipos de SensorPack.', error);
        }
    };

    // ---------------------------------------------------------------------- //

    useEffect(() => {
        setLoading(true);
        fetchInventory();
        setLoading(false);
    }, []);

    // ---------------------------------------------------------------------- //

    const handleRefresh = () => { fetchInventory(); };

    if (loading) {
        return (
            <View style={[styles.mainContainer, { backgroundColor: themePallete.background, alignItems: 'center', justifyContent: 'center', }]}>
                <Swing size={SIZES.xxLarge * 1.8} color={COLORS.accent} />
            </View>
        );
    }

    // ---------------------------------------------------------------------- //

    const addInventory = (id) => {
        navigation.navigate('AddInventory', { sensorPackType: id });
    };

    // ---------------------------------------------------------------------- //

    const showSensorPackName = (id) => {
        const sensorPack = sensorPackType.find(pack => pack.id === id);
        return sensorPack ? sensorPack.name : 'Desconocido';
    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* TITULO */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>INVENTARIO</Text>
            </View>

            {/* INFORMACIÓN */}
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}
                refreshControl={ <RefreshControl refreshing={loading} onRefresh={handleRefresh}
                    progressBackgroundColor={themePallete.alterText} colors={[ themePallete.background ]} /> }>

                {inventory.map((sensorPack, index) => (
                    <RNBounceable key={sensorPack.id} style={[ styles.itemContainer, { backgroundColor: themePallete.background } ]}
                        onPress={() => addInventory(sensorPack.sensorPackTypeId)}>

                        {/* Índice de usuario */}
                        <View style={styles.indexItem}>
                            <Text style={styles.indexText}>{index + 1}</Text>
                        </View>

                        {/* Información de pago */}
                        <View style={styles.infoContainer}>
                            <Text style={[ styles.infoText, { color: themePallete.text } ]}>{showSensorPackName(sensorPack.sensorPackTypeId)}</Text>
                            <Text style={ { color: themePallete.text} }>{sensorPack.stock}</Text>
                        </View>
                    </RNBounceable>
                ))}

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

export default UsersScreen;

// -------------------------------------------------------------------------- //
