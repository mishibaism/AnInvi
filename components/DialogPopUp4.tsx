import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Modal, TextInput, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import { MaterialIcons } from '@expo/vector-icons';

const DialogPopUp4 = ({
  visible,
  onClose,
  onAddRack,
}: {
  visible: boolean;
  onClose: () => void;
  onAddRack: (name: string, quantity: number, threshold: number) => void;
}) => {
  const [text, setText] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [lowStockThreshold, setLowStockThreshold] = useState(0);

  const handleOK = async () => {
    if (text.trim() === '') {
      Alert.alert('Validation', 'Nama item tidak boleh kosong');
      return;
    }

    onAddRack(text, quantity, lowStockThreshold);
    Toast.show('Saved!', Toast.SHORT);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setText('');
    setQuantity(0);
    setLowStockThreshold(0);
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => {
    if (quantity > 0) setQuantity(prev => prev - 1);
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const showThresholdTip = () => {
    Alert.alert(
      'Threshold Info',
      'Threshold adalah batas minimum stok. Jika stok di bawah angka ini, Anda bisa diberi peringatan.',
      [{ text: 'OK' }]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          width: 260,
          backgroundColor: 'white',
          borderRadius: 10,
          borderWidth: 2,
          borderColor: 'gray',
          padding: 20,
        }}>

          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Add New Item</Text>

          <TextInput
            style={{ height: 40, borderBottomWidth: 2, borderColor: 'gray', marginTop: 10 }}
            placeholder="Nama Item"
            value={text}
            onChangeText={setText}
          />

          <View style={{ height: 0, backgroundColor: '#ccc', width: '100%', marginTop: '5%', opacity: 0.5 }} />
          <Text style={{ fontSize: 16, color: 'grey' }}>Qty:</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: '#FF3333',
                borderRadius: 100,
                width: '26%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FF3333',
              }}
              onPress={handleDecrement}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>-</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: '#4CAF50',
                borderRadius: 100,
                width: '26%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4CAF50',
                marginLeft: '4%',
              }}
              onPress={handleIncrement}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>+</Text>
            </TouchableOpacity>

            <TextInput
              style={{
                width: '36%',
                height: 40,
                borderBottomWidth: 2,
                borderColor: 'gray',
                marginLeft: '4%',
                textAlign: 'center',
              }}
              value={quantity.toString()}
              onChangeText={val => setQuantity(Number.isNaN(parseInt(val)) ? 0 : parseInt(val))}
              keyboardType="numeric"
            />
          </View>

          <View style={{ height: 0, backgroundColor: '#ccc', width: '100%', marginTop: '5%', opacity: 0.5 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 16, color: 'grey' }}>Threshold:</Text>
            <TouchableOpacity onPress={showThresholdTip} style={{ marginLeft: 5 }}>
              <MaterialIcons name="info-outline" size={18} color="grey" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={{ height: 40, borderBottomWidth: 2, borderColor: 'gray', marginTop: 10 }}
            placeholder="Low stock threshold"
            value={lowStockThreshold.toString()}
            onChangeText={val => setLowStockThreshold(Number.isNaN(parseInt(val)) ? 0 : parseInt(val))}
            keyboardType="numeric"
          />

          <View style={{ height: 0, backgroundColor: '#ccc', width: '100%', marginTop: '5%', opacity: 0.5 }} />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 15,
            padding: 10,
          }}>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: 'grey',
                borderRadius: 5,
                width: '50%',
                height: 40,
                justifyContent: 'center',
              }}
              onPress={handleCancel}
            >
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'grey'
              }}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#4CAF50',
                marginLeft: 5,
                borderRadius: 5,
                width: '50%',
                height: 40,
                justifyContent: 'center',
              }}
              onPress={handleOK}
            >
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white'
              }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DialogPopUp4;
