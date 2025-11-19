import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'ProjectDB.db';
let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!dbInstance) {
    try {
      dbInstance = await SQLite.openDatabase({
        name: database_name,
        location: 'default',
      });
      console.log('Database opened');
    } catch (error) {
      console.error('Failed to open database:', error);
    }
  }
  return dbInstance!;
};

// ==============================
// Inisialisasi DB
// ==============================

export const initDB = async () => {
  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS rack (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT,
              umur INTEGER
            );`,
            [],
            () => console.log('✅ rack table ready'),
            (_, error) => {
              console.error('❌ rack table error:', error);
              reject(error);
              return false;
            }
          );
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS rack_items (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              rack_id INTEGER,
              content TEXT,
              quantity INTEGER,
              low_stock_threshold INTEGER DEFAULT 5,
              FOREIGN KEY (rack_id) REFERENCES rack(id)
            );`,
            [],
            () => console.log('✅ rack_items table ready (no reminder_time)'),
            (_, error) => {
              console.error('❌ rack_items table error:', error);
              reject(error);
              return false;
            }
          );
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS logs (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              action TEXT,
              detail TEXT,
              timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            );`,
            [],
            () => console.log('✅ logs table ready'),
            (_, error) => {
              console.error('❌ logs table error:', error);
              reject(error);
              return false;
            }
          );
          tx.executeSql(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );`
);
tx.executeSql(
  'INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)',
  ['michael', 'bismillah123'],
  () => console.log('✅ User seed inserted or already exists'),
  (_, err) => {
    console.error('❌ User seed error:', err);
    return false;
  }
);
        },
        error => {
          console.error('❌ Transaction error during initDB:', error);
          reject(error);
        },
        () => {
          console.log('✅ All tables initialized');
          resolve();
        }
      );
    });
  } catch (err) {
    console.error('initDB error:', err);
  }
};

// ==============================
// CRUD RACK
// ==============================

export const insertRack = async (name: string) => {
  try {
    const db = await getDB();
    await db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO rack (name, umur) VALUES (?, ?)',
        [name, 20],
        () => console.log('Rack inserted:', name),
        (_, error) => {
          console.error('Error inserting rack:', error);
          return false;
        }
      );
    });
  } catch (err) {
    console.error('insertRack error:', err);
  }
};

export const getRacks = async (): Promise<any[]> => {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM rack',
          [],
          (_, result) => {
            const rows = result.rows;
            const racks = [];
            for (let i = 0; i < rows.length; i++) {
              racks.push(rows.item(i));
            }
            console.log('Fetched racks:', racks.length);
            resolve(racks);
          },
          (_, error) => {
            console.error('Error fetching racks:', error);
            reject(error);
            return false;
          }
        );
      });
    });
  } catch (err) {
    console.error('getRacks error:', err);
    return [];
  }
};

export const deleteRack = async (id: number) => {
  try {
    const db = await getDB();
    await db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM rack_items WHERE rack_id = ?',
        [id],
        () => console.log('Related items deleted')
      );
      tx.executeSql(
        'DELETE FROM rack WHERE id = ?',
        [id],
        () => console.log('Rack deleted:', id),
        (_, error) => {
          console.error('Error deleting rack:', error);
          return false;
        }
      );
    });
  } catch (err) {
    console.error('deleteRack error:', err);
  }
};

// ==============================
// CRUD RACK_ITEMS
// ==============================

export const insertItemToRack = async (
  rackId: number,
  content: string,
  quantity: number,
  lowStockThreshold: number
) => {
  try {
    const db = await getDB();
    await db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO rack_items (rack_id, content, quantity, low_stock_threshold) VALUES (?, ?, ?, ?)',
        [rackId, content, quantity, lowStockThreshold],
        () => console.log('Item added to rack:', content),
        (_, error) => {
          console.error('Error inserting item:', error);
          return false;
        }
      );
    });
  } catch (err) {
    console.error('insertItemToRack error:', err);
  }
};

export const getItemsByRack = async (rackId: number): Promise<any[]> => {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM rack_items WHERE rack_id = ? ORDER BY id DESC',
          [rackId],
          (_, result) => {
            const items = [];
            for (let i = 0; i < result.rows.length; i++) {
              items.push(result.rows.item(i));
            }
            resolve(items);
          },
          (_, error) => {
            console.error('Error fetching rack items:', error);
            reject(error);
            return false;
          }
        );
      });
    });
  } catch (err) {
    console.error('getItemsByRack error:', err);
    return [];
  }
};

export const deleteItem = async (itemId: number) => {
  try {
    const db = await getDB();
    await db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM rack_items WHERE id = ?',
        [itemId],
        () => console.log('Item deleted:', itemId),
        (_, error) => {
          console.error('Error deleting item:', error);
          return false;
        }
      );
    });
  } catch (err) {
    console.error('deleteItem error:', err);
  }
};

export const updateItem = async (
  itemId: number,
  content: string,
  quantity: number,
  updatedThreshold: number
) => {
  try {
    const db = await getDB();
    await db.transaction(tx => {
      tx.executeSql(
        'UPDATE rack_items SET content = ?, quantity = ?, low_stock_threshold = ? WHERE id = ?',
        [content, quantity, updatedThreshold, itemId],
        () => console.log('Item updated:', itemId),
        (_, error) => {
          console.error('Error updating item:', error);
          return false;
        }
      );
    });
  } catch (err) {
    console.error('updateItem error:', err);
  }
};

// ==============================
// LOG TABLES
// ==============================

// Inisialisasi tabel log
export const initLogsTable = async () => {
  const db = await getDB();
  await db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT,
        detail TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );`
    );
  });
};

// Fungsi untuk menyimpan log dengan format deskriptif
export const insertLog = async (action: string, detail: string) => {
  try {
    const db = await getDB();
    await db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO logs (action, detail) VALUES (?, ?)',
        [action, detail],
        () => console.log(`✅ Logged: ${action} → ${detail}`),
        (_, error) => {
          console.error('❌ Error inserting log:', error);
          return false;
        }
      );
    });
  } catch (err) {
    console.error('❌ insertLog error:', err);
  }
};

// Bersihkan log lama (keep max 500)
export const cleanOldLogs = async () => {
  try {
    const db = await getDB();
    const maxLogs = 500;
    await db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM logs WHERE id NOT IN (
          SELECT id FROM logs ORDER BY timestamp DESC LIMIT ?
        )`,
        [maxLogs],
        () => console.log('🧹 Cleaned old logs'),
        (_, err) => {
          console.error('❌ Error cleaning logs:', err);
          return false;
        }
      );
    });
  } catch (err) {
    console.error('❌ cleanOldLogs error:', err);
  }
};
