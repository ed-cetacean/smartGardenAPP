
// -------------------------------------------------------------------------- //

import { SourceIMG } from '../../../ui/Images';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import { LinearGradient } from 'expo-linear-gradient';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { StyleSheet, Dimensions, ImageBackground, ScrollView, View, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const itemSize =  Dimensions.get('window').width * 0.78;

const ShoppingScreen = () => {
    const { themePallete } = useTheme();

    // ---------------------------------------------------------------------- //

    return (
        <View style={[ styles.mainContainer, { backgroundColor: themePallete.background } ]}>

            {/* Botón de acceso a la compra de membresías */}
            <RNBounceable onPress={() => {}}>
                <View style={styles.membershipButton}>
                    <Icon name='shield-star' size={SIZES.xxLarge} color={COLORS.light} />
                    <Text style={styles.membershipText}>Obtener membresía</Text>
                </View>
            </RNBounceable>

            {/* Compra de paquetes de sensores */}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                <RNBounceable onPress={() => {}}>
                    <ImageBackground style={styles.sensorPack} imageStyle={styles.sensorImage} source={SourceIMG.sensorPack}>
                        <View style={styles.sensorContainer}>

                            {/* Precio del paquete */}
                            <Text style={[ styles.sensorPrice, { color: themePallete.text } ]}>Precio: $150</Text>

                            <LinearGradient colors={['transparent', themePallete.background ]} style={styles.sensors}>
                                {/* Nombre del paquete */}
                                <Text style={[ styles.sensorTitle, { color: themePallete.text } ]}>
                                    BASIC PACK
                                </Text>

                                {/* Componentes del paquete */}
                                <View style={styles.sensorIcon}>
                                    <Icon name="water-percent" size={SIZES.large} color={themePallete.text} />
                                    <Text style={[ styles.sensorName, { color: themePallete.text } ]}>Humedad</Text>
                                    <Icon name='sun-thermometer-outline' size={SIZES.large} color={themePallete.text} />
                                    <Text style={[ styles.sensorName, { color: themePallete.text } ]}>Temperatura</Text>
                                </View>

                            </LinearGradient>
                        </View>
                    </ImageBackground>
                </RNBounceable>

                <RNBounceable onPress={() => {}}>
                    <ImageBackground style={styles.sensorPack} imageStyle={styles.sensorImage} source={SourceIMG.sensorPack}>
                        <View style={styles.sensorContainer}>

                            {/* Precio del paquete */}
                            <Text style={[ styles.sensorPrice, { color: themePallete.text } ]}>Precio: $250</Text>

                            <LinearGradient colors={['transparent', themePallete.background ]} style={styles.sensors}>
                                {/* Nombre del paquete */}
                                <Text style={[ styles.sensorTitle, { color: themePallete.text } ]}>
                                    ENTHUSIASTIC PACK
                                </Text>

                                {/* Componentes del paquete */}
                                <View style={styles.sensorIcon}>
                                    <Icon name='water' size={SIZES.large} color={themePallete.text} />
                                    <Text style={[ styles.sensorName, { color: themePallete.text } ]}>Riego</Text>
                                    <Icon name="water-percent" size={SIZES.large} color={themePallete.text} />
                                    <Text style={[ styles.sensorName, { color: themePallete.text } ]}>Humedad</Text>
                                    <Icon name='sun-thermometer-outline' size={SIZES.large} color={themePallete.text} />
                                    <Text style={[ styles.sensorName, { color: themePallete.text } ]}>Temperatura</Text>
                                </View>

                            </LinearGradient>
                        </View>
                    </ImageBackground>
                </RNBounceable>

                <RNBounceable onPress={() => {}}>
                    <ImageBackground style={styles.sensorPack} imageStyle={styles.sensorImage} source={SourceIMG.sensorPack}>
                        <View style={styles.sensorContainer}>

                            {/* Precio del paquete */}
                            <Text style={[ styles.sensorPrice, { color: themePallete.text } ]}>Precio: $350</Text>

                            <LinearGradient colors={['transparent', themePallete.background ]} style={styles.sensors}>
                                {/* Nombre del paquete */}
                                <Text style={[ styles.sensorTitle, { color: themePallete.text } ]}>
                                    PREMIUM PACK
                                </Text>

                                {/* Componentes del paquete */}
                                <View style={styles.sensorIcon}>
                                    <Icon name='water' size={SIZES.large} color={themePallete.text} />
                                    <Text style={[ styles.sensorName, { color: themePallete.text } ]}>Riego</Text>
                                    <Icon name='umbraco' size={SIZES.large} color={themePallete.text} />
                                    <Text style={[ styles.sensorName, { color: themePallete.text } ]}>Cubierta solar</Text>
                                </View>

                                <View style={styles.sensorIcon}>
                                    <Icon name="water-percent" size={SIZES.large} color={themePallete.text} />
                                    <Text style={[ styles.sensorName, { color: themePallete.text } ]}>Humedad</Text>
                                    <Icon name='sun-thermometer-outline' size={SIZES.large} color={themePallete.text} />
                                    <Text style={[ styles.sensorName, { color: themePallete.text } ]}>Temperatura</Text>
                                    <Icon name='weather-sunny' size={SIZES.large} color={themePallete.text} />
                                    <Text style={[ styles.sensorName, { color: themePallete.text } ]}>Luz solar</Text>
                                </View>

                            </LinearGradient>
                        </View>
                    </ImageBackground>
                </RNBounceable>

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
