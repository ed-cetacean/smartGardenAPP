
// -------------------------------------------------------------------------- //

import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import { StyleSheet, View, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const HomeScreen = () => {
    const { themePallete } = useTheme();

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>
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

export default HomeScreen;

// -------------------------------------------------------------------------- //
