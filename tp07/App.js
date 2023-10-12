import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path='/informacion' element={<Informacion />} ></Route>
              <Route path='/login' element={<Login />} ></Route>
              <Route path='*' element={<h1>Not Found</h1>} ></Route>
            </Route>
          </Routes> <br></br>
      </div>
    </BrowserRouter>
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
