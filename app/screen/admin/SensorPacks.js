
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import Toast from 'react-native-toast-message';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Swing } from 'react-native-animated-spinkit';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { StyleSheet, ScrollView, RefreshControl, View, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const SensorPackScreen = () => {
    const route = useRoute();
    const { ID, Name } = route.params;
    const navigation = useNavigation();
    const { themePallete } = useTheme();
    const [ loading, setLoading ] = useState(false);

    const [ users, setUsers ] = useState([]);
    const [ sensorPacks, setSensorPacks ] = useState([]);

    // ---------------------------------------------------------------------- //

    const fetchSensorPacks = async () => {
        try {
            const response = await fetch(`${MainSG}SensorPack`, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setSensorPacks(data);
                // console.log('Paquetes de sensores recuperados con éxito.');

                fetchUsers();
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
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
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

    // ---------------------------------------------------------------------- //

    useEffect(() => {
        setLoading(true);
        fetchSensorPacks();
    }, []);

    // ---------------------------------------------------------------------- //

    const handleRefresh = () => { fetchSensorPacks(); };

    const getUserInfo = (clientId) => {
        const user = users.find(user => user.id === clientId);
        return user ? `Dueño: ${(user.firstName).split(' ')[0]} ${(user.lastName).split(' ')[0]}` : 'Sin dueño';
    };

    if (loading) {
        return (
            <View style={[styles.mainContainer, { backgroundColor: themePallete.background, alignItems: 'center', justifyContent: 'center', }]}>
                <Swing size={SIZES.xxLarge * 1.8} color={COLORS.accent} />
            </View>
        );
    }

    // Filtrar los paquetes de sensores según el sensorPackTypeId
    const filteredSensorPacks = sensorPacks.filter(sensorPack => sensorPack.sensorPackTypeId === ID);

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* TITULO */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{(Name).toUpperCase()}</Text>
            </View>

            {/* INFORMACIÓN */}
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}
                refreshControl={ <RefreshControl refreshing={loading} onRefresh={handleRefresh}
                    progressBackgroundColor={themePallete.alterText} colors={[ themePallete.background ]} /> }>

                {filteredSensorPacks.map((sensorPack, index) => (
                    <RNBounceable key={sensorPack.id} style={[ styles.itemContainer, { backgroundColor: themePallete.background } ]}
                        onPress={() => {}}>

                        {/* Índice de usuario */}
                        <View style={styles.indexItem}>
                            <Text style={styles.indexText}>{index + 1}</Text>
                        </View>

                        {/* Información de pago */}
                        <View style={styles.infoContainer}>
                            <Text style={[ styles.infoText, { color: themePallete.text } ]}>{getUserInfo(sensorPack.clientId)}</Text>
                            <Text style={ { color: themePallete.text} }>ID: {sensorPack.id}</Text>
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

export default SensorPackScreen;

// -------------------------------------------------------------------------- //
