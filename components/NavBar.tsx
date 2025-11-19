// src/components/NavBar.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Dashboard: undefined;
  QRCode: undefined;
  Account: undefined;
};

const NavBar = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingTop: 6,
        paddingLeft: 12,
        paddingRight: 10,        
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <MaterialIcons name="home" size={36} color="black" />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('QRCode')}>
        <MaterialIcons name="qr-code" size={36} color="black" />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <MaterialIcons name="account-circle" size={36} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NavBar;
