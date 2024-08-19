import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../../../firebase';
import api from '../../../api';
import * as SplashScreen from 'expo-splash-screen';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const email = auth.currentUser?.email;
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Mantém a splash screen visível
        SplashScreen.preventAutoHideAsync();

        // Função para requisitar as informações do usuário
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/users/${email}`);
                setUser(response.data.message);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setLoading(false);
                // Esconde a splash screen após o carregamento
                SplashScreen.hideAsync();
            }
        };

        fetchUserData();
    }, [email]);

    const updateUser = () => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/users/${email}`);
                setUser(response.data.message);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setLoading(false);
                // Esconde a splash screen após o carregamento
                SplashScreen.hideAsync();
            }
        };

        fetchUserData();
      };

    return (
        <UserContext.Provider value={{ user, loading, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
