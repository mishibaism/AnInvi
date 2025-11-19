// src/components/NavBar.tsx
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from '../styles/styles';


// Definisikan tipe param list sesuai yang nanti kita daftarkan di App.tsx
type RootStackParamList = {
  Dashboard: undefined;
  QRCode: undefined;
  Account: undefined;
};

const NavBar = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={[styles.containera]}>

    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: '186%',
        width: '80%',
        height: '11%',
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 0,
        borderTopColor: '#CCCCCC',
        borderTopWidth: 1,
      }}
    >
<TouchableOpacity
  onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })}
  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
>
  <MaterialIcons name="home" size={36} color="black" />
</TouchableOpacity>
<TouchableOpacity
  onPress={() => navigation.reset({ index: 0, routes: [{ name: 'QRCode' }] })}
  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
>
  <MaterialIcons name="qr-code" size={36} color="black" />
</TouchableOpacity>

<TouchableOpacity
  onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Account' }] })}
  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
>
  <MaterialIcons name="account-circle" size={36} color="black" />
</TouchableOpacity>
</SafeAreaView>
    </SafeAreaView>

  );
};

export default NavBar;
