import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../src/types/navigationTypes';
import {
  deleteItem,
  deleteRack,
  getDB,
  getItemsByRack,
  insertItemToRack,
  insertLog,
  updateItem,
} from '../utils/db';
import DeleteConfirmDialog from '../components/DialogPopUp3';
import DialogPopUp4 from '../components/DialogPopUp4';
import DialogEditItem from '../components/DialogEditItem';;
import Toast from 'react-native-simple-toast';

type RackDetailScreenRouteProp = RouteProp<RootStackParamList, 'RackDetailScreen'>;

type Props = {
  route: RackDetailScreenRouteProp;
};

const RackDetailScreen = ({ route }: Props) => {
  const { rack } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [exportDialogVisible, setExportDialogVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const getDotColor = (quantity: number, threshold: number) => {
    if (quantity <= 0) return { backgroundColor: '#FF6666' };
    if (quantity <= threshold) return { backgroundColor: '#FFFF66' };
    return { backgroundColor: 'lightgreen' };
  };

  useEffect(() => {
    const loadItems = async () => {
      const result = await getItemsByRack(rack.id);
      setItems(result);
    };
    loadItems();
  }, []);

  const getItemById = async (itemId: number) => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM rack_items WHERE id = ?',
          [itemId],
          (_, result) => {
            resolve(result.rows.length > 0 ? result.rows.item(0) : null);
          },
          (_, err) => {
            reject(err);
            return false;
          }
        );
      });
    });
  };

  const handleAddItem = async (content: string, quantity: number, lowStockThreshold: number) => {
    await insertItemToRack(rack.id, content, quantity, lowStockThreshold);
    await insertLog("Add Item", `Item "${content}" (${quantity}x, threshold ${lowStockThreshold}) ke rack "${rack.name}"`);
    const updatedItems = await getItemsByRack(rack.id);
    setItems(updatedItems);
  };

  const handleUpdateItem = async (id: number, newContent: string, newQty: number, newThreshold: number) => {
    const oldItem: any = await getItemById(id);
    if (!oldItem) return;

    await updateItem(id, newContent, newQty, newThreshold);

    const changes = [];
    if (oldItem.content !== newContent) changes.push(`Nama: "${oldItem.content}" → "${newContent}"`);
    if (oldItem.quantity !== newQty) changes.push(`Qty: ${oldItem.quantity} → ${newQty}`);
    if (oldItem.low_stock_threshold !== newThreshold) changes.push(`Threshold: ${oldItem.low_stock_threshold} → ${newThreshold}`);

    if (changes.length > 0) {
      const logDetail = `Item di "${rack.name}" (${oldItem.content}): ${changes.join(', ')}`;
      await insertLog("Update Item", logDetail);
    }

    const updatedItems = await getItemsByRack(rack.id);
    setItems(updatedItems);
  };

  const handleDeleteItem = async (itemId: number) => {
    const item: any = await getItemById(itemId);
    await deleteItem(itemId);
    if (item) {
      await insertLog("Delete Item", `Item "${item.content}" (${item.quantity}x) di rack "${rack.name}" dihapus`);
    }
    const updatedItems = await getItemsByRack(rack.id);
    setItems(updatedItems);
    Toast.show('Item Gone!', Toast.SHORT);
  };

  const sortByAZ = () => setItems([...items].sort((a, b) => a.content.localeCompare(b.content)));
  const sortByZA = () => setItems([...items].sort((a, b) => b.content.localeCompare(a.content)));
  const sortByMax = () => setItems([...items].sort((a, b) => b.quantity - a.quantity));
  const sortByMin = () => setItems([...items].sort((a, b) => a.quantity - b.quantity));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.kembali} onPress={() => navigation.goBack()}>
          <Text>Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.judul} numberOfLines={1}>{rack.name}</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowModal(true)}>
          <Text>Menu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sortBar}>
        <TouchableOpacity onPress={sortByAZ}><Text style={styles.sortText}>A-Z</Text></TouchableOpacity>
        <TouchableOpacity onPress={sortByZA}><Text style={styles.sortText}>Z-A</Text></TouchableOpacity>
        <TouchableOpacity onPress={sortByMax}><Text style={styles.sortText}>Max</Text></TouchableOpacity>
        <TouchableOpacity onPress={sortByMin}><Text style={styles.sortText}>Min</Text></TouchableOpacity>
      </View>

      <View style={styles.itemWrapper}>
        <ScrollView>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedItem(item);
                setEditDialogVisible(true);
              }}
              style={styles.itemRow}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: '25%' }}>
                  <Text style={{ fontSize: 18, paddingHorizontal: 5 }}>{item.quantity}x</Text>
                </View>
                <View style={{ width: '64%' }}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 20 }}>
                    {item.content}
                  </Text>
                </View>
              </View>
              <View style={[styles.dot, getDotColor(item.quantity, item.low_stock_threshold)]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Modal Menu */}
      <Modal visible={showModal} transparent onRequestClose={() => setShowModal(false)}>
        <TouchableOpacity style={styles.overlay} onPress={() => setShowModal(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => { setShowModal(false); setDialogVisible(true); }}>
              <Text style={styles.menuText}>Add New</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            {/* <TouchableOpacity onPress={() => console.log('QR Code')}>
              <Text style={styles.menuText}>QR Code</Text>
            </TouchableOpacity> */}
            {/* <View style={styles.divider} /> */}
            <TouchableOpacity onPress={() => { setShowModal(false); setConfirmDeleteVisible(true); }}>
              <Text style={[styles.menuText, { color: '#FF3333' }]}>Delete Rack</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Popups */}
      <DialogPopUp4
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        onAddRack={handleAddItem}
      />

      {editDialogVisible && selectedItem !== null && (
        <DialogEditItem
          visible={editDialogVisible}
          onClose={() => {
            setEditDialogVisible(false);
            setSelectedItem(null);
          }}
          initialContent={selectedItem.content}
          initialQuantity={selectedItem.quantity}
          initialThreshold={selectedItem.low_stock_threshold}
          onSave={(c, q, t) => handleUpdateItem(selectedItem.id, c, q, t)}
          onDelete={async () => {
            await handleDeleteItem(selectedItem.id);
            setEditDialogVisible(false);
            setSelectedItem(null);
          }}
        />
      )}

      <DeleteConfirmDialog
        visible={confirmDeleteVisible}
        message={`Hapus "${rack.name}" ?`}
        onCancel={() => setConfirmDeleteVisible(false)}
        onConfirm={async () => {
          await deleteRack(rack.id);
          await insertLog("Delete Rack", `Rack "${rack.name}" dihapus`);
          setConfirmDeleteVisible(false);
          navigation.goBack();
          Toast.show('Deleted ' + rack.name, Toast.LONG);
        }}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 55,
    backgroundColor: '#fff',
  },
  kembali: {
    marginRight: 10,
  },
  judul: {
    fontSize: 30,
    fontWeight: 'bold',
    flexShrink: 1,
    maxWidth: '50%',
    textAlign: 'center',
  },
  dropdown: {
    marginLeft: 10,
  },
  sortBar: {
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    borderRadius: 10,
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  itemWrapper: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    height: '90%',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'transparent',
  },
  modalContent: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    width: 160,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginTop: '5%',
    opacity: 0.5,
  },
  menuText: {
    fontWeight: '500',
    fontSize: 22,
  },
  sortText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RackDetailScreen;
