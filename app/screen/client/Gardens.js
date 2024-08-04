
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import { SourceIMG } from '../../../ui/Images';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';
import { useUser } from '../../../core/auth/UserProvider';

import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Carousel } from 'react-native-basic-carousel';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { MaterialIcons  as Icon } from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet, Dimensions, View, ImageBackground, Text, Switch } from 'react-native';

// -------------------------------------------------------------------------- //

const GardensScreen = () => {
    const { user } = useUser();
    const navigation = useNavigation();
    const { themePallete } = useTheme();
    const { width } = Dimensions.get('window');

    const bottomSheetRef = useRef(null);
    const [ userGardens, setUserGardens ] = useState([]);
    const [ selectedGarden, setSelectedGarden ] = useState(null);

    const [ isActive, setIsActive ] = useState(false);

    // ---------------------------------------------------------------------- //

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${MainSG}Jardin/user/${user.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserGardens(data);
                } else {
                    console.error('ERROR: Ha ocurrido un error al intentar cargar los jardines del usuario.');
                }
            } catch (error) {
                console.error('ERROR: No se pudieron cargar los jardines del usuario.', error);
            }
        };

        fetchUserData();
    }, []);

    // ---------------------------------------------------------------------- //

    const deleteGarden = async (gardenId) => {
        try {
            const response = await fetch(`${MainSG}Jardin/${gardenId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                console.log('Jardín eliminado con éxito');
                navigation.navigate('Gardens');
            } else {
                console.error('ERROR: Ha ocurrido un error al intentar eliminar el jardín.');
            }
        } catch (error) {
            console.error('ERROR: No se pudo eliminar el jardín.', error);
        }
    };

    // ---------------------------------------------------------------------- //

    const showGarden = (garden) => {
        setSelectedGarden(garden);
        bottomSheetRef.current?.expand();
    };

    const showCharts = (id, name) => {
        navigation.navigate('GardenStats', {
            gardenId: id,
            gardenName: name,
        });
    };

    const renderSensors = (sensors) => {
        return sensors.map((sensor, index) => {
            const unit = sensor.sensorType === 'Temperature' ? '°C' : '%';
            return (
                <View key={index} style={styles.sensorSection}>
                    <Text style={styles.sensorLecture}>{sensor.lastValue} {unit}</Text>
                    <Text style={styles.sensorRead}>{sensor.sensorType}</Text>
                </View>
            );
        });
    };

    const createGarden = () => {
        navigation.navigate('CreateGarden');
    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[ styles.mainContainer, { backgroundColor: themePallete.background } ]}>

            {/* Gardens */}
            <Carousel data={userGardens} itemWidth={width} pagination paginationColor={COLORS.accent}
                onSnapItem={(item) => console.log(item)}
                renderItem={({item, index}) =>
                    <RNBounceable style={styles.carouselButton} onPress={() => showGarden(item)}>
                        <ImageBackground style={styles.mainContainer} imageStyle={styles.gardenImage}
                            source={SourceIMG.mainGarden}>

                            <View style={[ styles.mainContainer, styles.gardenImage ]}>
                                {/* Basic information */}
                                <View style={styles.info}>
                                    <Text style={styles.gardenName}>{item.name.toUpperCase()}</Text>
                                    <Text style={styles.gardenDescription}>{item.description}</Text>
                                </View>

                                {/* Sensors information */}
                                <LinearGradient colors={['transparent', themePallete.background ]} style={styles.sensors}>
                                    {renderSensors(item.sensors)}
                                </LinearGradient>

                            </View>

                        </ImageBackground>
                    </RNBounceable>
            } />

            {/* Crear nuevo jardín */}
            <RNBounceable onPress={() => { createGarden(); }}>
                <View style={styles.buttonGarden}>
                    <Icon name='add' size={SIZES.xxLarge} color={COLORS.accent} />
                    <Text style={styles.textGarden}>REGISTRAR</Text>
                </View>
            </RNBounceable>

            {/* Modal */}
            <BottomSheet ref={bottomSheetRef} snapPoints={[ 1, '40%' ]} enablePanDownToClose
                backgroundStyle={{ backgroundColor: themePallete.background }}
                handleIndicatorStyle={{ backgroundColor: COLORS.accent }}
            >

                <BottomSheetView style={styles.modalContainer}>
                    {selectedGarden && (
                        <>
                            <RNBounceable style={styles.modalEdit}>
                                <Text style={[ styles.optionEdit, { color: themePallete.text } ]}>{selectedGarden.name}</Text>
                                <AntDesign name="edit" size={SIZES.small} color={themePallete.text} />
                            </RNBounceable>

                            {/* Activar/Desactivar paquete de sensores */}
                            <View style={styles.optionContainer}>
                                <Icon name={isActive ? 'sensors' : 'sensors-off' }
                                    size={SIZES.xLarge} color={ COLORS.accent } style={styles.iconOption} />

                                <Text style={[ styles.textOption, { color: themePallete.text } ]}>Paquete de sensores</Text>

                                <Switch value={isActive} onValueChange={() => { setIsActive(!isActive) }} style={styles.switchOption}
                                    trackColor={{ false: COLORS.disabled, true: COLORS.alterDisabled }}
                                    thumbColor={COLORS.accent}
                                />
                            </View>

                            {/* Mostrar gráficas de lecturas de sensores */}
                            <RNBounceable style={{ width: '100%' }} onPress={() => { showCharts(selectedGarden.id, selectedGarden.name) }}>
                                <View style={styles.optionContainer}>
                                    <Icon name='auto-graph' size={SIZES.xLarge} color={ COLORS.accent } style={styles.iconOption} />
                                    <Text style={[ styles.textOption, { color: themePallete.text } ]}>Mostrar gráficas</Text>
                                </View>
                            </RNBounceable>

                            {/* Perfil del jardín, cambia comportamiento de los sensores */}
                            {/* <View style={styles.optionContainer}>
                                <Icon name='style' size={SIZES.xLarge} color={ COLORS.accent } style={styles.iconOption} />
                                <Text style={[ styles.textOption, { color: themePallete.text } ]}>Perfil actual</Text>

                                <Text style={[ styles.textOption, styles.switchOption, { color: themePallete.alterText } ]}>{selectedGarden.profile}</Text>
                            </View> */}

                            {/* Eliminar jardín */}
                            <RNBounceable style={{ width: '100%' }} onPress={() => { deleteGarden(selectedGarden.id) }}>
                                <View style={[ styles.optionContainer, { borderBottomWidth: 0 } ]}>
                                    <Icon name='delete-forever' size={SIZES.xLarge} color={ COLORS.accent } style={styles.iconOption} />
                                    <Text style={[ styles.textOption, { color: themePallete.text } ]}>Eliminar</Text>
                                </View>
                            </RNBounceable>
                        </>
                    )}
                </BottomSheetView>
            </BottomSheet>

        </View>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: { flex: 1, },

    carouselButton: {
        width: '80%', height: '90%',
        alignSelf: 'center', marginTop: 40,
    },

    gardenImage: { borderRadius: 12, backgroundColor: COLORS.darkTransparent, },

    info: {
        width: '100%', height: '20%',
        alignItems: 'center', justifyContent: 'center',
    },

    gardenName: {
        fontSize: SIZES.xxLarge,
        color: COLORS.accent,
        fontWeight: 'bold',
    },

    gardenDescription: {
        fontSize: SIZES.medium,
        color: COLORS.light,
    },

    sensors: {
        flexDirection: 'row',
        width: '100%', height: '30%',
        position: 'absolute', bottom: 0,
    },

    sensorSection: {
        flex: 3,
        alignItems: 'center', justifyContent: 'center',
    },

    sensorLecture: {
        fontSize: SIZES.xLarge,
        color: COLORS.light,
        fontWeight: 'bold',
    },

    sensorRead: {
        fontSize: SIZES.small,
        color: COLORS.light,
    },

    buttonGarden: {
        width: 'auto', height: 60,
        borderColor: COLORS.accent,
        borderWidth: 2, borderRadius: 60,
        marginVertical: 22, paddingHorizontal: 22,
        alignSelf: 'center', justifyContent: 'center',
        flexDirection: 'row', alignItems: 'center'
    },

    textGarden: {
        paddingLeft: 8, color: COLORS.accent,
        fontWeight: 'bold', fontSize: SIZES.medium,
    },

    // ---------------------------------------------------------------------- //

    modalContainer: {
        alignItems: 'center',
    },

    modalEdit: {
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },

    optionEdit: {
        marginRight: 12,
        fontWeight: 'bold',
        fontSize: SIZES.medium,
    },

    modalDescription: {
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    optionContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '82%', height: 72,

        marginVertical: 4,
        paddingHorizontal: 22,
        borderBottomWidth: .6,
        borderColor: COLORS.alterDisabled,
    },

    iconOption: {
        paddingRight: 12,
    },

    textOption: {
        fontWeight: '500',
        fontSize: SIZES.medium,
    },

    switchOption: {
        marginRight: 24,
        position: 'absolute', right: 0,
    },

});

// -------------------------------------------------------------------------- //

export default GardensScreen;

// -------------------------------------------------------------------------- //
