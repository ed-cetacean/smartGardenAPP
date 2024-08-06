
// -------------------------------------------------------------------------- //

import { COLORS } from './ui/Styles';
import { StackNav } from './app/Navigation';
import { ThemeProvider } from './ui/ThemeProvider';
import { UserProvider } from './core/auth/UserProvider';

import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

// -------------------------------------------------------------------------- //

// Alertas:
const toastConfig = {

    success: (props) => (
        <BaseToast {...props}
            style={{
                backgroundColor: COLORS.dark,
                borderLeftColor: COLORS.green,
                borderLeftWidth: 8,
                marginTop: 50,
                width: '80%',
                height: 80,
            }}

            contentContainerStyle={{
                paddingHorizontal: 16,
            }}

            text1Style={{
                fontSize: 16,
                fontWeight: '600',
                color: COLORS.light,
            }}

            text2Style={{
                fontSize: 14,
                color: COLORS.light,
            }}
        />
    ),

    error: (props) => (
        <ErrorToast {...props}
            text2NumberOfLines={3}

            style={{
                backgroundColor: COLORS.dark,
                borderLeftColor: COLORS.red,
                borderLeftWidth: 8,
                marginTop: 50,
                width: '80%',
                height: 80,
            }}

            contentContainerStyle={{
                paddingHorizontal: 16,
            }}

            text1Style={{
                fontSize: 16,
                fontWeight: '600',
                color: COLORS.light,
            }}

            text2Style={{
                fontSize: 14,
                color: COLORS.light,
            }}
        />
    ),

};

// -------------------------------- MAIN-APP -------------------------------- //

export default function App() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
                <ThemeProvider>
                    <NavigationContainer>
                        <UserProvider>
                            <StackNav />
                            <Toast config={toastConfig} />
                        </UserProvider>
                    </NavigationContainer>
                </ThemeProvider>
            </GestureHandlerRootView>
    );

};

// -------------------------------------------------------------------------- //
