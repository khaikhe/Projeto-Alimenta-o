







//RESPONSAVEL PELA SEPARAÇÃO DAS ABAS E LINKS!!

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Login from "./login/login"; 
import Registro from "./registro/registro"; 
import Usuario from './usuario/logusuario';
import Recuperacao from './recuperacao/recUsuario';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Registro />} /> 
      <Route path="login" element={<Login />} /> 
      <Route path="usuario" element={<Usuario />}/>
      <Route path="recuperacao" element={<Recuperacao />}/>
    </Routes>
  </BrowserRouter>
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
