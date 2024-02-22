import React from 'react';
import Ventas from './components/Ventas'; // Asegúrate de que la ruta del archivo Estudiante.js sea correcta
import Header from './components/Header';
import Footer from './components/Footer';
const App = () => {
  return (
    <div>
      <Header/>
      <br>
      </br>
      <Ventas/>
      <br>
      </br> 
      <Footer/>
    </div>
  );
};

export default App;
