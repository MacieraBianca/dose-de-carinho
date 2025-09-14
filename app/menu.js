import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import plusIcon from '../assets/icons/plus.png';
import minusIcon from '../assets/icons/minus.png';

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Link href="/addMedicine" asChild>
          <TouchableOpacity style={styles.button}>
            <Image source={plusIcon} style={styles.icon} />
            <Text style={styles.buttonText}>Adicionar remédio</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/removeMedicine" asChild>
          <TouchableOpacity style={[styles.button, styles.removeButton]}>
            <Image source={minusIcon} style={styles.icon} />
            <Text style={styles.buttonText}>Remover remédio</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBE1FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#3282B8',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Estilo base para ambos os botões
  button: {
    flexDirection: 'row',
    backgroundColor: '#28a745', // Fundo verde como padrão
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  // Estilo específico para o botão de remover.
  // Note que definimos APENAS o que muda em relação ao estilo 'button'.
  // Isso evita repetição de código.
  removeButton: {
    backgroundColor: '#dc3545', // Sobrescreve a cor de fundo para vermelho
    marginBottom: 0, // Remove a margem do último botão
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuScreen;