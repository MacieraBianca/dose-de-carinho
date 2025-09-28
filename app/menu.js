import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import plusIcon from '../assets/icons/plus.png';
import minusIcon from '../assets/icons/minus.png';

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Botão Adicionar Remédio */}
        <Link href="/addMedicine" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Image source={plusIcon} style={styles.icon} />
            <Text style={styles.buttonText}>Adicionar remédio</Text>
          </TouchableOpacity>
        </Link>

        {/* Botão Remover Remédio */}
        <Link href="/removeMedicine" asChild>
          <TouchableOpacity style={styles.removeButton}>
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
  // Estilo separado e completo para o botão de adicionar
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745', // Fundo verde
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20, // Margem para separar do botão de baixo
  },
  // Estilo separado e completo para o botão de remover
  removeButton: {
    flexDirection: 'row',
    backgroundColor: '#dc3546b9', // Fundo vermelho
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 0, // Sem margem, pois é o último elemento
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