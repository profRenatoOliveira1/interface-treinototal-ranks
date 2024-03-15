import './App.css'
import comecarAgora from './pages/comercarAgora/comecarAgora';
import Perfil from './pages/Perfil/Perfil';
import Treinos from './pages/Treinos/Treinos'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { BrowserRouter as Roteador, Routes, Route } from 'react-router-dom'


function App() {


  return (
    <>
      <Roteador>
        <Routes>

          <Route exact path='/' Component={Home} />
          <Route exact path='/ComecarAgora' Component={comecarAgora} />
          <Route exact path='/Treinos' Component={Treinos} />
          <Route exact path='/Perfil' Component={Perfil} />
          <Route exact path='/Login' Component={Login} />

        </Routes>
      </Roteador>
    </>
  );
}

export default App