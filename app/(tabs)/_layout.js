import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { UserProvider } from './context/user.context';

export default function TabLayout() {

  
  return (
    <UserProvider>
      <Tabs screenOptions={{headerShown: false, tabBarActiveTintColor:'#00B2FF',tabBarShowLabel: false,tabBarStyle: { 
        backgroundColor: '#1E1E1E',
        height: 65,
        borderTopWidth: 0,
        borderRadius: 100,
        position: 'absolute',
        bottom: 20,
        left: 30,
        right: 30,
        elevation: 0,
        paddingBottom: 0
        }}}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={28}
              style={{ marginBottom: -3 }}
              name="home-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{

          tabBarIcon: ({ color }) => (
            <Ionicons
              size={28}
              style={{ marginBottom: -3 }}
              name="flame-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{

          tabBarIcon: ({ color }) => (
            <Ionicons
              size={28}
              style={{ marginBottom: -3 }}
              name="person-outline"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  </UserProvider>
  );
}
