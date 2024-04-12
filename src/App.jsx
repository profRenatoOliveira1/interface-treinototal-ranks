import './App.css'
import Aparelho from './pages/Aparelho/Aparelho';
import Treinos from './pages/Treinos/Treinos';
import Home from './pages/Home/Home';
import Academia from './pages/Academia/Academia';
import Login from './pages/Login/Login';
import { BrowserRouter as Roteador, Routes, Route } from 'react-router-dom';
import Professor from './pages/Professor/Professor';

function App() {


  return (
    <>
      <Roteador>
        <Routes>

          <Route exact path='/' Component={Home} />
          <Route exact path='/Treinos' Component={Treinos} />
          <Route exact path='/Aparelho' Component={Aparelho} />
          <Route exact path='/Login' Component={Login} />
          <Route exact path='/Academia' Component={Academia} />
          <Route exact path='/Professor' Component={Professor} />


        </Routes>
      </Roteador>
    </>
  );
}

export default App