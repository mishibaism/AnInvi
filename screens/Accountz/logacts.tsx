import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from "react-native";
import { getDB } from "../../utils/db";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

// 🔧 Helper format tanggal lokal Indonesia
const formatLocalDateTime = (utcString: string) => {
  const date = new Date(utcString + 'Z'); // ⏱ Anggap ini UTC lalu ubah ke waktu lokal
  return date.toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short'
  });
};

const LogActs = () => {
  const navigation = useNavigation();
  const [logs, setLogs] = useState<any[]>([]);

  const loadLogs = async () => {
    const db = await getDB();
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM logs ORDER BY timestamp DESC',
        [],
        (_: any, result: any) => {
          const loadedLogs = [];
          for (let i = 0; i < result.rows.length; i++) {
            loadedLogs.push(result.rows.item(i));
          }
          setLogs(loadedLogs);
        }
      );
    });
  };

  const handleClearLogs = () => {
    Alert.alert("Confirm", "Delete all logs?", [
      { text: "Kembali", style: "cancel" },
      {
        text: "Delete Logs",
        style: "destructive",
        onPress: async () => {
          const db = await getDB();
          db.transaction(tx => {
            tx.executeSql('DELETE FROM logs', [], () => {
              console.log('✅ Semua log dihapus');
              loadLogs();
            });
          });
        }
      }
    ]);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Activity Logs</Text>
        <TouchableOpacity onPress={handleClearLogs} hitSlop={10}>
          <MaterialIcons name="delete-sweep" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <Text style={{ marginBottom: 12, color: 'gray' }}>
        Total: {logs.length} aktivitas
      </Text>

      <ScrollView>
        {logs.map((log, index) => (
          <View key={index} style={styles.logCard}>
            <Text style={styles.action}>{log.action}</Text>
            <Text style={styles.detail}>{log.detail}</Text>
            <Text style={styles.time}>
              {formatLocalDateTime(log.timestamp)}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#374151', fontSize: 16, fontWeight: 'bold' }}>← Back</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logCard: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8
  },
  action: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  detail: {
    fontSize: 14
  },
  time: {
    fontSize: 12,
    color: '#777',
    marginTop: 4
  },
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
});

export default LogActs;
