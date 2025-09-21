import React, { createContext, useState } from 'react';

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patientData, setPatientData] = useState({
    nome: 'Nome do Paciente',
    idade: '00',
    sexo: 'Não Informado',
    doenca: 'Não Informada',
    cuidadosGerais: [
      { id: '1', text: 'Não pode dar Doces' },
      { id: '2', text: 'Dar banho sempre com a água meio morna' },
    ],
  });

  const updatePatientData = (newData) => {
    setPatientData((prevData) => ({ ...prevData, ...newData }));
  };

  const addCuidado = (newCuidadoText) => {
    setPatientData((prevData) => ({
      ...prevData,
      cuidadosGerais: [...prevData.cuidadosGerais, { id: Math.random().toString(), text: newCuidadoText }],
    }));
  };

  const removeCuidado = (idToRemove) => {
    setPatientData((prevData) => ({
      ...prevData,
      cuidadosGerais: prevData.cuidadosGerais.filter(cuidado => cuidado.id !== idToRemove),
    }));
  };

  return (
    <PatientContext.Provider value={{ patientData, updatePatientData, addCuidado, removeCuidado }}>
      {children}
    </PatientContext.Provider>
  );
};