import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  registerForPushNotificationsAsync, 
  scheduleMedicineNotification,
  cancelMedicineNotifications 
} from '../app/services/notificationService'; // ✅ CORRETO

export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);

  // Solicitar permissão ao iniciar o app
  useEffect(() => {
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
    const newMedicine = { ...medicine, id: Date.now().toString() };
    const updatedMedicines = [...medicines, newMedicine];
    setMedicines(updatedMedicines);
    await saveMedicines(updatedMedicines);
    
    // ✅ Agendar notificação para o novo remédio
    await scheduleMedicineNotification(newMedicine);
  };

  const removeMedicines = async (ids) => {
    // ✅ Cancelar notificações dos remédios removidos
    for (const id of ids) {
      await cancelMedicineNotifications(id);
    }
    
    const updatedMedicines = medicines.filter((med) => !ids.includes(med.id));
    setMedicines(updatedMedicines);
    await saveMedicines(updatedMedicines);
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, removeMedicines }}>
      {children}
    </MedicineContext.Provider>
  );
};