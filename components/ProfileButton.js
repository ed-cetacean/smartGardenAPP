
// -------------------------------------------------------------------------- //

import AvatarCW from './Avatar';
import { COLORS, SIZES } from '../ui/Styles';
import { useUser } from '../core/auth/UserProvider';

import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';

// -------------------------------------------------------------------------- //

const ProfileButton = () => {
    const { user } = useUser();
    const navigation = useNavigation();

    return(
        <RNBounceable style={[ styles.mainStyle, styles.userAvatar ]} onPress={() => { navigation.navigate('Profile') }}>
            <AvatarCW name1={user.firstName} name2={user.lastName} textStyle={styles.textStyle} />
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
