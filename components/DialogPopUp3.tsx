// components/DeleteConfirmDialog.tsx
import React from 'react';
import { TouchableOpacity, Text, View, Modal } from 'react-native';

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  
};

const DeleteConfirmDialog = ({ visible, onConfirm, onCancel, message }: Props) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          width: '70%',
          height: '20%',
          backgroundColor: 'white',
          borderRadius: 10,
          borderWidth: 2,
          borderColor: 'gray',
          padding: 1,
          paddingTop: '10%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} 
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}>{message}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50, backgroundColor: 'transparent', width: '100%' }}>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: 'grey',
                borderRadius: 5,
                width: '40%',
                height: 32,
                justifyContent: 'center',
              }}
              onPress={onCancel}
            >
              <Text style={{ textAlign: 'center', color: 'grey', fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                width: '55%',
                height: 32,
                justifyContent: 'center',
                backgroundColor: '#FF3333',
              }}
              onPress={onConfirm}
            >
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmDialog;
