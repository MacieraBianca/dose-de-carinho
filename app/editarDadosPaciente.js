import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { PatientContext } from '../context/PatientContext'; // MUDANÇA: Importar PatientContext

import editIcon from '../assets/icons/edit.png'; // MUDANÇA: Importar ícone de edição
import cancelIcon from '../assets/icons/cancel.png'; // Ícone de fechar

export default function EditarDadosPacienteScreen() {
  const { patientData, updatePatientData } = useContext(PatientContext);
  const router = useRouter();

  // Estados locais para os campos editáveis
  const [nome, setNome] = useState(patientData.nome);
  const [idade, setIdade] = useState(patientData.idade);
  const [sexo, setSexo] = useState(patientData.sexo);
  const [doenca, setDoenca] = useState(patientData.doenca);

  const handleSave = () => {
    // Validação básica
    if (!nome.trim() || !idade.trim() || !sexo.trim() || !doenca.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos antes de salvar.');
      return;
    }

    updatePatientData({ nome, idade, sexo, doenca });
    Alert.alert('Sucesso', 'Dados do paciente atualizados!');
    router.back(); // Volta para a tela anterior
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Dose de carinho</Text>

        {/* Botão de fechar (X) */}
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <Image source={cancelIcon} style={styles.closeIcon}/>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.label}>Nome do paciente:</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome completo" />

          <Text style={styles.label}>Idade do paciente:</Text>
          <TextInput style={styles.input} value={idade} onChangeText={setIdade} keyboardType="numeric" placeholder="Idade em anos" />

          <Text style={styles.label}>Sexo do paciente:</Text>
          <TextInput style={styles.input} value={sexo} onChangeText={setSexo} placeholder="Ex: Masculino, Feminino" />

          <Text style={styles.label}>Doença do paciente:</Text>
          <TextInput style={styles.input} value={doenca} onChangeText={setDoenca} placeholder="Ex: Diabetes, Hipertensão" />

          <Text style={styles.label}>Cuidados e informações gerais:</Text>
          <View style={styles.cuidadosContainer}>
            {patientData.cuidadosGerais.length > 0 ? (
              patientData.cuidadosGerais.map((cuidado, index) => (
                <Text key={cuidado.id} style={styles.cuidadoText}>
                  {index + 1}: {cuidado.text}
                </Text>
              ))
            ) : (
              <Text style={styles.noCuidadoText}>Nenhum cuidado adicionado.</Text>
            )}
          </View>
          
          {/* Botão de Editar (CUIDADOS) */}
          <Link href="/editarCuidados" asChild>
            <TouchableOpacity style={styles.editCuidadosButton}>
                <Image source={editIcon} style={styles.editIcon} />
                <Text style={styles.editCuidadosButtonText}>Editar Cuidados</Text>
            </TouchableOpacity>
          </Link>

          {/* Botão de Salvar Dados do Paciente */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#BBE1FA',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 40, // Espaçamento extra para o scroll
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B262C',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 1,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  card: {
    backgroundColor: '#3282B8',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 500,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontSize: 16,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  cuidadosContainer: {
    backgroundColor: '#0F4C75',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  cuidadoText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  noCuidadoText: {
    color: '#BBE1FA',
    fontSize: 14,
    fontStyle: 'italic',
  },
  editCuidadosButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745', // Verde para o botão de editar cuidados
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20, // Espaço antes do botão de salvar
  },
  editCuidadosButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  editIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#0F4C75', // Azul escuro para o botão Salvar
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
