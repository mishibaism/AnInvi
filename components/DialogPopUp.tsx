import React, { useState, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { exportToXLSX } from '../utils/export';

type DialogPopUpProps = {
  visible: boolean;
  onClose: () => void;
};

const DialogPopUp = ({ visible, onClose }: DialogPopUpProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);


  useEffect(() => {
    if (!visible) {
      setIsChecked(false);
      setIsChecked2(false);
    }
  }, [visible]);

  const handleOK = async () => {
    if (!isChecked && !isChecked2) {
      Toast.show('Pilih salah satu format untuk ekspor.', Toast.SHORT);
      return;
    }

    if (isChecked2) {
      await exportToXLSX(); // Ekspor semua data rack
      Toast.show('Export ke .xlsx selesai!', Toast.SHORT);
    }

    if (isChecked) {
      Toast.show('.pdf belum tersedia.', Toast.SHORT);
    }

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          width: 240,
          height: 260,
          backgroundColor: 'white',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'gray',
          padding: 20,
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Save Table To</Text>
          <View style={{ marginTop: 20 }}>
            {/* <CheckBox
              title=".pdf (Preview)"
              checked={isChecked}
              checkedColor="#4CAF50"
              onPress={() => setIsChecked(!isChecked)}
            /> */}
            <CheckBox
              title=".xlsx (Edit/Import)"
              checked={isChecked2}
              checkedColor="#4CAF50"
              onPress={() => setIsChecked2(!isChecked2)}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 98, marginLeft: -10 }}>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: 'grey',
                borderRadius: 5,
                width: 90,
                height: 30,
              }}
              onPress={onClose}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: 'grey', paddingTop: 3 }}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#4CAF50',
                borderRadius: 5,
                width: 128,
                height: 30,
                justifyContent: 'center',
                marginLeft: 4
              }}
              onPress={handleOK}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DialogPopUp;
