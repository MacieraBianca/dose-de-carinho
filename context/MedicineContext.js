// context/MedicineContext.js

import React, { createContext, useState } from 'react';
import 'react-native-get-random-values'; // Import para o uuid
import { v4 as uuidv4 } from 'uuid';
import * as Notifications from 'expo-notifications';

export const MedicineContext = createContext();

// Função para converter o nome do dia em número (1=Dom, 2=Seg, ...)
const dayToNumber = {
  "Dom": 1,
  "Seg": 2,
  "Ter": 3,
  "Qua": 4,
  "Qui": 5,
  "Sex": 6,
  "Sáb": 7
};

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);

  const addMedicine = async (medicine) => {
    const id = uuidv4();
    const notificationIds = [];
    const [hour, minute] = medicine.time.split(':').map(Number);

    // Agendar uma notificação para cada dia da semana selecionado
    for (const day of medicine.days) {
      try {
        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: "💊 Hora do Remédio!",
            body: `Está na hora de tomar o seu ${medicine.name}.`,
            sound: 'default', // Toca o som padrão
          },
          trigger: {
            weekday: dayToNumber[day], // O dia da semana
            hour: hour,                // A hora
            minute: minute,            // O minuto
            repeats: true,             // A notificação se repetirá semanalmente
          },
        });
        notificationIds.push(notificationId);
      } catch (error) {
        console.error("Erro ao agendar notificação:", error);
      }
    }
    
    // Para testar, você pode descomentar a linha abaixo para ver as notificações agendadas
    // console.log(await Notifications.getAllScheduledNotificationsAsync());

    setMedicines(prev => [...prev, { ...medicine, id, notificationIds }]);
  };

  const removeMedicines = async (idsToRemove) => {
    // Primeiro, cancela todas as notificações agendadas para os remédios a serem removidos
    const medicinesToRemove = medicines.filter(med => idsToRemove.includes(med.id));
    for (const med of medicinesToRemove) {
      if (med.notificationIds && med.notificationIds.length > 0) {
        for (const notificationId of med.notificationIds) {
          await Notifications.cancelScheduledNotificationAsync(notificationId);
        }
      }
    }
    
    // Depois, remove os remédios do estado
    setMedicines(prev => prev.filter(med => !idsToRemove.includes(med.id)));
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, removeMedicines }}>
      {children}
    </MedicineContext.Provider>
  );
};