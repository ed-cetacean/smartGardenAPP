
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import Toast from 'react-native-toast-message';
import React, { useState, useEffect } from 'react';
import { Swing } from 'react-native-animated-spinkit';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { StyleSheet, ScrollView, RefreshControl, View, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const SalesScreen = () => {
    const navigation = useNavigation();
    const { themePallete } = useTheme();

    const [ users, setUsers ] = useState([]);
    const [ ventas, setVentas ] = useState([]);
    const [ sensorPacks, setSensorPacks ] = useState([]);
    const [ sensorPackTypes, setSensorPackTypes ] = useState([]);

    const [ loading, setLoading ] = useState(false);

    // ---------------------------------------------------------------------- //

    const fetchVentas = async () => {
        try {
            const response = await fetch(`${MainSG}Venta`, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setVentas(data);
                // console.log('Ventas recuperadas con éxito.');

                fetchUsers();
                fetchSensorPacks();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'ERROR',
                    text2: 'Ha ocurrido un error al intentar recuperar las ventas.',
                    visibilityTime: 4500,
                })

                // console.error('Ha ocurrido un error al intentar recuperar las ventas.');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'No se pudo recuperar las ventas.',
                visibilityTime: 4500,
            })

            // console.error('No se pudo recuperar las ventas.', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${MainSG}Usuario`, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
                // console.log('Usuarios recuperados con éxito.');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'ERROR',
                    text2: 'Ha ocurrido un error al intentar recuperar los usuarios.',
                    visibilityTime: 4500,
                })

                // console.error('ERROR: Ha ocurrido un error al intentar recuperar los usuarios.');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'No se pudo recuperar los usuarios.',
                visibilityTime: 4500,
            })

            // console.error('ERROR: No se pudo recuperar los usuarios.', error);
        }
    };

    const fetchSensorPacks = async () => {
        try {
            const response = await fetch(`${MainSG}SensorPack`, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setSensorPacks(data);
                // console.log('Paquetes de sensores recuperados con éxito.');

                fetchSensorPackTypes();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'ERROR',
                    text2: 'Ha ocurrido un error al intentar recuperar los paquetes de sensores.',
                    visibilityTime: 4500,
                })

                // console.error('Ha ocurrido un error al intentar recuperar los paquetes de sensores.');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'No se pudieron recuperar los paquetes de sensores.',
                visibilityTime: 4500,
            })

            // console.error('No se pudieron recuperar los paquetes de sensores.', error);
        }
    };

    const fetchSensorPackTypes = async () => {
        try {
            const response = await fetch('https://gardenapi20240801192739.azurewebsites.net/api/SensorPackType', {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setSensorPackTypes(data);
                // console.log('Tipos de paquetes de sensores recuperados con éxito.');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'ERROR',
                    text2: 'Ha ocurrido un error al intentar recuperar los tipos de paquetes de sensores.',
                    visibilityTime: 4500,
                })
                // console.error('Ha ocurrido un error al intentar recuperar los tipos de paquetes de sensores.');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'No se pudieron recuperar los tipos de paquetes de sensores.',
                visibilityTime: 4500,
            })
            // console.error('No se pudieron recuperar los tipos de paquetes de sensores.', error);
        }
    };

    // ---------------------------------------------------------------------- //

    useEffect(() => {
        fetchVentas();
    }, [navigation]);

    // ---------------------------------------------------------------------- //

    const handleRefresh = () => { fetchVentas(); };

    if (loading) {
        return (
            <View style={[styles.mainContainer, { backgroundColor: themePallete.background, alignItems: 'center', justifyContent: 'center', }]}>
                <Swing size={SIZES.xxLarge * 1.8} color={COLORS.accent} />
            </View>
        );
    }

    // ---------------------------------------------------------------------- //

    const showSaleInfo = (venta) => {
        const user = users.find(u => u.id === venta.clientId);
        const sensorPack = sensorPacks.find(sp => sp.id === venta.sensorPackId);
        const sensorPackType = sensorPackTypes.find(spt => spt.id === (sensorPack ? sensorPack.sensorPackTypeId : null));

        navigation.navigate('SalesInfo', {
            purchaseDate: venta.purchaseDate,
            totalPrice: venta.totalPrice,
            clientName: user ? `${user.firstName} ${user.lastName}` : 'Desconocido',
            sensorPackName: sensorPackType ? sensorPackType.name : 'Desconocido',
            saleId: venta.id
        });
    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>
            {/* TITULO */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>VENTAS REALIZADAS</Text>
            </View>

            {/* INFORMACIÓN */}
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={handleRefresh}
                        progressBackgroundColor={themePallete.alterText} colors={[themePallete.background]} />
                }>

                {ventas.map((venta, index) => (
                    <RNBounceable key={venta.id} style={[styles.itemContainer, { backgroundColor: themePallete.background }]}
                        onPress={() => showSaleInfo(venta)}>

                        {/* ÍNDICE DE VENTA */}
                        <View style={styles.indexItem}>
                            <Text style={styles.indexText}>{index + 1}</Text>
                        </View>

                        {/* INFORMACIÓN DE VENTA */}
                        <View style={styles.infoContainer}>
                            <Text style={[styles.infoText, { color: themePallete.text }]}>{`Vendido a: ${users.find(u => u.id === venta.clientId)?.firstName} ${users.find(u => u.id === venta.clientId)?.lastName.split(' ')[0]  || 'Desconocido'}`}</Text>
                            <Text style={{ color: themePallete.text }}>{`Producto: ${sensorPackTypes.find(spt => spt.id === (sensorPacks.find(sp => sp.id === venta.sensorPackId)?.sensorPackTypeId))?.name || 'Desconocido'}`}</Text>
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
    titleContainer: {
        width: '100%', height: '10%',
        alignItems: 'center', justifyContent: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        color: COLORS.accent,
        fontSize: SIZES.large + 2,
    },
    scrollContainer: {
        width: '100%',
    },
    itemContainer: {
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%', height: 80,
        opacity: .9, elevation: 4,
    },
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

export default SalesScreen;

// -------------------------------------------------------------------------- //
