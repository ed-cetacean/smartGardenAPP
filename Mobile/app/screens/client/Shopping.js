
// -------------------------------------------------------------------------- //

import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../ui/ThemeProvider';
import RNBounceable from '@freakycoder/react-native-bounceable';

// -------------------------------------------------------------------------- //

const ShoppingScreen = () => {
    const { themePallete } = useTheme();

    return (
        <View style={[ styles.mainContainer, { backgroundColor: themePallete.background } ]}>
            <ScrollView style={{ flex: 1 }}>

                <RNBounceable onPress={() => {}}>
                    <View>

                    </View>
                </RNBounceable>

                <RNBounceable onPress={() => {}}>
                    <View>

                    </View>
                </RNBounceable>

                <RNBounceable onPress={() => {}}>
                    <View>

                    </View>
                </RNBounceable>

            </ScrollView>
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

export default ShoppingScreen;

// -------------------------------------------------------------------------- //
