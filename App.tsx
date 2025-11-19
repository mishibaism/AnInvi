// App.tsx (Finalized with comments & clean code)
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, AuthContext } from './src/context/AuthContext';
import DashboardScreen from './screens/DashboardScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import AccountScreen from './screens/AccountScreen';
import LoginScreen from './screens/LoginScreen';
import RackDetailScreen from './screens/RackDetailScreen';
import LogActs from './screens/Accountz/logacts';
import TermnPolicy from './screens/Accountz/termnpolicy';
import AboutNVersion from './screens/Accountz/aboutnversion';
import NotifScreen from './screens/NotifScreen';
import { initDB } from './utils/db';
import MaintenanceScreen from './screens/MaintenanceScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  QRCode: undefined;
  Account: undefined;
  Login: undefined;
  logacts: undefined;
  termnpolicy: undefined;
  aboutnversion: undefined;
  RackDetailScreen: { rack: { id: number; name: string; umur: number } };
  NotifScreen: undefined;
  maintenance: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isLoggedIn } = React.useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="QRCode" component={QRCodeScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="RackDetailScreen" component={RackDetailScreen} />
          <Stack.Screen name="termnpolicy" component={TermnPolicy} />
          <Stack.Screen name="aboutnversion" component={AboutNVersion} />
          <Stack.Screen name="logacts" component={LogActs} />
          <Stack.Screen name="NotifScreen" component={NotifScreen} />
          <Stack.Screen name="maintenance" component={MaintenanceScreen} />

        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    // ⚡ Initialize local database when app starts
    // Inisialisasi database lokal saat aplikasi dijalankan
    const setup = async () => {
      await initDB();
    };
    setup();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

// TODO: Review screen names for consistency (e.g., TermnPolicy → TermPolicy)
// TODO: Add loading indicator during DB init for better UX
