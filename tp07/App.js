import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Home } from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import MainStack from './components/navigation/MainStack';
import { ContextProvider } from './components/navigation/contextState';

export default function App() {
  return (
    <ContextProvider>
    <SafeAreaView style= {{ flex: 1 }}>
        <MainStack />
      </SafeAreaView>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
