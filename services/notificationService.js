import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

/**
 * REGISTRO DE PERMISSÕES + CANAL (ANDROID)
 * ✅ Som customizado no canal (Android)
 */
export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('❌ Permissão de notificação negada');
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('medicine-alarms', {
      name: 'Alarmes de Remédio',
      importance: Notifications.AndroidImportance.MAX,

      // ✅ Som customizado (o arquivo precisa existir no build nativo)
      sound: 'alarm',

      vibrationPattern: [0, 250, 250, 250],
      enableVibrate: true,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  }

  return true;
}

/**
 * AGENDAMENTO DOS ALARMES (SEMANAL)
 * ✅ Usa o canal com som "alarm" no Android
 * ✅ iOS: usa "default" (som custom no iOS exige config nativa extra)
 */
export async function scheduleMedicineNotification(medicine) {
  const dayMap = {
    Dom: 1,
    Seg: 2,
    Ter: 3,
    Qua: 4,
    Qui: 5,
    Sex: 6,
    Sáb: 7,
  };

  const date = new Date(medicine.dateTime);
  const hour = date.getHours();
  const minute = date.getMinutes();

  if (!medicine.days || medicine.days.length === 0) {
    return true;
  }

  for (const day of medicine.days) {
    const weekday = dayMap[day];
    if (!weekday) continue;

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '💊 Hora do remédio!',
          body: `Tomar ${medicine.quantity} dose(s) de ${medicine.name}`,

          // ✅ Android vai tocar o som do canal (medicine-alarms)
          // ✅ iOS toca o som padrão
          sound: 'default',

          data: { medicineId: medicine.id },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
          channelId: 'medicine-alarms',
          weekday,
          hour,
          minute,
          repeats: true,
        },
      });
    } catch (error) {
      console.warn(`⚠️ Falha ao agendar ${medicine.name} para ${day}`, error);
    }
  }

  console.log(`✅ Alarmes agendados: ${medicine.name} às ${hour}:${minute}`);
  return true;
}

/**
 * CANCELAMENTO DOS ALARMES
 */
export async function cancelMedicineNotifications(medicineId) {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();

  for (const notif of scheduled) {
    if (notif.content?.data?.medicineId === medicineId) {
      await Notifications.cancelScheduledNotificationAsync(notif.identifier);
    }
  }
}