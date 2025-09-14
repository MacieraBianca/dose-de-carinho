// app/_layout.js
import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';
import { MedicineProvider } from '../context/MedicineContext';

import infoIcon from '../assets/icons/information.png';
import menuIcon from '../assets/icons/menu-bar.png';
import userIcon from '../assets/icons/profile-user.png';

export default function AppLayout() {
  return (
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
          name="usuario"
          options={{
            title: 'Usuário',
            tabBarIcon: ({ color }) => <Image source={userIcon} style={[styles.tabIcon, { tintColor: color }]} />,
          }}
        />
        {/* Telas que abrem como modal não aparecem na tab bar */}
        <Tabs.Screen name="addMedicine" options={{ href: null, presentation: 'modal' }} />
        <Tabs.Screen name="removeMedicine" options={{ href: null, presentation: 'modal' }} />
      </Tabs>
    </MedicineProvider>
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