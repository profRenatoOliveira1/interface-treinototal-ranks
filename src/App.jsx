import './App.css'
import Aparelho from './pages/Aparelho/Aparelho';
import Exercicios from './pages/Treinos/Treinos';
import Home from './pages/Home/Home';
import Academia from './pages/Academia/Academia';
import Aluno from './pages/Login/Login';
import { BrowserRouter as Roteador, Routes, Route } from 'react-router-dom';
import Professor from './pages/Professor/Professor';

function App() {


  return (
    <>
      <Roteador>
        <Routes>

          <Route exact path='/' Component={Home} />
          <Route exact path='/Exercicios' Component={Exercicios} />
          <Route exact path='/Aparelho' Component={Aparelho} />
          <Route exact path='/Aluno' Component={Aluno} />
          <Route exact path='/Academia' Component={Academia} />
          <Route exact path='/Professor' Component={Professor} />


        </Routes>
      </Roteador>
    </>
  );
}

export default App