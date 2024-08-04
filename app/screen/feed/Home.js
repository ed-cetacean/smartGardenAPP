
// -------------------------------------------------------------------------- //

import InputCW from '../../../components/Input';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';
import { useUser } from '../../../core/auth/UserProvider';
import { PerenualMain, PerenualToken } from '../../../api/Config';

import React, { useState } from 'react';
import { Flow } from 'react-native-animated-spinkit';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const HomeScreen = () => {
    const { user } = useUser();
    const navigation = useNavigation();
    const { themePallete } = useTheme();

    const [ query, setQuery ] = useState('');
    const [ plants, setPlants ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const isSearchDisabled = query.trim() === '';
    const [ isLoading, setIsLoading ] = useState(false);

    // ---------------------------------------------------------------------- //

    // Realiza la búsqueda de plantas.
    const fetchPlants = async () => {
        if (!query) return;
        setLoading(true);

        try {
            const response = await fetch(`${PerenualMain}species-list?page=1&key=${PerenualToken}&q=${query}`);
            const data = await response.json();
            setPlants(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Muestra la pantalla con la información de la planta seleccionada.
    const showPlant = (plant) => {
        navigation.navigate('PlantInfo', {
            plantId: plant,
        });
    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* Mensaje de bienvenida */}
            <View style={styles.welcomeContainer}>
                <Text style={[ styles.welcomeText, { color: themePallete.text } ]}>Bienvenido, </Text>

                {user ? (
                    <Text style={[styles.welcomeText, { color: themePallete.text, fontWeight: 'bold' }]}>
                        {`${user.firstName.split(' ')[0]} ${user.lastName.split(' ')[0]}`}
                    </Text>
                ) : (
                    <Text style={[styles.welcomeText, { color: themePallete.text, fontWeight: 'bold' }]}>
                        Invitado
                    </Text>
                )}

            </View>

            {/* Cuadro de búsqueda */}
            <View style={styles.inputContainer}>
                <InputCW placeholder='Buscar plantas'
                    value={query} onChangeText={setQuery} autoCapitalize='none'
                    leftIcon={<Icon name='flower' size={SIZES.xLarge} color={COLORS.accent} />}
                />

                <RNBounceable disabled={isLoading || isSearchDisabled} onPress={fetchPlants}
                    style={[ styles.searchButton, { backgroundColor: isLoading || isSearchDisabled ? COLORS.disabled : COLORS.accent } ]}
                >
                    {loading ? (
                        <Flow size={SIZES.xLarge} color={COLORS.light} />
                    ) : (
                        <Text style={[styles.searchText, { color: isLoading || isSearchDisabled ? COLORS.alterDisabled : COLORS.disabled} ]}>BUSCAR</Text>
                    )}

                </RNBounceable>
            </View>

            {/* Resultados de búsqueda */}
            <View style={styles.resultList}>
                <FlatList data={plants} keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (

                        // Acceso a información de cada resultado de la búsqueda.
                        <RNBounceable style={styles.plantItem} onPress={() => { showPlant(item.id); }}>

                            {/* Miniatura de la planta. */}
                            { item.default_image && item.default_image.thumbnail ? (
                                <Image style={styles.thumbnailStyle} source={{ uri: item.default_image.thumbnail }} />
                            ) : (
                                <View style={[ styles.thumbnailStyle, styles.notFoundStyle ]}>
                                    <Text style={styles.notFoundTextStyle}>N/A</Text>
                                </View>
                            )}

                            {/* Información básica de la planta. */}
                            <View style={styles.infoStyle}>
                                <Text style={[ styles.plantName, { color: themePallete.text } ]}>
                                    {(item.common_name).toUpperCase()}
                                </Text>

                                <Text style={[ styles.plantScientific, { color: themePallete.text } ]}>{item.scientific_name}</Text>
                            </View>

                        </RNBounceable>
                    )}
                />
            </View>

        </View>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, alignItems: 'center',
    },

    // ---------------------------------------------------------------------- //

    welcomeContainer: {
        flexDirection: 'row',
        width: '72%', marginVertical: 40,
    },

    welcomeText: {
        fontSize: SIZES.xLarge,
    },

    // ---------------------------------------------------------------------- //

    inputContainer: {
        width: '72%',
    },

    searchButton: {
        borderRadius: 6,
        marginVertical: 12,
        width: '100%', height: 50,
        backgroundColor: COLORS.accent,
        alignItems: 'center', justifyContent: 'center',
    },

    searchText: {
        fontWeight: 'bold',
        color: COLORS.light,
        fontSize: SIZES.medium,
    },

    // ---------------------------------------------------------------------- //

    resultList: {
        width: '72%', height: '68%',
    },

    plantItem: {
        marginVertical: 8,
        flexDirection: 'row',
    },

    thumbnailStyle: {
        width: 60, height: 60,
        borderTopLeftRadius: 12,
        borderWidth: 2, borderColor: COLORS.accent,
    },

    notFoundStyle: {
        borderWidth: 0,
        backgroundColor: COLORS.accent,
        alignItems: 'center', justifyContent: 'center',
    },

    notFoundTextStyle: {
        fontWeight: 'bold',
        color: COLORS.light,
    },

    infoStyle: {
        width: '100%',
        paddingLeft: 18,
        paddingBottom: 8,
        borderBottomWidth: 2,
        justifyContent: 'center',
        borderBottomColor: COLORS.accent,
    },

    plantName: {
        paddingBottom: 2,
        fontWeight: 'bold',
        fontSize: SIZES.small,
    },

    plantScientific: {
        fontSize: SIZES.medium,
    },

});

// -------------------------------------------------------------------------- //

export default HomeScreen;

// -------------------------------------------------------------------------- //
