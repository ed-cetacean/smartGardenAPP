
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import { SourceIMG } from '../../../ui/Images';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';
import { useUser } from '../../../core/auth/UserProvider';
import { handleIntegrationMP } from '../../../core/payment/IntegrationMP';

import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { openBrowserAsync } from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import { Swing } from 'react-native-animated-spinkit';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { StyleSheet, Dimensions, RefreshControl,ImageBackground, ScrollView, View, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const itemSize =  Dimensions.get('window').width * 0.78;

const MembershipScreen = () => {
    const { user } = useUser();
    const navigation = useNavigation();
    const { themePallete } = useTheme();

    const [ memberships, setMemberships ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    // ---------------------------------------------------------------------- //

    const fetchMemberships = async () => {

        try {
            const response = await fetch(`${MainSG}Membresia`, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setMemberships(data);
                console.log('Liista de membresias obtenida.');
            } else {
                console.error('Ha ocurrido un error al intentar carar la lista de membresías.');
            }
        } catch (error) {
            console.error('No se pudo cargar la lista de membresías.', error);
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------------------- //

    useEffect(() => {
        setLoading(true);
        fetchMemberships();
    }, []);

    // ---------------------------------------------------------------------- //

    const handleRefresh = () => { fetchMemberships(); };

    if (loading) {
        return (
            <View style={[styles.mainContainer, { backgroundColor: themePallete.background, alignItems: 'center', justifyContent: 'center', }]}>
                <Swing size={SIZES.xxLarge * 1.8} color={COLORS.accent} />
            </View>
        );
    }

    // ---------------------------------------------------------------------- //

    const insertPayment = async (id) => {

        try {
            const response = await fetch(`${MainSG}UserMembership/purchase`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clientId: user.id, membershipId: id }),
            });

            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Compra realizada.',
                    text2: 'Membresia adquirida con exito.',
                    visibilityTime: 4500,
                })


                // console.log('Membresía adquirida con éxito.');
                navigation.navigate('Memberships');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'ERROR',
                    text2: 'Ha ocurrido un error al intentar adquirir la membresía.',
                    visibilityTime: 4500,
                })

                // console.error('Ha ocurrido un error al intentar adquirir la membresía.');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'No se pudo adquirir la membresía.',
                visibilityTime: 4500,
            })

            // console.error('No se pudo adquirir la membresía.', error);
        }

    };

    const showPayment = async (id, name, description, price, type) => {
        const data = await handleIntegrationMP(name, description, price, type);

        if (data) {
            openBrowserAsync(data);
            insertPayment(id);
        } else {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'No se pudo realizar la compra de la membresía.',
                visibilityTime: 4500,
            })

            // console.error('No se pudo realizar la compra de la membresía.');
        }
    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[ styles.mainContainer, { backgroundColor: themePallete.background } ]}>

            {/* Compra de paquetes de membresías */}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={handleRefresh}
                        progressBackgroundColor={themePallete.alterText} colors={[themePallete.background]} />
                }>

                {/* Lista de paquetes */}
                {memberships.map((membership) => (
                    <RNBounceable key={membership.id} onPress={() => { showPayment(membership.id, membership.name, membership.description, membership.price, 'Membership'); }}>
                        <ImageBackground style={styles.sensorPack} imageStyle={styles.sensorImage} source={SourceIMG.membershipIMG}>
                            <View style={styles.sensorContainer}>

                                {/* Precio del paquete */}
                                <Text style={[styles.sensorPrice, { color: themePallete.text }]}>Precio: ${membership.price}</Text>

                                <LinearGradient colors={['transparent', themePallete.background]} style={styles.sensors}>

                                    {/* Nombre del paquete */}
                                    <Text style={[styles.sensorTitle, { color: themePallete.text }]}>
                                        {(membership.name).toUpperCase()}
                                    </Text>

                                    {/* Descripción del paquete */}
                                    <View style={styles.sensorIcon}>
                                        <Text style={[styles.sensorDescription, { color: themePallete.text }]}>
                                            {membership.description}
                                        </Text>
                                    </View>

                                </LinearGradient>
                            </View>
                        </ImageBackground>
                    </RNBounceable>
                ))}

            </ScrollView>
        </View>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: { flex: 1, alignItems: 'center', },

    // ---------------------------------------------------------------------- //

    membershipButton: {
        borderRadius: 60,
        marginVertical: 12,
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.accent,
        paddingHorizontal: 40, height: 60,
        alignItems: 'center', justifyContent: 'center',
    },

    membershipText: {
        paddingLeft: 8,
        fontWeight: 'bold',
        color: COLORS.light,
        fontSize: SIZES.medium,
    },

    // ---------------------------------------------------------------------- //

    sensorPack: {
        borderRadius: 12,
        width: itemSize, height: itemSize,
        alignSelf: 'center', marginVertical: 8,
    },

    sensorImage: { borderRadius: 12, },

    sensorContainer: {
        flex: 1, borderRadius: 12,
        backgroundColor: COLORS.darkTransparent,
    },

    sensors: {
        padding: 22,
        width: '100%', height: '30%',
        position: 'absolute', bottom: 0,
    },

    // ---------------------------------------------------------------------- //

    sensorPrice: {
        fontStyle: 'italic',
        right: 0, position: 'absolute',
        padding: 22, fontSize: SIZES.medium,
    },

    sensorTitle: {
        letterSpacing: 1,
        fontWeight: 'bold',
        paddingVertical: 4,
        textAlign: 'center',
        fontSize: SIZES.xLarge,
    },

    sensorDescription: {
        padding: 4,
        textAlign: 'center',
        fontSize: SIZES.small,
    },

    sensorIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    sensorName: {
        paddingLeft: 4, paddingRight: 10,
    },

});

// -------------------------------------------------------------------------- //

export default MembershipScreen;

// -------------------------------------------------------------------------- //
