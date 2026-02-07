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
    // Tenta registrar as permissões assim que o app abre
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
      
      // 1. Primeiro agendamos o alarme. Se isso falhar, ele vai para o catch.
      await scheduleMedicineNotification(newMedicine);
      
      // 2. Só salvamos na lista se o agendamento não der erro crítico
      const updatedMedicines = [...medicines, newMedicine];
      setMedicines(updatedMedicines);
      await saveMedicines(updatedMedicines);
      
      return true; // Sucesso!
    } catch (error) {
      console.error('Erro detalhado no agendamento:', error);
      // Lança o erro para o addMedicine.js exibir o alerta
      throw error; 
    }
  };

  const removeMedicines = async (ids) => {
    try {
      for (const id of ids) {
        await cancelMedicineNotifications(id);
      }
      const updatedMedicines = medicines.filter((med) => !ids.includes(med.id));
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