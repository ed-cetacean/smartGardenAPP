
// -------------------------------------------------------------------------- //

import { MainSG } from '../../../api/Config';
import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import Toast from 'react-native-toast-message';
import React, { useEffect,useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Swing } from 'react-native-animated-spinkit';
import { LineChart } from 'react-native-gifted-charts';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';

// -------------------------------------------------------------------------- //

const GardenStatsScreen = () => {
    const route = useRoute();
    const { themePallete } = useTheme();
    const { gardenId, gardenName } = route.params;
    const [ sensorData, setSensorData ] = useState([]);

    const chartWidth =  Dimensions.get('window').width * 0.68;

    // ---------------------------------------------------------------------- //

    useEffect(() => {
        const intervalId = setInterval(() => {
            const fetchGardenData = async () => {
                try {
                    const response = await fetch(`${MainSG}Lectura/jardin//${gardenId}`, {
                        method: 'GET', headers: { 'Content-Type': 'application/json' }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setSensorData(data);
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'ERROR',
                            text2: 'Ha ocurrido un error al intentar cargar las lecturas de los sensores.',
                            visibilityTime: 4500,
                        })

                        // console.error('ERROR: Ha ocurrido un error al intentar cargar las lecturas de los sensores.');
                    }
                } catch (error) {
                    Toast.show({
                        type: 'error',
                        text1: 'ERROR',
                        text2: 'No se pudieron cargar las lecturas de los sensores.',
                        visibilityTime: 4500,
                    })

                    // console.error('ERROR: No se pudieron cargar las lecturas de los sensores.', error);
                }
            };

            fetchGardenData();

        }, 5000);

        return () => {
          clearInterval(intervalId);
        };
      }, []);


    // useEffect(() => {

    // }, []);

    // ---------------------------------------------------------------------- //

    // Da un formato presentable a la hora de cada registro.
    const formatData = (sensorData) => {
        return sensorData.map(entry => {
            const date = new Date(entry.timeStamp);
            const hours = date.getUTCHours().toString().padStart(2, '0');
            const minutes = date.getUTCMinutes().toString().padStart(2, '0');

            return {
                value: entry.value,
                label: `${hours}:${minutes}`,
            };
        });
    };

    // Indicador de carga si no se obtienen datos del jardín seleccionado.
    if (!sensorData.length) {
        return (
            <View style={[styles.mainContainer, { backgroundColor: themePallete.background, justifyContent: 'center' }]}>
                <Swing size={SIZES.xxLarge * 1.8} color={COLORS.accent} />
            </View>
        );
    }

    // ---------------------------------------------------------------------- //

    // Obtiene los datos de cada sensor.
    const moistureData = sensorData.find(sensor => sensor.sensorType === 'Moisture')?.lecturas || [];
    const lightData = sensorData.find(sensor => sensor.sensorType === 'Light')?.lecturas || [];
    const temperatureData = sensorData.find(sensor => sensor.sensorType === 'Temperature')?.lecturas || [];

    const formattedMoisture = formatData(moistureData);
    const formattedLight = formatData(lightData);
    const formattedTemperature = formatData(temperatureData);

    // -- CONFIGURACIÓN DE LAS GRÁFICAS ------------------------------------- //

    const chartProps = {
        width: chartWidth, height: 220, // Tamaño de la gráfica.
        overflowTop: 40, // Espacio extra en la parte superior.
        spacing: 80, // Espacio entre cada lectura.

        scrollToEnd: true, // Muestra el final de la gráfica.
        isAnimated: true, // Despliega una animación al ser mostrada.
        animateOnDataChange: true, // Despliega una animación al actualizar los datos.
        scrollAnimation: true, // Despliega una animación al pasar al punto final de la gráfica.
        hideDataPoints: true, // Esconde los 'data-points'.

        // Estilo aplicado al texto inferior.
        xAxisLabelTextStyle: [ styles.chartLabel, { color: themePallete.text } ],
        yAxisTextStyle: [ styles.chartLabel, { color: themePallete.text } ],

        // Estetica de la gráfica.
        areaChart: true, curved: true,
        //initialSpacing: 0, //endSpacing: 20,
        rulesType: 'solid',

        // Estilo de la línea que une los puntos.
        thickness: 2,
        startOpacity: .4, endOpacity: .2,
        endFillColor: themePallete.background,
    };

    const chartMoisture = {
        noOfSections: 4, // Secciones (vertical).
        rulesColor: 'rgba(196, 223, 250, .4)',

        // Estilo de la línea que une los puntos.
        color: COLORS.blue,
        startFillColor: COLORS.blue,

        // Estilo de la línea vertical/horizontal.
        yAxisThickness: 0, xAxisThickness: 2,
        xAxisColor: COLORS.blue,

        // Configuración adicional.
        pointerConfig: {
            pointerStripWidth: 2,
            pointerStripHeight: 220,

            focusEnabled: true,
            stripOverPointer: true,
            showPointerStrip: true,
            pointerStripUptoDataPoint: true,

            pointerColor: COLORS.blue,
            pointerStripColor: COLORS.blue,

            pointerLabelWidth: 120,
            pointerLabelHeight: 80,

            activatePointersOnLongPress: true,

            pointerLabelComponent: (items) => {
                return (
                    <View style={styles.pointerContainer}>
                        <Text style={[ styles.pointerText, { color: themePallete.text } ]}>{items[0].value} %</Text>
                    </View>
                );
            },
        },

    };

    const chartLight = {
        noOfSections: 4, // Secciones (vertical).
        rulesColor: 'rgba(255, 224, 120, .4)',

        // Estilo de la línea que une los puntos.
        color: COLORS.yellow,
        startFillColor: COLORS.yellow,

        // Estilo de la línea vertical/horizontal.
        yAxisThickness: 0, xAxisThickness: 2,
        xAxisColor: COLORS.yellow,

        // Configuración adicional.
        pointerConfig: {
            pointerStripWidth: 2,
            pointerStripHeight: 220,

            focusEnabled: true,
            stripOverPointer: true,
            showPointerStrip: true,
            pointerStripUptoDataPoint: true,

            pointerColor: COLORS.yellow,
            pointerStripColor: COLORS.yellow,

            pointerLabelWidth: 120,
            pointerLabelHeight: 80,

            activatePointersOnLongPress: true,

            pointerLabelComponent: (items) => {
                return (
                    <View style={styles.pointerContainer}>
                        <Text style={[ styles.pointerText, { color: themePallete.text } ]}>{items[0].value} %</Text>
                    </View>
                );
            },
        },
    };

    const chartTemperature = {
        noOfSections: 4, // Secciones (vertical).
        rulesColor: 'rgba(171, 209, 181, .4)',

        // Estilo de la línea que une los puntos.
        color: COLORS.green,
        startFillColor: COLORS.green,

        // Estilo de la línea vertical/horizontal.
        yAxisThickness: 0,
        xAxisThickness: 2,
        xAxisColor: COLORS.green,

        // Configuración adicional.
        pointerConfig: {
            pointerStripWidth: 2,
            pointerStripHeight: 220,

            focusEnabled: true,
            stripOverPointer: true,
            showPointerStrip: true,
            pointerStripUptoDataPoint: true,

            pointerColor: COLORS.green,
            pointerStripColor: COLORS.green,

            pointerLabelWidth: 120,
            pointerLabelHeight: 80,

            activatePointersOnLongPress: true,

            pointerLabelComponent: (items) => {
                return (
                    <View style={styles.pointerContainer}>
                        <Text style={[ styles.pointerText, { color: themePallete.text } ]}>{items[0].value} %</Text>
                    </View>
                );
            },
        },
    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* Nombre del jardín */}
            <Text style={styles.gardenName}>{(gardenName).toUpperCase()}</Text>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Humedad de suelo */}
                {moistureData.length > 0 && (
                    <>
                        <Text style={[ styles.chartName, { color: themePallete.text } ]}>Humedad</Text>

                        <View style={styles.charContainer}>
                            <LineChart {...chartProps} {...chartMoisture} data={formattedMoisture} />
                        </View>
                    </>
                )}

                {/* Intensidad de luz solar */}
                {lightData.length > 0 && (
                    <>
                        <Text style={[ styles.chartName, { color: themePallete.text } ]}>Luminosidad</Text>

                        <View style={styles.charContainer}>
                            <LineChart {...chartProps} {...chartLight} data={formattedLight} />
                        </View>
                    </>
                )}

                {/* Temperatura ambiente */}
                {temperatureData.length > 0 && (
                    <>
                        <Text style={[ styles.chartName, { color: themePallete.text } ]}>Temperatura</Text>

                        <View style={styles.charContainer}>
                            <LineChart {...chartProps} {...chartTemperature} data={formattedTemperature} />
                        </View>
                    </>
                )}
            </ScrollView>

        </View>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, alignItems: 'center',
    },

    // ---------------------------------------------------------------------- //

    gardenName: {
        letterSpacing: 10,
        fontWeight: 'bold',
        paddingVertical: 22,
        color: COLORS.accent,
        fontSize: SIZES.xLarge,
    },

    // ---------------------------------------------------------------------- //

    scrollContainer: {
        width: '100%', marginBottom: 40,
    },

    chartName: {
        alignSelf: 'center',
        paddingVertical: 50,
        fontSize: SIZES.medium,
    },

    charContainer: {
        width: '80%',
        alignSelf: 'center',
    },

});

// -------------------------------------------------------------------------- //

export default GardenStatsScreen;

// -------------------------------------------------------------------------- //
