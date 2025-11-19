// import { getDB } from '../utils/db';
 

// // Hitung detik sampai ke target HH:mm
// const getSecondsUntil = (hhmm: string): number => {
//   const [targetHour, targetMin] = hhmm.split(':').map(Number);
//   const now = new Date();

//   const target = new Date();
//   target.setHours(targetHour);
//   target.setMinutes(targetMin);
//   target.setSeconds(0);
//   target.setMilliseconds(0);

//   let diff = (target.getTime() - now.getTime()) / 1000; // dalam detik
//   if (diff < 0) {
//     // kalau sudah lewat, jadwalkan untuk besok
//     diff += 24 * 60 * 60;
//   }

//   return Math.round(diff);
// };

// export const checkAndNotifyLowStock = async () => {
//   const db = await getDB();
//   db.transaction(tx => {
//     tx.executeSql(
//       'SELECT * FROM rack_items WHERE quantity <= low_stock_threshold',
//       [],
//       async (_, result) => {
//         for (let i = 0; i < result.rows.length; i++) {
//           const item = result.rows.item(i);

//           if (!item.reminder_time) {
//             // Kirim langsung kalau reminder_time kosong
//             await Notifications.scheduleNotificationAsync({
//               content: {
//                 title: `Stock Alert: ${item.content}`,
//                 body: item.quantity === 0
//                   ? 'Stock sudah habis!'
//                   : `Stock tinggal ${item.quantity}`,
//                 sound: 'default',
//               },
//               trigger: { seconds: 1, channelId: 'default' },
//             });
//             console.log(`📥 Immediate notif sent for ${item.content}`);
//           } else {
//             const seconds = getSecondsUntil(item.reminder_time);
//             await Notifications.scheduleNotificationAsync({
//               content: {
//                 title: `Stock Alert: ${item.content}`,
//                 body: item.quantity === 0
//                   ? 'Stock sudah habis!'
//                   : `Stock tinggal ${item.quantity}`,
//                 sound: 'default',
//               },
//               trigger: {
//                 seconds,
//                 channelId: 'default',
//               },
//             });
//             console.log(`📥 Scheduled notif for ${item.content} in ${seconds} seconds`);
//           }
//         }
//       },
//       (_, error) => {
//         console.error('Error fetching low stock items:', error);
//         return false;
//       }
//     );
//   });
// };
