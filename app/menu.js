// app/menu.js
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
// ... (Cole aqui os styles do antigo MenuScreen.js)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#BBE1FA', justifyContent: 'center', alignItems: 'center', padding: 20, },
  card: { backgroundColor: '#3282B8', borderRadius: 20, padding: 30, width: '100%', alignItems: 'center', },
  button: { flexDirection: 'row', backgroundColor: '#28a745', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 20, },
  removeButton: { backgroundColor: '#dc3545', marginBottom: 0, },
  icon: { width: 30, height: 30, marginRight: 15, },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', },
});
export default MenuScreen;