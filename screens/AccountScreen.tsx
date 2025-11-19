import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, Alert, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthContext } from '../src/context/AuthContext';
import Toast from 'react-native-simple-toast';
import { getDB } from '../utils/db';
import type { Transaction } from 'react-native-sqlite-storage';

type RootStackParamList = {
  Dashboard: undefined;
  QRCode: undefined;
  Account: undefined;
  termnpolicy: undefined;
  aboutnversion: undefined;
  logacts: undefined;
  maintenance: undefined; // nanti screen baru untuk clear cache/data
};

const NavBar = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout } = useContext(AuthContext);

  const handleClearRack = async () => {
    Alert.alert('Confirm', 'Delete all racks and items?', [
      { text: 'Kembali', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          const db = await getDB();
          await db.transaction((tx: Transaction) => {
            tx.executeSql('DELETE FROM rack');
            tx.executeSql('DELETE FROM rack_items');
          });
          Toast.show('All Racks Gone!!', Toast.SHORT);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.btnRack}
            onPress={handleClearRack}
          >
            <Image
              source={require('../assets/cancel.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSmall}
            onPress={() => navigation.navigate('maintenance')}
          >
            <Text style={styles.btnText}>Maintenance</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.btnLarge}
          onPress={() => navigation.navigate('aboutnversion')}
        >
          <Text style={styles.btnText}>About & Version</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnLarge}
          onPress={() => navigation.navigate('termnpolicy')}
        >
          <Text style={styles.btnText}>Terms & Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnLarge, styles.btnGray]}
          onPress={() => navigation.navigate('logacts')}
        >
          <Text style={[styles.btnText, { color: 'white' }]}>LogActs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <SafeAreaView style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <MaterialIcons name="home" size={36} color="black" />
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '14%',
    backgroundColor: 'transparent',
    marginTop: '60%',
  },
  btnRack: {
    borderWidth: 2,
    borderColor: '#56b3fa',
    marginLeft: 13,
    borderRadius: 16,
    width: '26%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSmall: {
    borderWidth: 2,
    borderColor: 'grey',
    marginLeft: 13,
    borderRadius: 16,
    width: '30%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  iconImage: {
    width: '90%',
    height: '50%',
    resizeMode: 'contain',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginTop: '6%',
    opacity: 0.5,
  },
  btnLarge: {
    borderWidth: 2,
    borderColor: 'grey',
    marginLeft: 13,
    marginTop: '5%',
    borderRadius: 20,
    width: '93%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGray: { backgroundColor: 'grey' },
  btnLogout: {
    backgroundColor: 'tomato',
    marginLeft: 13,
    borderRadius: 20,
    width: '93%',
    height: '6%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '14%',
    backgroundColor: '#f2f2f2',
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
  },
});

export default NavBar;
