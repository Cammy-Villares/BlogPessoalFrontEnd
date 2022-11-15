import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './paginas/home/Home';
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer';
import Login from './paginas/login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import ListaTemas from './components/temas/listatema/ListaTema';
import ListaPostagem from './components/postagens/listapostagem/ListaPostagem';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import CadastroPostagem from './components/postagens/cadastroPost/CadastroPost';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import {Provider} from 'react-redux';
import store from './store/store';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
      <Navbar />
      <div style={{minHeight: '74.2vh'}}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/home" element={<Home />} />
          <Route path="/temas" element={<ListaTemas />} />
          <Route path="/posts" element={<ListaPostagem />} />
          <Route path='cadastroTema' element={<CadastroTema />} />
          <Route path='editarTema/:id' element={<CadastroTema />} />
          <Route path='apagarTema/:id' element={<DeletarTema />} />
          <Route path='cadastroPost' element={<CadastroPostagem />} />
          <Route path='editarPostagem/:id' element={<CadastroPostagem />} />
          <Route path='deletarPostagem/:id' element={<DeletarPostagem />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;