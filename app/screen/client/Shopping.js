
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

const ShoppingScreen = () => {
    const { user } = useUser();
    const navigation = useNavigation();
    const { themePallete } = useTheme();

    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    // ---------------------------------------------------------------------- //

    const fetchProducts = async () => {

        try {
            const response = await fetch(`${MainSG}SensorPackType`, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'ERROR',
                    text2: 'Ha ocurrido un error al intentar carar la lista de productos.',
                    visibilityTime: 4500,
                })

                // console.error('Ha ocurrido un error al intentar carar la lista de productos.');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'No se pudo cargar la lista de productos.',
                visibilityTime: 4500,
            })


            // console.error('No se pudo cargar la lista de productos.', error);
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------------------- //

    useEffect(() => {
        setLoading(true);
        fetchProducts();
    }, []);

    // ---------------------------------------------------------------------- //

    const handleRefresh = () => { fetchProducts(); };

    if (loading) {
        return (
            <View style={[styles.mainContainer, { backgroundColor: themePallete.background, alignItems: 'center', justifyContent: 'center', }]}>
                <Swing size={SIZES.xxLarge * 1.8} color={COLORS.accent} />
            </View>
        );
    }

    // ---------------------------------------------------------------------- //

    const showMemberships = () => {
        navigation.navigate('Memberships');
    };

    // ---------------------------------------------------------------------- //

    const insertPayment = async (id) => {

        try {
            const response = await fetch(`${MainSG}Venta`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clientId: user.id, sensorPackTypeId: id }),
            });


            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'COMPRA REALIZADA',
                    text2: 'Paquete de sensores adquirido.',
                    visibilityTime: 4500,
                })

                // console.log('Compra realizada con éxito.');
                navigation.navigate('Shopping');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'ERROR',
                    text2: 'Ha ocurrido un error al intentar realizar la compra.',
                    visibilityTime: 4500,
                })

                // console.error('Ha ocurrido un error al intentar realizar la compra.');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'No se pudo realizar la compra.',
                visibilityTime: 4500,
            })

            // console.error('No se pudo reaalizar la compra.', error);
        }

    };

    const showPayment = async (id, name, description, price, type) => {
        const data = await handleIntegrationMP(name, description, price, type);

        if (data) {
            openBrowserAsync(data);
            insertPayment(id);
        } else {
            console.error('No se pudo realizar la compra del paquete.');
        }
    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[ styles.mainContainer, { backgroundColor: themePallete.background } ]}>

            {/* Botón de acceso a la compra de membresías */}
            <RNBounceable onPress={() => { showMemberships(); }}>
                <View style={styles.membershipButton}>
                    <Icon name='shield-star' size={SIZES.xxLarge} color={COLORS.light} />
                    <Text style={styles.membershipText}>Obtener membresía</Text>
                </View>
            </RNBounceable>

            {/* Compra de paquetes de sensores */}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={handleRefresh}
                        progressBackgroundColor={themePallete.alterText} colors={[themePallete.background]} />
                }>

                {/* Lista de paquetes */}
                {products.map((product) => (
                    <RNBounceable key={product.id} onPress={() => { showPayment(product.id, product.name, product.description, product.salePrice, 'Sensor Pack'); }}>
                        <ImageBackground style={styles.sensorPack} imageStyle={styles.sensorImage} source={SourceIMG.sensorPack}>
                            <View style={styles.sensorContainer}>

                                {/* Precio del paquete */}
                                <Text style={[styles.sensorPrice, { color: themePallete.text }]}>Precio: ${product.salePrice}</Text>

                                <LinearGradient colors={['transparent', themePallete.background]} style={styles.sensors}>

                                    {/* Nombre del paquete */}
                                    <Text style={[styles.sensorTitle, { color: themePallete.text }]}>
                                        {(product.name).toUpperCase()}
                                    </Text>

                                    {/* Descripción del paquete */}
                                    <View style={styles.sensorIcon}>
                                        <Text style={[styles.sensorDescription, { color: themePallete.text }]}>
                                            {product.description}
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
        paddingVertical: 6,
        fontSize: SIZES.xLarge,
    },

    sensorDescription: {
        padding: 6,
        textAlign: 'justify',
        fontSize: SIZES.small,
    },

    sensorIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    sensorName: {
        paddingLeft: 4, paddingRight: 10,
    },

});

// -------------------------------------------------------------------------- //

export default ShoppingScreen;

// -------------------------------------------------------------------------- //
