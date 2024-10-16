import './App.css';
// Importa o arquivo CSS para estilizar o componente
import AppRouter from './routes';
// Importa o componente de roteamento AppRouter do arquivo routes.js

function App() {
  // Define um componente funcional chamado App.
  return (
    <>
      <AppRouter /> {/* Renderiza o componente de roteamento */}
    </>
  );
}

// Exporta o componente App como padrão
export default App;
