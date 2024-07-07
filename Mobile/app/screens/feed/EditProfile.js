
// -------------------------------------------------------------------------- //

import { COLORS, SIZES } from '../../../ui/Styles';
import { useTheme } from '../../../ui/ThemeProvider';

import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// -------------------------------------------------------------------------- //

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const { themePallete } = useTheme();

    const user = {
        firstName: 'Ed', lastName: 'Rubio',
        image: 'https://i.pinimg.com/736x/40/11/b5/4011b5ab5f2376f26a5d46ff904fc5e2.jpg',
        level: 'Amante de la naturaleza',
        email: 'ed.cetacean@outlook.com',
        address: {
            country: 'México',
            state: 'B.C.',
            city: 'Tijuana',
            zip: '22253',
            street: 'El Laurel',
        },
        membership: 'Premium'

    };

    const handleSaveChanges = () => {

    };


    // ---------------------------------------------------------------------- //

    return (
        <View style={[ styles.mainContainer, { backgroundColor: themePallete.background } ]}>

        </View>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, alignItems: 'center'
    },

});

// -------------------------------------------------------------------------- //

export default EditProfileScreen;

// -------------------------------------------------------------------------- //
