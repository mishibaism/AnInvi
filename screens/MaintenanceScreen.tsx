import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import SQLite from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';

const MaintenanceScreen = () => {
  const navigation = useNavigation();

  const handleClearCache = () => {
    Alert.alert('Confirm', 'Clear AnInvi Cache?', [
      { text: 'Kembali', style: 'cancel' },
      {
        text: 'Clear',
        onPress: async () => {
          await SecureStore.deleteItemAsync('IS_LOGGED_IN');
          Toast.show('Cache cleared!', Toast.SHORT);
        },
      },
    ]);
  };

  const handleClearData = () => {
    Alert.alert('Confirm', 'Clear All App Data?', [
      { text: 'Kembali', style: 'cancel' },
      {
        text: 'Clear',
        onPress: async () => {
          await SQLite.deleteDatabase({ name: 'ProjectDB.db', location: 'default' });
          await SecureStore.deleteItemAsync('IS_LOGGED_IN');
          Toast.show('App data cleared!', Toast.SHORT);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
<Image
  source={require('../assets/b3sin_nobg.png')}
  style={{ width: 100, height: 100, resizeMode: 'contain', marginLeft: '35%', opacity: 0.15 }}
/>

        <TouchableOpacity style={styles.btn} onPress={handleClearCache}>
          <Text style={styles.btnText}>Clear Cache</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={handleClearData}>
          <Text style={styles.btnText}>Clear Data</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          ⚠ Clear Data akan menghapus semua database dan cache login.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.backText}>← Back</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  btn: {
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
  btnText: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  note: { color: 'red', fontSize: 12, textAlign: 'center', marginTop: 10 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  backText: { fontSize: 16, fontWeight: 'bold', color: '#374151' },
});

export default MaintenanceScreen;
