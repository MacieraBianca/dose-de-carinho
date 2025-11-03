import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configurar como as notificações devem se comportar quando o app está aberto
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Solicitar permissão para notificações
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#3282B8',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Permissão de notificação negada!');
      return;
    }
  }

  return token;
}

// Cancelar todas as notificações agendadas de um remédio específico
export async function cancelMedicineNotifications(medicineId) {
  const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
  
  for (const notification of scheduledNotifications) {
    if (notification.content.data.medicineId === medicineId) {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  }
}

// Agendar notificações para um remédio
export async function scheduleMedicineNotification(medicine) {
  // Cancelar notificações antigas deste remédio (se existirem)
  await cancelMedicineNotifications(medicine.id);

  // Converter dias da semana para números (1 = segunda, 7 = domingo)
  const dayMap = {
    'Dom': 1,
    'Seg': 2,
    'Ter': 3,
    'Qua': 4,
    'Qui': 5,
    'Sex': 6,
    'Sáb': 7
  };

  const weekdays = medicine.days.map(day => dayMap[day]);

  // Extrair hora e minuto do horário
  const [hours, minutes] = medicine.time.split(':').map(Number);

  // Agendar uma notificação para cada dia da semana selecionado
  for (const weekday of weekdays) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '💊 Hora do remédio!',
        body: `Não esqueça de tomar ${medicine.quantity} dose(s) de ${medicine.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: { 
          medicineId: medicine.id,
          medicineName: medicine.name 
        },
      },
      trigger: {
        weekday: weekday,
        hour: hours,
        minute: minutes,
        repeats: true, // Repetir semanalmente
      },
    });
  }

  console.log(`✅ Notificações agendadas para ${medicine.name} nos dias: ${medicine.days.join(', ')}`);
}

// Cancelar TODAS as notificações (útil para limpeza)
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Listar todas as notificações agendadas (útil para debug)
export async function listScheduledNotifications() {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  console.log('📅 Notificações agendadas:', notifications.length);
  notifications.forEach(notif => {
    console.log(`- ${notif.content.title} às ${notif.trigger.hour}:${notif.trigger.minute}`);
  });
  return notifications;
}