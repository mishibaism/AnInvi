import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types/navigationTypes';
import { getDB } from '../utils/db';

type TabelRackProps = {
  racks: { id: number; name: string; umur: number }[];
  navigation: NativeStackNavigationProp<RootStackParamList, 'DashboardScreen'>;
};

const TabelRack = ({ racks, navigation }: TabelRackProps) => {
  const [lowStockRackIds, setLowStockRackIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchLowStockRacks = async () => {
      const db = await getDB();
      db.transaction(tx => {
        tx.executeSql(
          `SELECT DISTINCT rack_id FROM rack_items WHERE quantity <= low_stock_threshold`,
          [],
          (_, result) => {
            const ids: number[] = [];
            for (let i = 0; i < result.rows.length; i++) {
              ids.push(result.rows.item(i).rack_id);
            }
            setLowStockRackIds(ids);
          },
          (_, error) => {
            console.error('Error checking low stock racks:', error);
            return false;
          }
        );
      });
    };
    fetchLowStockRacks();
  }, []);

  const getStatusColor = (rackId: number, umur: number) => {
    if (lowStockRackIds.includes(rackId)) {
      return { backgroundColor: '#FFFF66' }; // Kuning: ada item habis
    } else if (umur <= 0) {
      return { backgroundColor: '#FF6666' }; // Merah: umur habis
    } else if (umur <= 10) {
      return { backgroundColor: '#FFFF66' }; // Kuning: hampir habis
    } else {
      return { backgroundColor: 'lightgreen' }; // Hijau: aman
    }
  };

  const sortedRacks = racks.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      <ScrollView style={styles.table}>
        {sortedRacks.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tr}
            onPress={() => navigation.navigate('RackDetailScreen', { rack: item })}
          >
            <Text style={styles.td}>{item.name}</Text>
            <View style={[styles.status, getStatusColor(item.id, item.umur)]} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 1,
    height: '110%',
    width: '100%',
  },
  tr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  td: {
    fontSize: 16,
    padding: 5,
  },
  status: {
    width: 20,
    height: 20,
    borderRadius: 15,
    marginRight: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
});

export default TabelRack;
