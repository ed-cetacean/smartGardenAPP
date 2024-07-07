
// -------------------------------------------------------------------------- //

import AvatarCW from '../../../components/Avatar';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { StyleSheet, ScrollView, RefreshControl, View, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { themePallete } = useTheme();
    const [ refreshing, setRefreshing ] = useState(false);

    const user = {
        firstName: 'Ed', lastName: 'Rubio',
        image: 'https://i.pinimg.com/736x/40/11/b5/4011b5ab5f2376f26a5d46ff904fc5e2.jpg',
        level: 'Amante de la naturaleza',
        email: 'ed.cetacean@outlook.com',
        address: {
            country: 'México',
            state: 'B.C.',
            city: 'Tijuana',
            zip: '22253',
            street: 'El Laurel',
        },
        membership: 'Premium'

    };

    const handleGardens = () => {
        navigation.navigate('Gardens');
    };

    const handlePayments = () => {
        navigation.navigate('Payment');
    };

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    // ---------------------------------------------------------------------- //

    return (
        <ScrollView style={[ styles.mainContainer, { backgroundColor: themePallete.background } ]}
            refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}
            progressBackgroundColor={themePallete.alterText} colors={[ themePallete.background ]} /> }>

            <View style={styles.userData}>

                {/* Avatar del usuario, sea imagen o iniciales */}
                <View style={styles.userImage}>
                    <AvatarCW name1={user.firstName} name2={user.lastName} image={user.image}
                        textStyle={[ styles.userText, { color: themePallete.text } ]} imageStyle={styles.userImage} />
                </View>

                <View style={{ paddingLeft: 22 }}>
                    {/* Nombre del usuario */}
                    <Text style={[ styles.userName, { color: COLORS.accent } ]}>
                        {`${user.firstName.toUpperCase()} ${user.lastName.split(' ')[0].toUpperCase()}`}
                    </Text>

                    {/* Cargo del usuario, sea cliente o administrador */}
                    <Text style={[ styles.userLevel, { color: themePallete.alterText } ]}>{user.level}</Text>
                </View>

            </View>

            <View style={{ width: '80%', alignSelf: 'center' }}>

                {/* Correo del usuario */}
                <View style={styles.sectionButton}>
                    <Icon name='email' size={SIZES.large} color={COLORS.accent} />
                    <Text style={[ styles.sectionText, { color: themePallete.text } ]}>{user.email}</Text>
                </View>

                {/* Dirección del usuario */}
                <View style={styles.sectionButton}>
                    <Icon name='directions-fork' size={SIZES.large} color={COLORS.accent} />
                    <Text style={[ styles.sectionText, { color: themePallete.text } ]}>
                        {user.address.street}, {user.address.city}, {user.address.state}, {user.address.country}
                    </Text>
                </View>

                {/* Membresía del usuario */}
                <View style={styles.sectionButton}>
                    <Icon name='shield-star' size={SIZES.large} color={COLORS.accent} />
                    <Text style={[ styles.sectionText, { color: themePallete.text } ]}>Membresía {user.membership}</Text>
                </View>

                {/* Sección de pagos */}
                <RNBounceable onPress={handlePayments}>
                    <View style={styles.sectionButton}>
                        <Icon name='wallet' size={SIZES.large} color={COLORS.accent} />
                        <Text style={[ styles.sectionText, { color: themePallete.text } ]}>Facturas</Text>
                    </View>
                </RNBounceable>

                {/* Sección de jardines */}
                <RNBounceable onPress={handleGardens}>
                    <View style={styles.sectionButton}>
                        <Icon name='leaf' size={SIZES.large} color={COLORS.accent} />
                        <Text style={[ styles.sectionText, { color: themePallete.text } ]}>Jardines</Text>
                    </View>
                </RNBounceable>

            </View>

        </ScrollView>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, //alignItems: 'center'
    },

    userImage: {
        width: 160, height: 160,
        borderColor: COLORS.accent,
        backgroundColor: COLORS.accent,
        borderWidth: 4, borderRadius: 160,
        alignItems: 'center', justifyContent: 'center',
    },

    userText: {
        letterSpacing: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: SIZES.xxLarge * 2,
    },

    userData: {
        marginVertical: 30,
        alignSelf: 'center',
        width: '80%', height: 'auto',
        // backgroundColor: COLORS.disabled,
        flexDirection: 'row', alignItems: 'center',
    },

    // ---------------------------------------------------------------------- //

    userName: {
        fontWeight: 'bold',
        fontSize: SIZES.xLarge * 1.32,
    },

    userLevel: {
        fontSize: SIZES.medium,
    },

    // ---------------------------------------------------------------------- //

    sectionButton: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        width: '100%', height: 60,
    },

    sectionText: {
        paddingLeft: 10,
        fontSize: SIZES.medium - 2,
    },

});

// -------------------------------------------------------------------------- //

export default ProfileScreen;

// -------------------------------------------------------------------------- //
