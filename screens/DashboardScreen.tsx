// DashboardScreen.tsx (Finalized with comments & clean code)
import React, { useEffect, useState } from 'react';
import { View, Image, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import stylesGlobal from '../styles/styles';
import DialogPopUp from '../components/DialogPopUp';
import DialogPopUp2 from '../components/DialogPopUp2';
import TabelRack from '../components/TabelRack';
import NavBar from '../components/NavBar';
import { initDB, getRacks, insertRack } from '../utils/db';
import { RootStackParamList } from '../src/types/navigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'DashboardScreen'>>();
  const [racks, setRacks] = useState<any[]>([]);
  const [notifVisible, setNotifVisible] = useState(false);
  const [exportVisible, setExportVisible] = useState(false);

  useEffect(() => {
    // ⚡ Initialize DB + load racks on mount
    // Inisialisasi DB + load rack saat komponen dimount
    const setup = async () => {
      await initDB();
      await loadRacks();
    };
    setup();
  }, []);

  const loadRacks = async () => {
    const data = await getRacks();
    setRacks(data);
  };

  const handleAddRack = async (name: string) => {
    await insertRack(name);
    await loadRacks();
  };

  return (
    <SafeAreaView style={stylesGlobal.container}>
      <View style={stylesGlobal.container2}>
        <Image source={require('../assets/b3sin_nobg.png')} style={localStyles.logo} />
        <Text style={localStyles.title}>Aninvi</Text>
        <Text style={localStyles.subtitle}>@Mishibaism Project v121</Text>

        <SafeAreaView style={stylesGlobal.container6}>
          <TabelRack racks={racks} navigation={navigation} />
        </SafeAreaView>

        <SafeAreaView style={stylesGlobal.container7}>
          <NavBar />
        </SafeAreaView>
      </View>

      {/* Notification Button */}
      <SafeAreaView style={stylesGlobal.container5a}>
        <TouchableOpacity onPress={() => navigation.navigate('NotifScreen')}>
          <MaterialIcons name="notifications" size={36} color="black" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Print & Add Buttons */}
      <SafeAreaView style={stylesGlobal.container5}>
        <TouchableOpacity onPress={() => setExportVisible(true)}>
          <MaterialIcons name="print" size={36} color="black" />
        </TouchableOpacity>
        <DialogPopUp visible={exportVisible} onClose={() => setExportVisible(false)} />
        <View style={stylesGlobal.container3}>
          <DialogPopUp2 onAddRack={handleAddRack} />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  logo: {
    width: 70,
    height: 70,
    marginLeft: 20,
    marginTop: 25,
    opacity: 0.15,
  },
  title: {
    marginTop: 20,
    marginLeft: 25,
    fontWeight: 'bold',
    fontSize: 28,
  },
  subtitle: {
    marginLeft: 25,
    fontSize: 8,
  },
});

export default DashboardScreen;

// TODO: Add loading indicator while fetching racks
// TODO: Handle error state if DB or fetch fails
