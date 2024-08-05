
// -------------------------------------------------------------------------- //

import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import RNBounceable from '@freakycoder/react-native-bounceable';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';

// -------------------------------------------------------------------------- //

const InventoryScreen = () => {
    const { themePallete } = useTheme();

    // ---------------------------------------------------------------------- //

    // ---------------------------------------------------------------------- //

    return (
        <View style={[styles.mainContainer, { backgroundColor: themePallete.background }]}>

            {/* TITULO */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>NUESTRO EQUIPO DE DESARROLLO</Text>
            </View>

            {/* INFORMACIÓN */}
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* ... */}

            </ScrollView>

        </View>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        padding: 40, paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
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

});

// -------------------------------------------------------------------------- //

export default InventoryScreen;

// -------------------------------------------------------------------------- //
