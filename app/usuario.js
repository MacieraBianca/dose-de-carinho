import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'; // MUDANÇA: Importar Link para navegação

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dose de carinho</Text>
      
      <View style={styles.buttonContainer}>
        {/* Botão "Dados do paciente" */}
        <Link href="/dadosPaciente" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Dados do paciente</Text>
          </TouchableOpacity>
        </Link>

        {/* Botão "Cuidadores" */}
        <Link href="/cuidadores" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cuidadores</Text>
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
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B262C',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%', // Usa a largura total
    maxWidth: 300, // Largura máxima para os botões
  },
  button: {
    backgroundColor: '#3282B8',
    paddingVertical: 18,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});