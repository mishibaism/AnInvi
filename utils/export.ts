// utils/export.ts
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { getDB } from './db';

export const exportToXLSX = async () => {
  const db = await getDB();

  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT r.name AS rackName, ri.content AS itemName, ri.quantity, ri.low_stock_threshold
         FROM rack_items ri
         JOIN rack r ON ri.rack_id = r.id
         ORDER BY r.name ASC;`,
        [],
        async (_, result) => {
          const data: any[] = [];

          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            const status =
              row.quantity <= 0
                ? 'Empty'
                : row.quantity <= row.low_stock_threshold
                ? 'Low Stock'
                : 'OK';

            data.push({
              'Rack Name': row.rackName,
              'Item Name': row.itemName,
              Quantity: row.quantity,
              Threshold: row.low_stock_threshold,
              Status: status,
            });
          }

          const worksheet = XLSX.utils.json_to_sheet(data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'AllRacks');

          const buffer = XLSX.write(workbook, {
            type: 'base64',
            bookType: 'xlsx',
          });

          const filename = FileSystem.documentDirectory + 'all_racks_export.xlsx';
          await FileSystem.writeAsStringAsync(filename, buffer, {
            encoding: FileSystem.EncodingType.Base64,
          });

          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(filename);
          }

          resolve();
        },
        (_, error) => {
          console.error('❌ Export query error:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};
