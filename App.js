
// -------------------------------------------------------------------------- //

import { StackNav } from './app/Navigation';
import { ThemeProvider } from './ui/ThemeProvider';
import { UserProvider } from './core/auth/UserProvider';

import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// -------------------------------- MAIN-APP -------------------------------- //

export default function App() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
                <ThemeProvider>
                    <NavigationContainer>
                        <UserProvider>
                            <StackNav />
                        </UserProvider>
                    </NavigationContainer>
                </ThemeProvider>
            </GestureHandlerRootView>
    );

};

// -------------------------------------------------------------------------- //
