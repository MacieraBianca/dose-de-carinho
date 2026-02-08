import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  registerForPushNotificationsAsync, 
  scheduleMedicineNotification,
  cancelMedicineNotifications 
} from '../services/notificationService';

export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    // Registra permissões e cria o canal de notificação ao abrir o app
    registerForPushNotificationsAsync();
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const storedMedicines = await AsyncStorage.getItem('medicines');
      if (storedMedicines) {
        setMedicines(JSON.parse(storedMedicines));
      }
    } catch (error) {
      console.error('Erro ao carregar medicamentos:', error);
    }
  };

  const saveMedicines = async (newMedicines) => {
    try {
      await AsyncStorage.setItem('medicines', JSON.stringify(newMedicines));
    } catch (error) {
      console.error('Erro ao salvar medicamentos:', error);
    }
  };

  const addMedicine = async (medicine) => {
    try {
      const newMedicine = { ...medicine, id: Date.now().toString() };

      // Primeiro agenda o alarme
      await scheduleMedicineNotification(newMedicine);

      // Depois salva no estado e no AsyncStorage
      const updatedMedicines = [...medicines, newMedicine];
      setMedicines(updatedMedicines);
      await saveMedicines(updatedMedicines);

      return true;
    } catch (error) {
      console.error('Erro detalhado no agendamento:', error);
      throw error;
    }
  };

  const removeMedicines = async (ids) => {
    try {
      for (const id of ids) {
        await cancelMedicineNotifications(id);
      }
      const updatedMedicines = medicines.filter(
        (med) => !ids.includes(med.id)
      );
      setMedicines(updatedMedicines);
      await saveMedicines(updatedMedicines);
    } catch (error) {
      console.error('Erro ao remover:', error);
    }
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, removeMedicines }}>
      {children}
    </MedicineContext.Provider>
  );
};
