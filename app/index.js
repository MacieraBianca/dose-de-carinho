// app/index.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { MedicineContext } from '../context/MedicineContext';
import pillIcon from '../assets/icons/pill.png';

const HomeScreen = () => {
  const { medicines } = useContext(MedicineContext);
  // ... (restante do código do HomeScreen.js que te passei antes)
  // Colei aqui para facilitar:
  const renderItem = ({ item }) => (
    <View style={styles.medicineCard}>
      <Image source={pillIcon} style={styles.pillIcon} />
      <Text style={styles.medicineText}>{item.name} - {item.quantity} dose(s) às {item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dose de carinho</Text>
      <Text style={styles.patientName}>Nome paciente:</Text>
      <FlatList
        data={medicines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};
// ... (Cole aqui os styles do antigo HomeScreen.js)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#BBE1FA', paddingTop: 60, paddingHorizontal: 20, },
  header: { fontSize: 28, fontWeight: 'bold', color: '#1B262C', textAlign: 'center', marginBottom: 10, },
  patientName: { fontSize: 18, color: '#3282B8', backgroundColor: '#fff', padding: 15, borderRadius: 15, textAlign: 'center', marginBottom: 20, overflow: 'hidden' },
  list: { paddingBottom: 20, },
  medicineCard: { flexDirection: 'row', backgroundColor: '#3282B8', padding: 20, borderRadius: 15, marginBottom: 15, alignItems: 'center', },
  pillIcon: { width: 24, height: 24, marginRight: 15, tintColor: '#fff', },
  medicineText: { color: '#fff', fontSize: 16, fontWeight: '500', },
});

export default HomeScreen;