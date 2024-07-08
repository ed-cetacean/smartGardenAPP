
// -------------------------------------------------------------------------- //

import InputCW from '../../../components/Input';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';
import { TrefleMain, TrefleToken } from '../../../api/Config';

import React, { useState } from 'react';
import { Flow } from 'react-native-animated-spinkit';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// -------------------------------------------------------------------------- //

const HomeScreen = () => {
    const { themePallete } = useTheme();

    const [ query, setQuery ] = useState('');
    const [ plants, setPlants ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const user = { firstName: 'Ed', lastName: 'Rubio Zuñiga' };

    const fetchPlants = async () => {
        if (!query) return;

        setLoading(true);

        try {
            const response = await fetch(`${TrefleMain}plants/search?q=${query}&token=${TrefleToken}`);
            const data = await response.json();

            setPlants(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* Mensaje de bienvenida */}
            <View style={styles.welcomeContainer}>
                <Text style={[ styles.welcomeText, { color: themePallete.text } ]}>Bienvenido, </Text>
                <Text style={[ styles.welcomeText, { color: themePallete.text, fontWeight: 'bold' } ]}>
                    {user.firstName} {(user.lastName.split(' ')[0])}
                </Text>
            </View>

            {/* Cuadro de búsqueda */}
            <View style={styles.inputContainer}>
                <InputCW placeholder='Buscar plantas'
                    value={query} onChangeText={setQuery} autoCapitalize='none'
                    leftIcon={<Icon name='flower' size={SIZES.xLarge} color={COLORS.accent} />}
                />

                <RNBounceable style={styles.searchButton} onPress={fetchPlants}>
                    {loading ? (
                        <Flow size={SIZES.xLarge} color={COLORS.light} />
                    ) : (
                        <Text style={styles.searchText}>BUSCAR</Text>
                    )}

                </RNBounceable>
            </View>

            {/* Resultados de búsqueda */}
            <View style={styles.resultList}>
                <FlatList data={plants} keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.plantItem}>
                            <Text style={[ styles.plantName, { color: themePallete.text } ]}>{item.common_name}</Text>
                            <Text style={[ styles.plantScientific, { color: themePallete.text } ]}>{item.scientific_name}</Text>
                        </View>
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
        // backgroundColor: COLORS.accent,
    },

    plantItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.accent,
    },
    plantName: {
        fontWeight: 'bold',
        fontSize: SIZES.medium,
    },

    plantScientific: {
        fontSize: SIZES.medium,
    },

});

// -------------------------------------------------------------------------- //

export default HomeScreen;

// -------------------------------------------------------------------------- //
