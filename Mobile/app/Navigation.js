
// -------------------------------------------------------------------------- //

import { COLORS } from '../ui/Styles';
import { useTheme } from '../ui/ThemeProvider';
import ProfileButton from '../app/ProfileButton';
import SettingsButton from '../app/SettingsButton';
import EditProfileButton from '../app/EditProfileButton';

import { Entypo as Icon } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorfulTabBar } from 'react-navigation-tabbar-collection';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// -------------------------------------------------------------------------- //

// Stack:
import StartScreen from './screens/start/Start';
import LoginScreen from './screens/start/Login';
import SignupScreen from './screens/start/Signup';
import ForgotScreen from './screens/start/Password';
import ProfileScreen from './screens/feed/Profile';
import SettingsScreen from './screens/feed/Settings';
import PaymentScreen from './screens/client/Payments';
import EditProfileScreen from './screens/feed/EditProfile';
import GardenStatsScreen from './screens/client/GardenStats';

// Bottom:
import HomeScreen from './screens/feed/Home';
import GardensScreen from './screens/client/Gardens';
import ShoppingScreen from './screens/client/Shopping';

// ------------------------- BOTTOM-TAB: NAVIGATION ------------------------- //

const Bottom = createBottomTabNavigator();

function BottomNav() {
    const { themePallete, isDark } = useTheme();

    // ---------------------------------------------------------------------- //

    return(
        <Bottom.Navigator backBehavior='history' screenOptions={{ headerStyle: { backgroundColor: themePallete.background },
            headerShadowVisible: false, headerRight: () => <ProfileButton />, headerTitle: () => <SettingsButton />,
            }} tabBar={(props) => <ColorfulTabBar darkMode={isDark} maxWidth={'92%'} {...props} colorPalette={COLORS} />  }>

        {/* ---------------------------------------------------------------- */}

            <Bottom.Screen name='Home' component={HomeScreen} options={{
                title: 'Inicio', color: 'accent', icon: ({ focused, color, size }) => (
                    <Icon name="home" size={size} color={color} /> )
                }}
            />

            <Bottom.Screen name='Gardens' component={GardensScreen} options={{
                title: 'Jardínes', color: 'accent', icon: ({ focused, color, size }) => (
                    <Icon name="leaf" size={size} color={color} /> )
                }}
            />

            <Bottom.Screen name='Shopping' component={ShoppingScreen} options={{
                title: 'Compras', color: 'accent', icon: ({ focused, color, size }) => (
                    <Icon name="shop" size={size} color={color} /> )
                }}
            />

        </Bottom.Navigator>
    );

};

// ---------------------------- STACK: NAVIGATOR ---------------------------- //

const Stack = createStackNavigator();

export function StackNav() {
    const { themePallete, isDark } = useTheme();

    // ---------------------------------------------------------------------- //

    return (
        <Stack.Navigator initialRouteName='Start' detachInactiveScreens={true} screenOptions={{ title: false, animationEnabled: false,
            headerStyle: { backgroundColor: themePallete.background }, headerShadowVisible: false, headerTintColor: COLORS.accent,
            headerLeftContainerStyle: { paddingLeft: 12 }, headerRightContainerStyle: { paddingRight: 28 } }}>

            {/* Inicio: */}
            <Stack.Screen name='Start' component={StartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='Forgot' component={ForgotScreen} />

            {/* Dentro de la APP: */}
            <Stack.Screen name='Profile' component={ProfileScreen}
                options={{ headerRight: () => (
                    <EditProfileButton /> ),
                }}
            />
            <Stack.Screen name='GardenStats' component={GardenStatsScreen} />
            <Stack.Screen name='EditProfile' component={EditProfileScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
            <Stack.Screen name='Payment' component={PaymentScreen} />

            {/* Acceso directo al BottomNav: */}
            <Stack.Screen name='BottomNav' component={BottomNav} options={{ headerShown: false }} />
        </Stack.Navigator>
    );

};

// -------------------------------------------------------------------------- //
