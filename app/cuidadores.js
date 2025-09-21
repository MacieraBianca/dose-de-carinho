import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // MUDANÇA: Importar useRouter

export default function CuidadoresScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dose de carinho</Text>
      
      {/* Botão de fechar (X) - igual aos outros modais */}
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={{ fontSize: 24, color: '#3282B8' }}>X</Text> 
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Gerenciamento de Cuidadores</Text>
        <Text style={styles.infoText}>Esta tela será desenvolvida em breve para gerenciar os cuidadores do paciente.</Text>
        {/* Futuramente, você pode adicionar funcionalidades aqui, como:
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Adicionar Cuidador</Text>
        </TouchableOpacity>
        <FlatList ... />
        */}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoText: {
    color: '#BBE1FA',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});