// context/MedicineContext.js
import React, { useState, createContext } from 'react';

export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([
    { id: '1', name: 'Insulina', quantity: 1, time: '08:00' },
    { id: '2', name: 'Losartana', quantity: 2, time: '12:30' },
    { id: '3', name: 'Sinvastatina', quantity: 1, time: '20:00' },
  ]);

  const addMedicine = (medicine) => {
    setMedicines((current) => [...current, { ...medicine, id: Math.random().toString() }]);
  };

  const removeMedicines = (idsToRemove) => {
    setMedicines((current) => current.filter(med => !idsToRemove.includes(med.id)));
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, removeMedicines }}>
      {children}
    </MedicineContext.Provider>
  );
};