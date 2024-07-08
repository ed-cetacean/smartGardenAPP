
// -------------------------------------------------------------------------- //

import { useTheme } from '../../../ui/ThemeProvider';

import { StyleSheet, View } from 'react-native';

// -------------------------------------------------------------------------- //

const ForgotScreen = () => {
    const { themePallete } = useTheme();

    // ---------------------------------------------------------------------- //

    return (
        <View style={[ styles.mainContainer, { backgroundColor: themePallete.background } ]}>

        </View>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },

});

// -------------------------------------------------------------------------- //

export default ForgotScreen;

// -------------------------------------------------------------------------- //