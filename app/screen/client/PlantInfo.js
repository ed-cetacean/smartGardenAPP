// -------------------------------------------------------------------------- //

import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';
import { PerenualMain, PerenualToken } from '../../../api/Config';

import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Flow } from 'react-native-animated-spinkit';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';

// -------------------------------------------------------------------------- //

const PlantInfoScreen = () => {
    const route = useRoute();
    const { plantId } = route.params;
    const { themePallete } = useTheme();

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    // Consulta la información de la planta anteriormente seleccionada.
    useEffect(() => {
        const fetchPlantData = async () => {

            try {
                const response = await fetch(`${PerenualMain}species/details/${plantId}?key=${PerenualToken}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlantData();
        console.log(data);
    }, [ plantId ]);

    if (loading) {
        return (
            <View style={[ styles.mainContainer, { backgroundColor: themePallete.background, justifyContent: 'center' } ]}>
                <Flow size={SIZES.xxLarge + 4} color={COLORS.accent} />
            </View>
        );
    }

    let imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

    if (data.default_image) {
        if (data.default_image.original_url) {
            imageUrl = data.default_image.original_url;
        } else if (data.default_image.regular_url) {
            imageUrl = data.default_image.regular_url;
        }
    }

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>
            {/* Nombre */}
            <View style={styles.nameInfo}>
                <Text style={styles.commonName}>
                    {(data.common_name).toUpperCase()}
                </Text>

                <Text style={[styles.scientificName, { color: themePallete.text }]}>
                    {data.scientific_name}
                </Text>
            </View>

            {/* Imagen */}
            <Image style={styles.imageStyle} source={{ uri: imageUrl }} />

            {/* Información */}
            <ScrollView style={styles.plantInfo}>
                {/* Ciclo de vida */}
                {data.cycle && (
                    <View style={styles.infoContainer}>
                        <Icon name='av-timer' style={styles.icon} size={SIZES.large} color={COLORS.accent} />
                        <Text style={[styles.infoTitle, { color: themePallete.text }]}>Ciclo de vida:</Text>
                        <Text style={[styles.infoText, { color: themePallete.text }]}> {data.cycle}</Text>
                    </View>
                )}

                {/* Luz solar */}
                {data.sunlight && (
                    <View style={styles.infoContainer}>
                        <Icon name='weather-sunny-alert' style={styles.icon} size={SIZES.large} color={COLORS.accent} />
                        <Text style={[styles.infoTitle, { color: themePallete.text }]}>Luz solar:</Text>
                        <Text style={[styles.infoText, { color: themePallete.text }]}> {data.sunlight}</Text>
                    </View>
                )}

                {/* Riego */}
                {data.watering && (
                    <View style={styles.infoContainer}>
                        <Icon name='water-alert' style={styles.icon} size={SIZES.large} color={COLORS.accent} />
                        <Text style={[styles.infoTitle, { color: themePallete.text }]}>Riego:</Text>
                        <Text style={[styles.infoText, { color: themePallete.text }]}> {data.watering}</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    nameInfo: {
        paddingVertical: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commonName: {
        fontWeight: 'bold',
        color: COLORS.accent,
        fontSize: SIZES.medium + 2,
    },
    scientificName: {
        fontSize: SIZES.medium,
    },
    imageStyle: {
        width: 200,
        height: 200,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.accent,
        marginVertical: 20,
    },
    imagePlaceholder: {
        width: 200,
        height: 200,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    imagePlaceholderText: {
        fontWeight: 'bold',
    },
    plantInfo: {
        width: '78%',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 22,
    },
    icon: {
        paddingRight: 12,
    },
    infoTitle: {
        fontWeight: '600',
        fontSize: SIZES.medium - 2,
    },
    infoText: {
        fontSize: SIZES.medium - 2,
    },
    loadingText: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
    },
});

// -------------------------------------------------------------------------- //

export default PlantInfoScreen;

// -------------------------------------------------------------------------- //
