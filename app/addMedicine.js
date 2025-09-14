import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Image, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router'; // MUDANÇA: Importar useRouter para navegação

import { MedicineContext } from '../context/MedicineContext'; // MUDANÇA: Caminho do contexto corrigido

// Importar ícones
import cancelIcon from '../assets/icons/cancel.png';
import clockIcon from '../assets/icons/circular-alarm-clock-tool.png';

const AddMedicineScreen = () => {
  const router = useRouter(); // MUDANÇA: Usar o hook do Expo Router
  const { addMedicine } = useContext(MedicineContext);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleAddTime = () => {
    if (name.trim() === '' || quantity.trim() === '') {
      // Usando Alert em vez de alert()
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }
    const newMedicine = {
      name,
      quantity: parseInt(quantity, 10),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    addMedicine(newMedicine);
    router.back(); // MUDANÇA: Voltar para a tela anterior usando o router
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* MUDANÇA: Botão de fechar agora usa o router */}
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <Image source={cancelIcon} style={styles.closeIcon}/>
        </TouchableOpacity>
        
        <Text style={styles.label}>Nome do remédio:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Ex: Paracetamol" />

        <Text style={styles.label}>Quantidade do remédio:</Text>
        <TextInput 
          style={styles.input} 
          value={quantity} 
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Selecione o horário do remédio:</Text>
        <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowPicker(true)}>
          <Text style={styles.timeText}>
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Image source={clockIcon} style={styles.clockIcon} />
        </TouchableOpacity>
        
        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleAddTime}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos (permanecem os mesmos)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BBE1FA',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#3282B8',
        borderRadius: 20,
        padding: 25,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 1,
    },
    closeIcon: {
        width: 30,
        height: 30,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 8,
        marginTop: 20,
    },
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    timePickerButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 18,
        color: '#333',
    },
    clockIcon: {
        width: 24,
        height: 24,
        tintColor: '#333',
    },
    addButton: {
        backgroundColor: '#28a745',
        borderRadius: 15,
        padding: 18,
        marginTop: 30,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default AddMedicineScreen;