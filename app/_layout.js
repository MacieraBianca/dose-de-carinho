import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import { MedicineProvider } from '../context/MedicineContext';
import { PatientProvider } from '../context/PatientContext';

import infoIcon from '../assets/icons/house.png';
import menuIcon from '../assets/icons/menu.png';
import userIcon from '../assets/icons/profile-user.png';

// CONFIGURAÇÃO ESSENCIAL: Define como a notificação aparece com o app aberto
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AppLayout() {
  return (
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
              tabBarIcon: ({ color }) => (
                <Image source={infoIcon} style={[styles.tabIcon, { tintColor: color }]} />
              ),
            }}
          />

          <Tabs.Screen
            name="menu"
            options={{
              title: 'Menu',
              tabBarIcon: ({ color }) => (
                <Image source={menuIcon} style={[styles.tabIcon, { tintColor: color }]} />
              ),
            }}
          />

          <Tabs.Screen
            name="usuario"
            options={{
              title: 'Usuário',
              tabBarIcon: ({ color }) => (
                <Image source={userIcon} style={[styles.tabIcon, { tintColor: color }]} />
              ),
            }}
          />

          {/* ✅ ESCONDE A TELA "creditos" DA BARRA DE ABAS */}
          <Tabs.Screen name="creditos" options={{ href: null }} />

          <Tabs.Screen name="addMedicine" options={{ href: null, presentation: 'modal' }} />
          <Tabs.Screen name="removeMedicine" options={{ href: null, presentation: 'modal' }} />
          <Tabs.Screen name="dadosPaciente" options={{ href: null, presentation: 'modal' }} />
          <Tabs.Screen name="editarDadosPaciente" options={{ href: null, presentation: 'modal' }} />
          <Tabs.Screen name="editarCuidados" options={{ href: null, presentation: 'modal' }} />
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
    height: 60,
    paddingBottom: 5,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});