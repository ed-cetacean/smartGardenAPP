
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import Toast from 'react-native-toast-message';
import { Swing } from 'react-native-animated-spinkit';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { StyleSheet, ScrollView, RefreshControl, View, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const UsersScreen = () => {
    const navigation = useNavigation();
    const { themePallete } = useTheme();
    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    // ---------------------------------------------------------------------- //

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
                text2: 'No se pudieron recuperar los usuarios.',
                visibilityTime: 4500,
            })

            // console.error('ERROR: No se pudo recuperar los usuarios.', error);
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------------------- //

    useEffect(() => {
        fetchUsers();
    }, [navigation]);

    // ---------------------------------------------------------------------- //

    const handleRefresh = () => { fetchUsers(); };

    if (loading) {
        return (
            <View style={[styles.mainContainer, { backgroundColor: themePallete.background, alignItems: 'center', justifyContent: 'center', }]}>
                <Swing size={SIZES.xxLarge * 1.8} color={COLORS.accent} />
            </View>
        );
    }

    // ---------------------------------------------------------------------- //

    const showUserInfo = (id) => {
        navigation.navigate('UserInfo', { userId: id });
    };

    // ---------------------------------------------------------------------- //

    const userRole = (user) => {

        if (user.role === 'client') {
            return 'Cliente';
        } else if (user.role === 'admin') {
            return 'Administrador';
        } else if (user.role === 'superAdmin') {
            return 'Administrador principal';
        } else {
            return 'Invitado';
        }

    }

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* TITULO */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>USUARIOS REGISTRADOS</Text>
            </View>

            {/* INFORMACIÓN */}
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}
                refreshControl={ <RefreshControl refreshing={loading} onRefresh={handleRefresh}
                    progressBackgroundColor={themePallete.alterText} colors={[ themePallete.background ]} /> }>

                {users.map((user, index) => (
                    <RNBounceable key={user.id} style={[ styles.itemContainer, { backgroundColor: themePallete.background } ]}
                        onPress={() => showUserInfo(user.id)}>

                        {/* Índice de usuario */}
                        <View style={styles.indexItem}>
                            <Text style={styles.indexText}>{index + 1}</Text>
                        </View>

                        {/* Información de pago */}
                        <View style={styles.infoContainer}>
                            <Text style={[ styles.infoText, { color: themePallete.text } ]}>{user.firstName} {user.lastName}</Text>
                            <Text style={ { color: themePallete.text} }>{userRole(user)}</Text>
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
