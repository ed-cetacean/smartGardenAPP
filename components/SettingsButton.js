
// -------------------------------------------------------------------------- //

import { COLORS } from '../ui/Styles';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNBounceable from '@freakycoder/react-native-bounceable';

// -------------------------------------------------------------------------- //

const SettingsButton = () => {
    const navigation = useNavigation();

    return (
        <RNBounceable onPress={() => { navigation.navigate('Settings') }}>
            <MaterialIcons name="settings-suggest" size={28} color={COLORS.accent} style={{ marginLeft: 12 }} />
        </RNBounceable>
    );

};

// -------------------------------------------------------------------------- //

export default SettingsButton;

// -------------------------------------------------------------------------- //
