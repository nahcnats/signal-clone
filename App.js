import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen, { registerScreenOptions } from './screens/RegisterScreen';
import HomeScreen, { homeScreenOptions } from './screens/HomeScreen';
import AddChatScreen, { addChatScreenOptions } from './screens/AddChatScreen';
import ChatScreen, { chatScreenOptions } from './screens/ChatScreen';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2C6BED' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white'
}

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={globalScreenOptions}
      initialRouteName='Login'
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={registerScreenOptions}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <Stack.Screen
        name="AddChat"
        component={AddChatScreen}
        options={addChatScreenOptions}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={chatScreenOptions}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <LoginStack />
    </NavigationContainer>
  );
}
