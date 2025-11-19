import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getDB } from '../utils/db';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types/navigationTypes';

type ItemWithRack = {
  id: number;
  content: string;
  quantity: number;
  low_stock_threshold: number;
  rack_id: number;
  rack_name: string;
  last_updated: string | null;
};

// ✅ Format tanggal + jam lokal Indonesia
const formatLocalDateTime = (input: string | null): string => {
  if (!input) return '-';
  try {
    const utcDate = new Date(input + 'Z');
    return utcDate.toLocaleString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta',
    });
  } catch {
    return '-';
  }
};

const NotifScreen = () => {
  const [items, setItems] = useState<ItemWithRack[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadLowStockItems = async () => {
      const db = await getDB();
      db.transaction(tx => {
        tx.executeSql(
          `SELECT 
              ri.id, ri.content, ri.quantity, ri.low_stock_threshold, 
              ri.rack_id, r.name AS rack_name,
              MAX(l.timestamp) AS last_updated
            FROM rack_items ri
            JOIN rack r ON ri.rack_id = r.id
            LEFT JOIN logs l ON l.detail LIKE '%' || ri.content || '%'
            WHERE ri.quantity <= ri.low_stock_threshold
            GROUP BY ri.id
            ORDER BY last_updated DESC`,
          [],
          (_, result) => {
            const data: ItemWithRack[] = [];
            for (let i = 0; i < result.rows.length; i++) {
              const row = result.rows.item(i);
              data.push({
                ...row,
                last_updated: row.last_updated,
              });
            }
            setItems(data);
          },
          (_, error) => {
            console.error('❌ Query notif error:', error);
            return false;
          }
        );
      });
    };

    loadLowStockItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔔 Notifikasi Stok Rendah</Text>

      {/* Tambahan indikator total */}
      <Text style={{ marginBottom: 12, color: 'gray' }}>
        Total: {items.length} notifikasi
      </Text>

      <ScrollView>
        {items.length === 0 ? (
          <Text style={styles.noNotif}>Tidak ada item dengan stok rendah</Text>
        ) : (
          items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('RackDetailScreen', {
                  rack: {
                    id: item.rack_id,
                    name: item.rack_name,
                    umur: 20,
                  },
                })
              }
            >
              <View style={styles.card}>
                <Text style={styles.itemName}>{item.content}</Text>
                <Text style={styles.quantity}>
                  {item.quantity} / {item.low_stock_threshold}
                </Text>
                <Text style={styles.rackName}>📦 Rak: {item.rack_name}</Text>
                <Text style={styles.time}>⏰ Terakhir diubah: {formatLocalDateTime(item.last_updated)}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: { backgroundColor: '#f8f8f8', padding: 12, marginBottom: 12, borderRadius: 8 },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  quantity: { fontSize: 16, color: 'red', marginTop: 4 },
  rackName: { fontSize: 14, marginTop: 4 },
  time: { fontSize: 12, color: '#666', marginTop: 6 },
  noNotif: { textAlign: 'center', color: 'gray', marginTop: 50 },
  footer: { alignItems: 'center', marginTop: 10, padding: 10, borderTopWidth: 1, borderTopColor: '#eee' },
  backText: { fontSize: 16, fontWeight: 'bold', color: '#374151' },
});

export default NotifScreen;
