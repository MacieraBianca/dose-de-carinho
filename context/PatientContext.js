import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PatientContext = createContext();

const STORAGE_KEY = '@dose_de_carinho:patientData_v1';

const DEFAULT_PATIENT_DATA = {
  nome: 'Nome do Paciente',
  idade: '00',
  sexo: 'Não Informado',
  doenca: 'Não Informada',
  cuidadosGerais: [
    { id: '1', text: 'Não pode dar Doces' },
    { id: '2', text: 'Dar banho sempre com a água meio morna' },
  ],
};

export const PatientProvider = ({ children }) => {
  const [patientData, setPatientData] = useState(DEFAULT_PATIENT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1) Carrega do celular quando o app inicia
  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          // Merge com default (evita quebrar se faltar algum campo)
          setPatientData({ ...DEFAULT_PATIENT_DATA, ...parsed });
        }
      } catch (e) {
        console.log('Erro ao carregar patientData:', e);
      } finally {
        setIsLoaded(true);
      }
    };

    load();
  }, []);

  // 2) Salva no celular sempre que patientData mudar (depois de carregar)
  useEffect(() => {
    if (!isLoaded) return;

    const save = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(patientData));
      } catch (e) {
        console.log('Erro ao salvar patientData:', e);
      }
    };

    save();
  }, [patientData, isLoaded]);

  const updatePatientData = (newData) => {
    setPatientData((prevData) => ({ ...prevData, ...newData }));
  };

  const addCuidado = (newCuidadoText) => {
    setPatientData((prevData) => ({
      ...prevData,
      cuidadosGerais: [
        ...prevData.cuidadosGerais,
        { id: Math.random().toString(), text: newCuidadoText },
      ],
    }));
  };

  const removeCuidado = (idToRemove) => {
    setPatientData((prevData) => ({
      ...prevData,
      cuidadosGerais: prevData.cuidadosGerais.filter((c) => c.id !== idToRemove),
    }));
  };

  return (
    <PatientContext.Provider value={{ patientData, updatePatientData, addCuidado, removeCuidado }}>
      {children}
    </PatientContext.Provider>
  );
};
