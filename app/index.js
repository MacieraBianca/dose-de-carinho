// app/index.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { MedicineContext } from '../context/MedicineContext';
import { PatientContext } from '../context/PatientContext'; // ✅ já pega o nome do paciente
import pillIcon from '../assets/icons/pill.png';

const HomeScreen = () => {
  const { medicines } = useContext(MedicineContext);
  const { patientData } = useContext(PatientContext);

  const renderItem = ({ item }) => (
    <View style={styles.medicineCard}>
      <Image source={pillIcon} style={styles.pillIcon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.medicineText}>
          {item.name} - {item.quantity} dose(s) às {item.time}
        </Text>
        <Text style={styles.daysText}>
          {item.days && item.days.length > 0 ? item.days.join(', ') : "Todos os dias"}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dose de carinho</Text>
      <Text style={styles.patientName}>
        {patientData.nome ? patientData.nome : "Paciente não cadastrado"}
      </Text>
      <FlatList
        data={medicines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#BBE1FA', 
    paddingTop: 60, 
    paddingHorizontal: 20 
  },
  header: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#1B262C', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  patientName: { 
    fontSize: 18, 
    color: '#3282B8', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 15, 
    textAlign: 'center', 
    marginBottom: 20, 
    overflow: 'hidden' 
  },
  list: { paddingBottom: 20 },
  medicineCard: { 
    flexDirection: 'row', 
    backgroundColor: '#3282B8', 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 15, 
    alignItems: 'center' 
  },
  pillIcon: { 
    width: 24, 
    height: 24, 
    marginRight: 15, 
    tintColor: '#fff' 
  },
  medicineText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '500' 
  },
  daysText: {
    color: '#BBE1FA',
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic'
  }
});

export default HomeScreen;