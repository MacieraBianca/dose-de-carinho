import { Tabs } from 'expo-router';
import { Image, StyleSheet, View, Text } from 'react-native'; // Adicionado View e Text
import { MedicineProvider } from '../context/MedicineContext';
import { PatientProvider } from '../context/PatientContext'; // MUDANÇA: Importar PatientProvider

import infoIcon from '../assets/icons/house.png';
import menuIcon from '../assets/icons/menu.png';
import userIcon from '../assets/icons/profile-user.png';

export default function AppLayout() {
  return (
    // MUDANÇA: Envolver tudo com PatientProvider
    <PatientProvider> 
      <MedicineProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#BBE1FA',
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Início',
              tabBarIcon: ({ color }) => <Image source={infoIcon} style={[styles.tabIcon, { tintColor: color }]} />,
            }}
          />
          <Tabs.Screen
            name="menu"
            options={{
              title: 'Menu',
              tabBarIcon: ({ color }) => <Image source={menuIcon} style={[styles.tabIcon, { tintColor: color }]} />,
            }}
          />
          <Tabs.Screen
            name="usuario" // MUDANÇA: Agora o `usuario` vai ter sua própria tela com os botões
            options={{
              title: 'Usuário',
              tabBarIcon: ({ color }) => <Image source={userIcon} style={[styles.tabIcon, { tintColor: color }]} />,
            }}
          />
          {/* Telas que abrem como modal não aparecem na tab bar */}
          <Tabs.Screen name="addMedicine" options={{ href: null, presentation: 'modal' }} />
          <Tabs.Screen name="removeMedicine" options={{ href: null, presentation: 'modal' }} />

          {/* MUDANÇA: Novas rotas para as telas do paciente */}
          <Tabs.Screen name="dadosPaciente" options={{ href: null, presentation: 'modal' }} />
          <Tabs.Screen name="editarDadosPaciente" options={{ href: null, presentation: 'modal' }} />
          <Tabs.Screen name="editarCuidados" options={{ href: null, presentation: 'modal' }} />
          {/* MUDANÇA: Tela de Cuidadores ainda não criada, mas já reservamos a rota */}
          <Tabs.Screen name="cuidadores" options={{ href: null, presentation: 'modal' }} /> 

        </Tabs>
      </MedicineProvider>
    </PatientProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0F4C75',
    borderTopWidth: 0,
    height: 70,
    paddingBottom: 10,
    paddingTop: 5,
  },
  tabIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});