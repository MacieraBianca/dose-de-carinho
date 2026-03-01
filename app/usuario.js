import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dose de carinho</Text>
      
      <View style={styles.buttonContainer}>

        <Link href="/dadosPaciente" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Dados do paciente</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/cuidadores" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cuidadores</Text>
          </TouchableOpacity>
        </Link>

        {/* ✅ NOVO BOTÃO */}
        <Link href="/creditos" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Créditos do desenvolvedor</Text>
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
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
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