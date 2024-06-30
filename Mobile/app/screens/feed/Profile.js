
// -------------------------------------------------------------------------- //

import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../ui/ThemeProvider';

// -------------------------------------------------------------------------- //

const ProfileScreen = () => {
    const { themePallete } = useTheme();

    return (
        <View style={[ styles.mainContainer, { backgroundColor: themePallete.background } ]}>

        </View>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },

});

// -------------------------------------------------------------------------- //

export default ProfileScreen;

// -------------------------------------------------------------------------- //
