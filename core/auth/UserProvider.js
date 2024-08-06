
// -------------------------------------------------------------------------- //

import Toast from "react-native-toast-message";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// -------------------------------------------------------------------------- //

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const navigation = useNavigation();
    const [ user, setUser ] = useState(null);

    // ---------------------------------------------------------------------- //

    // Actualiza los datos del usuario.
    const updateUser = async (userData) => {

        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'Ha ocurrido un error al intentar actualizar el usuario.',
                visibilityTime: 4500,
            })

            // console.error("ERROR: Hubo un problema al intentar actualizar el usuario: ", error);
        }

    };

    // Cierra la sesión.
    const logout = async () => {

        try {
            await AsyncStorage.removeItem('userData'); setUser(null);
            navigation.reset({ index: 0, routes: [{ name: 'Start' }] });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'Ha ocurrido un error al intentar cerrar la sesión.',
                visibilityTime: 4500,
            })

            // console.error("ERROR: Hubo un problema al intentar cerrar la sesión: ", error);
        }

    };

    // Carga los datos del usuario.
    const loadUser = async () => {

        try {
            const userDataSTR = await AsyncStorage.getItem('userData');
            if (userDataSTR) {
                const userData = JSON.parse(userDataSTR);
                setUser(userData);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'ERROR',
                text2: 'Ha ocurrido un error al intentar cargar los datos del usuario.',
                visibilityTime: 4500,
            })

            // console.error("ERROR: Ha ocurrido un error al cargar los datos del usuario: ", error);
        }
    };


    // ---------------------------------------------------------------------- //

    useEffect(() => {
        loadUser();
    }, []);

    // ---------------------------------------------------------------------- //

    return (
        <UserContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

// -------------------------------------------------------------------------- //
