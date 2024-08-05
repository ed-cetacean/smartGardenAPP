
// -------------------------------------------------------------------------- //

import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import React, { useState, useRef } from 'react';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { StyleSheet, ScrollView, Animated, View, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const FAQScreen = () => {
    const { themePallete } = useTheme();

    // ---------------------------------------------------------------------- //

    const questions = [
        {
            questionText: '¿Qué funcionalidades ofrece la aplicación?',
            answerText: 'La aplicación permite la monitorización de las condiciones del jardín, así como el riego automático, desplegar cubiertas de luz, edición de información del jardín, y la vista de estadísticas avanzadas si el usuario tiene una membresía.',
        },
        {
            questionText: '¿Cómo puedo añadir un jardín a la aplicación?',
            answerText: 'Puedes añadir un jardín asignándole un paquete de sensores que no esté asignado a otro jardín. Esto se hace a través de la sección de gestión de jardines en la aplicación.',
        },
        {
            questionText: '¿Qué tipos de sensores se utilizan?',
            answerText: 'Utilizamos sensores de temperatura, humedad y luz para monitorear las condiciones del jardín.',
        },
        {
            questionText: '¿Qué ventajas tiene obtener una membresía?',
            answerText: 'Los usuarios con membresía tienen acceso al control del jardín y a estadísticas avanzadas del mismo a través de gráficas detalladas.',
        },
        {
            questionText: '¿Puedo ver las compras que he realizado?',
            answerText: 'Sí, puedes acceder a una sección en la que puedes ver todas las compras que has realizado dentro de la aplicación.',
        },
        {
            questionText: '¿Cómo puedo editar la información de mi jardín?',
            answerText: 'Puedes editar la información de tu jardín accediendo a la sección de gestión de jardines en la aplicación. Desde ahí, puedes modificar los detalles del jardín y los sensores asignados.',
        },
        {
            questionText: '¿Es posible eliminar un jardín?',
            answerText: 'Sí, puedes eliminar un jardín desde la sección de gestión de jardines en la aplicación.',
        },
        {
            questionText: '¿Cómo puedo editar mi información personal?',
            answerText: 'Puedes editar tu información personal accediendo a la sección de perfil en la aplicación y actualizando los datos que necesites cambiar.',
        },
        {
            questionText: '¿Cómo funciona el riego automático?',
            answerText: 'El riego automático se activa basándose en los datos de los sensores de humedad del suelo. Cuando la humedad cae por debajo de un nivel predefinido, el sistema activa el riego para mantener las condiciones óptimas para las plantas.',
        },
        {
            questionText: '¿Qué es la cubierta de luz y cómo se despliega?',
            answerText: 'La cubierta de luz es una función que permite controlar la cantidad de luz que recibe el jardín. Se despliega automáticamente según los datos del sensor de luz para proporcionar la cantidad adecuada de luz a las plantas.',
        },
        {
            questionText: '¿Cómo funciona la búsqueda de plantas?',
            answerText: 'La aplicación ofrece una funcionalidad de búsqueda donde puedes encontrar información detallada sobre diferentes tipos de plantas, incluyendo sus necesidades de cuidado, condiciones óptimas de crecimiento, y más.',
        },
    ];

    // ---------------------------------------------------------------------- //

    const [ selectedQuestion, setSelectedQuestion ] = useState(null);
    const animationValues = useRef(questions.map(() => new Animated.Value(0))).current;

    // ---------------------------------------------------------------------- //

    const toggleAnswer = (index) => {

        // Si la pregunta ha sido abierta, se cierra.
        if (selectedQuestion === index) {
            Animated.timing(animationValues[index], {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setSelectedQuestion(null));

        // Si la pregunta no ha sido abierta, se abre.
        } else {

            // Cierre de otras preguntas.
            if (selectedQuestion !== null) {
                Animated.timing(animationValues[selectedQuestion], {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
            // Abre la nueva pregunta.
            setSelectedQuestion(index);
            Animated.timing(animationValues[index], {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }

    };

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* TITULO */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>DUDAS FRECUENTES</Text>
            </View>

            {/* PREGUNTAS FRECUENTES */}
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {questions.map((item, index) => (

                    <View key={index}>
                        <RNBounceable onPress={() => toggleAnswer(index)}>
                            <View style={styles.questionContainer}>
                                <Text style={[styles.questionText, { color: selectedQuestion === index ? COLORS.accent : themePallete.text }]}>{item.questionText}</Text>
                                <Icon name={selectedQuestion === index ? 'chevron-up' : 'chevron-down'} size={SIZES.large} color={COLORS.accent} />
                            </View>
                        </RNBounceable>

                        {selectedQuestion === index && (
                            <Animated.View style={[styles.answerContainer, { opacity: animationValues[index] }]}>
                                <Text style={[styles.answerText, { color: themePallete.text }]}>{item.answerText}</Text>
                            </Animated.View>
                        )}
                    </View>

                ))}
            </ScrollView>
        </View>
    );
};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40, paddingTop: 0,
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

    questionContainer: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    questionText: {
        fontSize: SIZES.medium,
    },

    // ---------------------------------------------------------------------- //

    answerContainer: {
        paddingBottom: 12,
        overflow: 'hidden',
        paddingHorizontal: 18,
    },

    answerText: {
        letterSpacing: .8,
        textAlign: 'justify',
        fontSize: SIZES.small + 2,
    },

});

export default FAQScreen;

// -------------------------------------------------------------------------- //
