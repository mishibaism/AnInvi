// Add New Rack/Dashboard
import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Modal, Alert, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';
import { insertLog } from '../utils/db';


const DialogPopUp2 = ({ onAddRack }: { onAddRack: (name: string) => void }) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  const handlePress = () => {
    setVisible(true);
  };

  const handleOK = async () => {
    if (text.trim() !== '') {
      onAddRack(text);
      await insertLog("Add Rack", `Rack "${text}" created`);
      Toast.show('Saved!', Toast.SHORT);
      
    }
    setVisible(false);
    setText('');
  };

  const handleCancel = () => {
    setVisible(false);
    setText('');
  };

   return (
    <View>
      <TouchableOpacity style={{ borderWidth: 2, borderColor: 'black', padding: 2, borderRadius: 12 }}  onPress={handlePress}>
        <MaterialIcons name="add" size={28} color="black" />
      </TouchableOpacity>
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 240, height: 260, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: "gray", padding: 20 }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Add New Rack</Text>
              <TextInput style={{height:40, borderColor: 'gray', marginTop: 50, borderTopWidth: 0, borderBottomWidth: 2}}  onChangeText={(text) => setText(text)} value={text} placeholder="Nama Rak" />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}></View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 82}}>
            <TouchableOpacity style={{borderColor: 'grey', borderWidth: 2, backgroundColor: 'transparent', marginLeft: -10, borderRadius: 5, width: 94, padding:2 }} onPress={handleCancel}>
              <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: 'grey'}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{  backgroundColor: '#4CAF50', marginLeft: 5, borderRadius: 5, width: 120 }} onPress={handleOK}>
              <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: 'white', padding: 5}}>Save</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DialogPopUp2;