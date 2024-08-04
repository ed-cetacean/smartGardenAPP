
// -------------------------------------------------------------------------- //

import { COLORS } from '../ui/Styles';
import { useTheme } from '../ui/ThemeProvider';
import { useUser } from '../core/auth/UserProvider';
import ProfileButton from '../components/ProfileButton';
import SettingsButton from '../components/SettingsButton';
import EditProfileButton from '../components/EditProfileButton';

import { Entypo as Icon } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorfulTabBar } from 'react-navigation-tabbar-collection';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// -------------------------------------------------------------------------- //

// Admin:

// Client:
import PlantInfoScreen from './screen/client/PlantInfo';
import GardensScreen from './screen/client/Gardens';
import GardenStatsScreen from './screen/client/GardenStats';
import CreateGardenScreen from './screen/client/CreateGarden';
import ShoppingScreen from './screen/client/Shopping';
import PaymentScreen from './screen/client/Payments';
import PaymentInfoScreen from './screen/client/PaymentInfo';

// Feed:
import HomeScreen from './screen/feed/Home';
import ProfileScreen from './screen/feed/Profile';
import EditProfileScreen from './screen/feed/EditProfile';
import SettingsScreen from './screen/feed/Settings';

// Start:
import StartScreen from './screen/start/Start';
import LoginScreen from './screen/start/Login';
import SignupScreen from './screen/start/Signup';

// ------------------------- BOTTOM-TAB: NAVIGATION ------------------------- //

const Bottom = createBottomTabNavigator();

function BottomNavClient() {
    const { user } = useUser();
    const { themePallete, isDark } = useTheme();

    // Configuración del HEADER.
    const screenOptions = {
        headerStyle: { backgroundColor: themePallete.background },
        headerRight: () => user ? <ProfileButton /> : null,
        headerTitle: () => <SettingsButton />,
        headerShadowVisible: false,
    };

    // ---------------------------------------------------------------------- //

    return (
        <Bottom.Navigator backBehavior='history' screenOptions={screenOptions} tabBar={(props) => (
            <ColorfulTabBar darkMode={isDark} maxWidth={'92%'} {...props} colorPalette={COLORS} /> )} >

                <Bottom.Screen name='Home' component={HomeScreen} options={{
                    title: 'Inicio', color: 'accent', icon: ({ focused, color, size }) => (
                    <Icon name="home" size={size} color={color} /> )
                    }}
                />
                <Bottom.Screen
                    name='Gardens'
                    component={GardensScreen}
                    options={{
                        title: 'Jardínes',
                        color: 'accent',
                        icon: ({ focused, color, size }) => (
                            <Icon name="leaf" size={size} color={color} />
                        ),
                    }}
                />
                <Bottom.Screen
                    name='Shopping'
                    component={ShoppingScreen}
                    options={{
                        title: 'Compras',
                        color: 'accent',
                        icon: ({ focused, color, size }) => (
                            <Icon name="shop" size={size} color={color} />
                        ),
                    }}
                />

        </Bottom.Navigator>
    );

}

// -------------------------------------------------------------------------- //

function BottomNavAdmin() {
    const { user } = useUser();
    const { themePallete, isDark } = useTheme();

    // Configuración del HEADER.
    const screenOptions = {
        headerStyle: { backgroundColor: themePallete.background },
        headerRight: () => user ? <ProfileButton /> : null,
        headerTitle: () => <SettingsButton />,
        headerShadowVisible: false,
    };

    // ---------------------------------------------------------------------- //

    return (
        <Bottom.Navigator backBehavior='history' screenOptions={screenOptions} tabBar={(props) => (
            <ColorfulTabBar darkMode={isDark} maxWidth={'92%'} {...props} colorPalette={COLORS} /> )} >

                <Bottom.Screen
                    name='Gardens'
                    component={GardensScreen}
                    options={{
                        title: 'Jardínes',
                        color: 'accent',
                        icon: ({ focused, color, size }) => (
                            <Icon name="leaf" size={size} color={color} />
                        ),
                    }}
                />
                <Bottom.Screen
                    name='Shopping'
                    component={ShoppingScreen}
                    options={{
                        title: 'Compras',
                        color: 'accent',
                        icon: ({ focused, color, size }) => (
                            <Icon name="shop" size={size} color={color} />
                        ),
                    }}
                />

        </Bottom.Navigator>
    );

}

// ---------------------------- STACK: NAVIGATOR ---------------------------- //

const Stack = createStackNavigator();

export function StackNav() {
    const { themePallete } = useTheme();

    // ---------------------------------------------------------------------- //

    return (
        <Stack.Navigator initialRouteName='Start' detachInactiveScreens={true} screenOptions={{ title: false, animationEnabled: false,
            headerStyle: { backgroundColor: themePallete.background }, headerShadowVisible: false, headerTintColor: COLORS.accent,
            headerLeftContainerStyle: { paddingLeft: 12 }, headerRightContainerStyle: { paddingRight: 28 } }}>

            {/* Inicio: */}
            <Stack.Screen name='Start' component={StartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />

            {/* Dentro de la APP: */}
            <Stack.Screen name='Profile' component={ProfileScreen}
                options={{ headerRight: () => ( <EditProfileButton /> ) }}
            />

            <Stack.Screen name='EditProfile' component={EditProfileScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />

            <Stack.Screen name='PlantInfo' component={PlantInfoScreen} />
            <Stack.Screen name='GardenStats' component={GardenStatsScreen} />
            <Stack.Screen name='CreateGarden' component={CreateGardenScreen} />
            <Stack.Screen name='Payment' component={PaymentScreen} />
            <Stack.Screen name='PaymentInfo' component={PaymentInfoScreen} />

            {/* Acceso directo al BottomNav: */}
            <Stack.Screen name='BottomNavClient' component={BottomNavClient} options={{ headerShown: false }} />
            <Stack.Screen name='BottomNavAdmin' component={BottomNavAdmin} options={{ headerShown: false }} />
        </Stack.Navigator>
    );

};

// -------------------------------------------------------------------------- //