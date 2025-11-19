// LoginScreen.tsx (Finalized with overlay + activity indicator + clean code)
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { AuthContext } from '../src/context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';

const LoginScreen = ({ navigation }: any) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('💡 Rendering LoginScreen');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
  Toast.show('Please fill all fields', Toast.SHORT);
  return;
}
    const success = await login(username, password);
    if (!success) {
      Toast.show('Invalid username or password', Toast.LONG);
    } else {
      Toast.show('loading data...', Toast.SHORT);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.replace('Dashboard');
      }, 5000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
  <View style={styles.logo}>
<Image
  source={require('../assets/b3sin_nobg.png')}
  style={{ width: 100, height: 100, resizeMode: 'contain' }}
/>

</View>
      <View style={styles.box}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log-in</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  box: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    padding: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: 'gray',
    marginBottom: 15,
    padding: 8,
  },
  button: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: '5%',
    backgroundColor: 'transparent',
  }
});

export default LoginScreen;
