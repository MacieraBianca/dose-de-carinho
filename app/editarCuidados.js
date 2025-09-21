import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { PatientContext } from '../context/PatientContext'; // MUDANÇA: Importar PatientContext

import plusCircleIcon from '../assets/icons/plus-circle.png'; // MUDANÇA: Novo ícone para adicionar
import cancelIcon from '../assets/icons/cancel.png'; // Ícone de fechar

export default function EditarCuidadosScreen() {
  const { patientData, addCuidado, removeCuidado } = useContext(PatientContext);
  const router = useRouter();
  const [newCuidadoText, setNewCuidadoText] = useState('');
  const [selectedCuidados, setSelectedCuidados] = useState([]); // Para seleção múltipla

  const handleAddCuidado = () => {
    if (newCuidadoText.trim() === '') {
      Alert.alert('Atenção', 'Por favor, digite uma informação de cuidado para adicionar.');
      return;
    }
    addCuidado(newCuidadoText.trim());
    setNewCuidadoText(''); // Limpa o campo
  };

  const toggleSelectCuidado = (id) => {
    if (selectedCuidados.includes(id)) {
      setSelectedCuidados(selectedCuidados.filter((cId) => cId !== id));
    } else {
      setSelectedCuidados([...selectedCuidados, id]);
    }
  };

  const handleRemoveSelectedCuidados = () => {
    if (selectedCuidados.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos um cuidado para remover.');
      return;
    }
    Alert.alert(
      'Confirmar Remoção',
      `Tem certeza que deseja remover ${selectedCuidados.length} cuidado(s)?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          onPress: () => {
            selectedCuidados.forEach((id) => removeCuidado(id));
            setSelectedCuidados([]); // Limpa a seleção
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderCuidadoItem = ({ item, index }) => {
    const isSelected = selectedCuidados.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.cuidadoItem, isSelected && styles.selectedCuidadoItem]}
        onPress={() => toggleSelectCuidado(item.id)}
      >
        <View style={[styles.checkbox, isSelected && styles.checkedCheckbox]}>
          {isSelected && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.cuidadoTextItem}>
          {index + 1}: {item.text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dose de carinho</Text>

      {/* Botão de fechar (X) */}
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Image source={cancelIcon} style={styles.closeIcon}/>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cuidados e informações gerais</Text>

        <FlatList
          data={patientData.cuidadosGerais}
          renderItem={renderCuidadoItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listCuidados}
          ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum cuidado adicionado. Use o botão + para adicionar.</Text>}
        />

        {/* Área para adicionar novo cuidado */}
        <View style={styles.addCuidadoSection}>
          <TextInput
            style={styles.addCuidadoInput}
            placeholder="Nova informação de cuidado"
            placeholderTextColor="#BBE1FA"
            value={newCuidadoText}
            onChangeText={setNewCuidadoText}
          />
          <TouchableOpacity style={styles.addCuidadoButton} onPress={handleAddCuidado}>
            <Image source={plusCircleIcon} style={styles.plusIcon} />
          </TouchableOpacity>
        </View>

        {/* Botões Remover e Salvar */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.removeButton} onPress={handleRemoveSelectedCuidados}>
            <Text style={styles.buttonText}>Remover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
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
    top: 30,
    right: 20,
    zIndex: 1,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  card: {
    backgroundColor: '#3282B8',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 500,
    flex: 1, // Para ocupar o espaço restante
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listCuidados: {
    flexGrow: 1, // Permite que a FlatList ocupe o espaço
    marginBottom: 20,
  },
  emptyListText: {
    color: '#BBE1FA',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  cuidadoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F4C75',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedCuidadoItem: {
    backgroundColor: '#007bff', // Cor diferente quando selecionado
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
    color: '#007bff', // Cor do checkmark
    fontSize: 16,
    fontWeight: 'bold',
  },
  cuidadoTextItem: {
    color: '#fff',
    fontSize: 16,
    flex: 1, // Permite que o texto ocupe o espaço restante
  },
  addCuidadoSection: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  addCuidadoInput: {
    flex: 1,
    backgroundColor: '#0F4C75',
    color: '#fff',
    fontSize: 16,
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  addCuidadoButton: {
    backgroundColor: '#28a745', // Verde para o botão de adição
    borderRadius: 25, // Formato circular
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: '#dc3545', // Vermelho para remover
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#28a745', // Verde para salvar
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});