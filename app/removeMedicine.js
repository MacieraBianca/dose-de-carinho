import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router'; // MUDANÇA: Importar useRouter para navegação

import { MedicineContext } from '../context/MedicineContext'; // MUDANÇA: Caminho do contexto corrigido

// Importar ícone
import cancelIcon from '../assets/icons/cancel.png';

const RemoveMedicineScreen = () => {
  const router = useRouter(); // MUDANÇA: Usar o hook do Expo Router
  const { medicines, removeMedicines } = useContext(MedicineContext);
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(medId => medId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemove = () => {
    removeMedicines(selectedIds);
    router.back(); // MUDANÇA: Voltar para a tela anterior usando o router
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedIds.includes(item.id);
    return (
      <TouchableOpacity 
        style={[styles.medicineItem, isSelected && styles.selectedItem]} 
        onPress={() => toggleSelection(item.id)}
      >
        <View style={[styles.checkbox, isSelected && styles.checkedCheckbox]}>
            {isSelected && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.medicineText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* MUDANÇA: Botão de fechar agora usa o router */}
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <Image source={cancelIcon} style={styles.closeIcon}/>
        </TouchableOpacity>
        
        <FlatList
          data={medicines}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<Text style={styles.header}>Selecione para remover</Text>}
        />

        <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
          <Text style={styles.removeButtonText}>Remover</Text>
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
        height: '80%',
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
    header: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    medicineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0F4C75',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    selectedItem: {
        backgroundColor: '#28a745',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 4,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedCheckbox: {
        backgroundColor: '#fff',
    },
    checkmark: {
        color: '#28a745',
        fontSize: 16,
        fontWeight: 'bold',
    },
    medicineText: {
        color: '#fff',
        fontSize: 16,
    },
    removeButton: {
        backgroundColor: '#dc3545',
        borderRadius: 15,
        padding: 18,
        marginTop: 20,
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default RemoveMedicineScreen;