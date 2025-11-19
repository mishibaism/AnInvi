import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { MaterialIcons } from '@expo/vector-icons';

const DialogEditItem = ({
  visible,
  onClose,
  initialContent,
  initialQuantity,
  initialThreshold,
  onSave,
  onDelete,
}: {
  visible: boolean;
  onClose: () => void;
  initialContent: string;
  initialQuantity: number;
  initialThreshold: number;
  onSave: (content: string, quantity: number, threshold: number) => void;
  onDelete: () => void;
}) => {
  const [content, setContent] = useState(initialContent);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [threshold, setThreshold] = useState(initialThreshold);

  const handleSave = () => {
    if (content.trim() === '') {
      Alert.alert('Validation', 'Nama item tidak boleh kosong');
      return;
    }
    onSave(content, quantity, threshold);
    Toast.show('Perubahan disimpan!', Toast.SHORT);
    onClose();
  };

  const handleDelete = () => {
    Alert.alert('Confirm', `Delete ${content} ?`, [
      { text: 'Kembali', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          onDelete();
          onClose();
        },
      },
    ]);
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => {
    if (quantity > 0) setQuantity(prev => prev - 1);
  };

  const showThresholdTip = () => {
    Alert.alert(
      'Threshold Info',
      'Threshold adalah batas minimum stok untuk item ini. Jika stok di bawah angka ini, Anda bisa diberi peringatan.',
      [{ text: 'OK' }]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          width: 260,
          height: 340,
          backgroundColor: 'white',
          borderRadius: 10,
          borderWidth: 2,
          borderColor: 'gray',
          padding: 20,
        }}>
          <TouchableOpacity
            onPress={handleDelete}
            style={{ position: 'absolute', top: 10, right: 10, padding: 4, zIndex: 1 }}
          >
            <MaterialIcons name="close" size={24} color="#FF4444" />
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Edit Item</Text>

          <TextInput
            style={{ height: 40, borderBottomWidth: 2, borderColor: 'gray', marginTop: 10 }}
            placeholder="Nama Item"
            value={content}
            onChangeText={setContent}
          />

          <View style={{ height: 1, backgroundColor: '#ccc', width: '100%', marginTop: '5%', opacity: 0 }} />
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

          <View style={{ height: 1, backgroundColor: '#ccc', width: '100%', marginTop: '5%', opacity: 0 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <TouchableOpacity onPress={showThresholdTip} style={{ marginLeft: 5 }}>
              <MaterialIcons name="info-outline" size={20} color="grey" paddingRight={5} />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, color: 'grey' }}>Threshold:</Text>
          </View>

          <TextInput
            style={{ height: 40, borderBottomWidth: 2, borderColor: 'gray', marginTop: 10 }}
            placeholder="Low stock threshold"
            value={threshold.toString()}
            onChangeText={val => setThreshold(Number.isNaN(parseInt(val)) ? 0 : parseInt(val))}
            keyboardType="numeric"
          />

          <View style={{ height: 0, backgroundColor: '#ccc', width: '100%', marginTop: '5%', opacity: 0.5 }} />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 10,
            marginLeft: '-12%',
            padding: 13,
            height: '26%',
          }}>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: 'grey',
                borderRadius: 5,
                width: '50%',
                height: '54%',
              }}
              onPress={onClose}
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
                width: '60%',
                height: '52%',
              }}
              onPress={handleSave}
            >
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                padding: 3
              }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DialogEditItem;
