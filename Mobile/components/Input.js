
// -------------------------------------------------------------------------- //

import { COLORS, SIZES } from '../ui/Styles';
import { useTheme } from '../ui/ThemeProvider';

import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Animated, StyleSheet, Platform } from 'react-native';

// ---------------------------- COMPONENT: INPUT ---------------------------- //

const InputCW = ({ leftIcon, rightIcon, placeholder, ...props }) => {
    const { themePallete } = useTheme();

    const [ isFocused, setIsFocused ] = useState(false);
    const animFocused = useRef(new Animated.Value(props.value === '' ? 0 : 1)).current;

    // ---------------------------------------------------------------------- //

    // Actualizar la animación cuando 'isFocused' o 'props.value' cambian.
    useEffect(() => {
        Animated.timing(animFocused, {
            toValue: (isFocused || props.value !== '') ? 1 : 0,
            duration: 200, useNativeDriver: false,
        }).start();
    }, [ isFocused, props.value ]);

    // ---------------------------------------------------------------------- //

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    // ---------------------------------------------------------------------- //

    const placeholderSTL = {
        position: 'absolute', left: 4,

        // Cambia la posición del 'placeholder', dependiendo de 'isFocused'.
        top: animFocused.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: Platform.OS === 'web' ? [0, -22] : [22, -8],
        }),

        // Cambia el tamaño del 'placeholder', dependiendo de 'isFocused'.
        fontSize: animFocused.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: [ SIZES.medium, SIZES.small ]
        }),

        // Cambia el color del 'placeholder', dependiendo de 'isFocused'.
        color: animFocused.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: [ themePallete.input, COLORS.accent ],
        }),

    };

    // ---------------------------------------------------------------------- //

    return(
        <View style={styles.container}>
            {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

            <View style={styles.inputContainer}>
                <Animated.Text style={placeholderSTL}>{placeholder}</Animated.Text>

                <TextInput style={[ styles.textInput, { color: themePallete.input }]}
                    selectionColor={COLORS.accent} onFocus={handleFocus} onBlur={handleBlur} {...props} />
            </View>

            {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
        </View>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    container: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        width: '100%', height: 60,
        borderColor: COLORS.accent,
    },

    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50, height: '100%',
    },

    inputContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    textInput: {
        flex: 1,
        height: '100%',
        outlineStyle: 'none',
        paddingHorizontal: 4,
        fontSize: SIZES.medium,
    },

});

// -------------------------------------------------------------------------- //

export default InputCW;

// -------------------------------------------------------------------------- //
