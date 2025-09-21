import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { PatientContext } from '../context/PatientContext'; // MUDANÇA: Importar PatientContext

export default function DadosPacienteScreen() {
  const { patientData } = useContext(PatientContext);
  const router = useRouter(); // Para o botão de fechar

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dose de carinho</Text>

      {/* Botão de fechar (X) - igual aos outros modais */}
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          {/* Pode usar o cancelIcon aqui se quiser ou um 'X' simples */}
          <Text style={{ fontSize: 24, color: '#3282B8' }}>X</Text> 
      </TouchableOpacity>
      
      <View style={styles.card}>
        <Text style={styles.label}>Nome do paciente:</Text>
        <Text style={styles.infoText}>{patientData.nome}</Text>

        <Text style={styles.label}>Idade do paciente:</Text>
        <Text style={styles.infoText}>{patientData.idade}</Text>

        <Text style={styles.label}>Sexo do paciente:</Text>
        <Text style={styles.infoText}>{patientData.sexo}</Text>

        <Text style={styles.label}>Doença do paciente:</Text>
        <Text style={styles.infoText}>{patientData.doenca}</Text>

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

        {/* Botão de Editar Dados */}
        <Link href="/editarDadosPaciente" asChild>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBE1FA',
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
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
    top: 30, // Ajuste conforme necessário para não ficar colado na borda
    right: 20,
    zIndex: 1,
    backgroundColor: '#fff', // Fundo branco para o 'X'
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#3282B8',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 500, // Para telas maiores
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
    fontWeight: 'bold',
  },
  infoText: {
    backgroundColor: '#0F4C75', // Cor mais escura para o fundo da informação
    color: '#fff',
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
  editButton: {
    backgroundColor: '#28a745', // Verde para o botão de editar
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});