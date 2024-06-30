
// -------------------------------------------------------------------------- //

import { StackNav } from './app/Navigation';
import { ThemeProvider } from './ui/ThemeProvider';

import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// -------------------------------- MAIN-APP -------------------------------- //

export default function App() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <NavigationContainer>
                    <StackNav />
                </NavigationContainer>
            </ThemeProvider>
        </GestureHandlerRootView>
    );

};

// -------------------------------------------------------------------------- //
