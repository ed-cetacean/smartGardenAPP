
// -------------------------------------------------------------------------- //

import { COLORS, SIZES } from '../ui/Styles';
import AvatarCW from '../components/Avatar';

import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';

// -------------------------------------------------------------------------- //

const ProfileButton = () => {
    const navigation = useNavigation();

    const user = {
        firstName: 'Ed', lastName: 'Rubio Zuñiga',
        image: null,//'https://i.pinimg.com/736x/40/11/b5/4011b5ab5f2376f26a5d46ff904fc5e2.jpg',
    };

    return(
        <RNBounceable style={[ styles.mainStyle, styles.userAvatar ]} onPress={() => { navigation.navigate('Profile') }}>
            <AvatarCW name1={user.firstName} name2={user.lastName} image={user.image}
                textStyle={styles.textStyle} imageStyle={styles.mainStyle} />
        </RNBounceable>
    );

};

// -------------------------------------------------------------------------- //

const styles = StyleSheet.create({

    mainStyle: {
        width: 42, height: 42,
        borderColor: COLORS.accent,
        borderWidth: 2, borderRadius: 30,
    },

    userAvatar: {
        marginRight: 28, backgroundColor: COLORS.accent,
        alignItems: 'center', justifyContent: 'center',
    },

    textStyle: {
        letterSpacing: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.light,
        fontSize: SIZES.medium,
    },

});

// -------------------------------------------------------------------------- //

export default ProfileButton;

// -------------------------------------------------------------------------- //
