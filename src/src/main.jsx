import React from 'react'; // Importa a biblioteca React
import ReactDOM from 'react-dom/client'; // Importa ReactDOM para renderização no cliente
import App from './App.jsx'; // Importa o componente principal da aplicação
import './index.css'; // Importa os estilos CSS para o documento

// Renderiza o componente principal da aplicação no DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Habilita o modo rigoroso de React */}
    <App /> {/* Renderiza o componente App */}
  </React.StrictMode>,
);
