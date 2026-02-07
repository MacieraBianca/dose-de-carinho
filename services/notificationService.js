import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) return;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') return;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#3282B8',
    });
  }
}

export async function scheduleMedicineNotification(medicine) {
  // Mapeamento de dias para o padrão do Expo (1 = Domingo, 2 = Segunda...)
  const dayMap = { 'Dom': 1, 'Seg': 2, 'Ter': 3, 'Qua': 4, 'Qui': 5, 'Sex': 6, 'Sáb': 7 };

  // Pegamos a hora e minuto diretamente do objeto de data enviado
  const triggerDate = new Date(medicine.dateTime);
  const hours = triggerDate.getHours();
  const minutes = triggerDate.getMinutes();

  if (medicine.days && medicine.days.length > 0) {
    for (const day of medicine.days) {
      const weekday = dayMap[day];
      if (weekday) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '💊 Hora do remédio!',
            body: `Tomar ${medicine.quantity} dose(s) de ${medicine.name}`,
            sound: true,
            data: { medicineId: medicine.id },
          },
          trigger: {
            weekday: weekday,
            hour: hours,
            minute: minutes,
            repeats: true,
          },
        });
      }
    }
  }
  console.log(`✅ Alarmes agendados para ${medicine.name} às ${hours}:${minutes}`);
}

export async function cancelMedicineNotifications(medicineId) {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const notif of scheduled) {
    if (notif.content.data.medicineId === medicineId) {
      await Notifications.cancelScheduledNotificationAsync(notif.identifier);
    }
  }
}