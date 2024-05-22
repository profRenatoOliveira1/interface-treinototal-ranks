import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CadastroAparelho from './pages/Aparelho/AparelhoCadastro';
import ListarAparelho from './pages/Aparelho/AparelhoListagem';
import CadastroExercicio from './pages/Exercicio/ExercicioCadastro';
import ListarExercicio from './pages/Exercicio/ExercicioListagem';
import CadastroAluno from './pages/Aluno/AlunoCadastro';
import ListarAluno from './pages/Aluno/AlunoListagem';
import CadastroProfessor from './pages/Professor/ProfessorCadastro';
import ListarProfessor from './pages/Professor/ProfessorListagem';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Cadastro/Aluno" element={<CadastroAluno />} />
                <Route path="/Listagem/Aluno" element={<ListarAluno />} />
                <Route path="/Cadastro/Professor" element={<CadastroProfessor />} />
                <Route path="/Listagem/Professor" element={<ListarProfessor />} /> 
                <Route path="/Cadastro/Exercicio" element={<CadastroExercicio />} />
                <Route path="/Listagem/Exercicio" element={<ListarExercicio />} />
                <Route path="/Cadastro/Aparelho" element={<CadastroAparelho />} />
                <Route path="/Listagem/Aparelho" element={<ListarAparelho />} /> 

            </Routes>
        </BrowserRouter>
    );
}