
// -------------------------------------------------------------------------- //

import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import { useRoute } from '@react-navigation/native';
import { LineChart } from 'react-native-gifted-charts';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';

// -------------------------------------------------------------------------- //

const GardenStatsScreen = () => {
    const route = useRoute();
    const { gardenId } = route.params;
    const { themePallete } = useTheme();

    const chartWidth =  Dimensions.get('window').width * 0.68;

    // ---------------------------------------------------------------------- //

    const sensorRead = [
        {
            gardenId: 1,
            gardenName: 'Disenchanted',
            sensors: {
                moisture: [
                    { timestamp: "2024-06-30T00:00:00Z", value: 30 },
                    { timestamp: "2024-06-30T01:00:00Z", value: 35 },
                    { timestamp: "2024-06-30T02:00:00Z", value: 32 },
                    { timestamp: "2024-06-30T03:00:00Z", value: 28 },
                    { timestamp: "2024-06-30T04:00:00Z", value: 33 },
                    { timestamp: "2024-06-30T05:00:00Z", value: 30 },
                ],
                light: [
                    { timestamp: "2024-06-30T00:00:00Z", value: 200 },
                    { timestamp: "2024-06-30T01:00:00Z", value: 210 },
                    { timestamp: "2024-06-30T02:00:00Z", value: 190 },
                    { timestamp: "2024-06-30T03:00:00Z", value: 205 },
                    { timestamp: "2024-06-30T04:00:00Z", value: 195 },
                    { timestamp: "2024-06-30T05:00:00Z", value: 200 },
                ],
                temperature: [
                    { timestamp: "2024-06-30T00:00:00Z", value: 25 },
                    { timestamp: "2024-06-30T01:00:00Z", value: 24 },
                    { timestamp: "2024-06-30T02:00:00Z", value: 26 },
                    { timestamp: "2024-06-30T03:00:00Z", value: 23 },
                    { timestamp: "2024-06-30T04:00:00Z", value: 22 },
                    { timestamp: "2024-06-30T05:00:00Z", value: 24 },
                ]
            }
        },
        {
            gardenId: 2,
            gardenName: 'Togetherness',
            sensors: {
                moisture: [
                    { timestamp: "2024-06-30T00:00:00Z", value: 40 },
                    { timestamp: "2024-06-30T01:00:00Z", value: 42 },
                    { timestamp: "2024-06-30T02:00:00Z", value: 39 },
                    { timestamp: "2024-06-30T03:00:00Z", value: 41 },
                    { timestamp: "2024-06-30T04:00:00Z", value: 38 },
                    { timestamp: "2024-06-30T05:00:00Z", value: 40 },
                ],
                temperature: [
                    { timestamp: "2024-06-30T04:00:00Z", value: 22 },
                    { timestamp: "2024-06-30T05:00:00Z", value: 23 },
                    { timestamp: "2024-06-30T06:00:00Z", value: 21 },
                    { timestamp: "2024-06-30T07:00:00Z", value: 22 },
                    { timestamp: "2024-06-30T08:00:00Z", value: 23 },
                    { timestamp: "2024-06-30T09:00:00Z", value: 22 },
                ]
            }
        },
        {
            gardenId: 3,
            gardenName: 'Departure',
            sensors: {
                light: [
                    { timestamp: "2024-06-30T00:00:00Z", value: 300 },
                    { timestamp: "2024-06-30T01:00:00Z", value: 310 },
                    { timestamp: "2024-06-30T02:00:00Z", value: 290 },
                    { timestamp: "2024-06-30T03:00:00Z", value: 305 },
                    { timestamp: "2024-06-30T04:00:00Z", value: 295 },
                    { timestamp: "2024-06-30T05:00:00Z", value: 300 },
                ],
                temperature: [
                    { timestamp: "2024-06-30T00:00:00Z", value: 28 },
                    { timestamp: "2024-06-30T01:00:00Z", value: 27 },
                    { timestamp: "2024-06-30T02:00:00Z", value: 29 },
                    { timestamp: "2024-06-30T03:00:00Z", value: 28 },
                    { timestamp: "2024-06-30T04:00:00Z", value: 27 },
                    { timestamp: "2024-06-30T08:00:00Z", value: 28 },
                ]
            }
        }
    ];

    // ---------------------------------------------------------------------- //

    const gardenData = sensorRead.find(garden => garden.gardenId === 4);

    // Indicador de carga si no se obtienen datos del jardín seleccionado.
    if (!gardenData) {

        return (
            <View style={[styles.mainContainer, { backgroundColor: themePallete.background, justifyContent: 'center' }]}>
                <Text style={[ styles.nullData, { color: themePallete.text } ]}>SIN DATOS DISPONIBLES</Text>
            </View>
        );

    };

    const { moisture, light, temperature } = gardenData.sensors;

    // Da un formato presentable a la hora de cada registro.
    const formatData = (sensorData) => {
        return sensorData.map(entry => ({
            value: entry.value,
            label: new Date(entry.timestamp).getUTCHours().toString().padStart(2, '0') + ':00',
        }));
    };

    const formattedMoisture = moisture ? formatData(moisture) : [];
    const formattedLight = light ? formatData(light) : [];
    const formattedTemperature = temperature ? formatData(temperature) : [];

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
            <Text style={styles.gardenName}>{(gardenData.gardenName).toUpperCase()}</Text>

            <ScrollView style={styles.scrollContainer}>
                {/* Humedad de suelo */}
                {moisture && (
                    <>
                        <Text style={[ styles.chartName, { color: themePallete.text } ]}>Humedad</Text>

                        <View style={styles.charContainer}>
                            <LineChart {...chartProps} {...chartMoisture} data={formattedMoisture} />
                        </View>
                    </>
                )}

                {/* Intensidad de luz solar */}
                {light && (
                    <>
                        <Text style={[ styles.chartName, { color: themePallete.text } ]}>Luminosidad</Text>

                        <View style={styles.charContainer}>
                            <LineChart {...chartProps} {...chartLight} data={formattedLight} />
                        </View>
                    </>
                )}

                {/* Temperatura ambiente */}
                {temperature && (
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

    nullData: {
        fontWeight: 'bold',
        fontSize: SIZES.large,
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
