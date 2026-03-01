import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function CreditosScreen() {

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desenvolvido por</Text>
      <Text style={styles.name}>Bianca Macieira</Text>

      <TouchableOpacity 
        style={styles.linkButton}
        onPress={() => openLink('https://www.linkedin.com/in/bianca-macieira-969026176/')}>
        <Text style={styles.linkText}>LinkedIn</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton}
        onPress={() => openLink('https://github.com/MacieraBianca')}>
        <Text style={styles.linkText}>GitHub</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton}
        onPress={() => openLink('https://www.instagram.com/biancamacieira/')}>
        <Text style={styles.linkText}>Instagram</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBE1FA',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    color: '#1B262C'
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#C884A6'
  },
  linkButton: {
    backgroundColor: '#0F4C75',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    marginBottom: 15,
    alignItems: 'center'
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});