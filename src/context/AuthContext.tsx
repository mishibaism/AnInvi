// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getDB } from '../../utils/db'; // ✅ Pastikan path ini sesuai dengan struktur project lo
import type { Transaction, ResultSet, SQLError } from 'react-native-sqlite-storage';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: async () => false,
  logout: async () => {},
});

const AUTH_KEY = 'IS_LOGGED_IN';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await SecureStore.getItemAsync(AUTH_KEY);
      console.log('💡 IS_LOGGED_IN stored value:', stored);
      if (stored === 'true') {
        setIsLoggedIn(true);
      }
    })();
  }, []);

  const login = async (username: string, password: string) => {
    // Hardcoded fallback
    if (username === 'salsa' && password === '2225') {
      setIsLoggedIn(true);
      await SecureStore.setItemAsync(AUTH_KEY, 'true');
      return true;
      
    }

    // DB Check
    try {
      const db = await getDB();
      return new Promise<boolean>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
          tx.executeSql(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password],
            (_: Transaction, result: ResultSet) => {
              if (result.rows.length > 0) {
                setIsLoggedIn(true);
                SecureStore.setItemAsync(AUTH_KEY, 'true');
                resolve(true);
              } else {
                resolve(false);
              }
            },
            (_: Transaction, err: SQLError) => {
              console.error('❌ Login query error:', err);
              reject(false);
              return false;
            }
          );
        });
      });
    } catch (err) {
      console.error('❌ Login DB error:', err);
      return false;
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
    await SecureStore.deleteItemAsync(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
