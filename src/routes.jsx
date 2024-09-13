import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa componentes do React Router
import Home from './pages/Home/Home'; // Importa o componente Home
import CadastroAparelho from './pages/Aparelho/AparelhoCadastro'; // Importa o componente CadastroAparelho
import ListarAparelho from './pages/Aparelho/AparelhoListagem'; // Importa o componente ListarAparelho
import CadastroExercicio from './pages/Exercicio/ExercicioCadastro'; // Importa o componente CadastroExercicio
import ListarExercicio from './pages/Exercicio/ExercicioListagem'; // Importa o componente ListarExercicio
import CadastroAluno from './pages/Aluno/AlunoCadastro'; // Importa o componente CadastroAluno
import ListarAluno from './pages/Aluno/AlunoListagem'; // Importa o componente ListarAluno
import CadastroProfessor from './pages/Professor/ProfessorCadastro'; // Importa o componente CadastroProfessor
import ListarProfessor from './pages/Professor/ProfessorListagem'; // Importa o componente ListarProfessor
import Imc from './pages/imc/imc'; // Importa o componente ListarProfessor
import UpdateAluno from './pages/Update/UpdateAluno';
import UpdateAparelho from './pages/Update/UpdateAparelho';
import UpdateExercicio from './pages/Update/UpdateExercicio';
import UpdateProfessor from './pages/Update/UpdateProfessor';
import CardAluno from './pages/Aluno/AlunoCard';
import CardProfessor from './pages/Professor/AlunoCard';
import Login from './pages/Login/Login';

// Componente de roteamento da aplicação
export default function AppRouter() {
    return (
        <BrowserRouter> {/* Componente de navegação de rotas */}
            <Routes> {/* Componente de rotas */}
                <Route path="/" element={<Home />} /> {/* Rota para a página inicial */}
                <Route path="/Cadastro/Aluno" element={<CadastroAluno />} /> {/* Rota para o cadastro de aluno */}
                <Route path="/Listagem/Aluno" element={<ListarAluno />} /> {/* Rota para listar alunos */}
                <Route path="/Cadastro/Professor" element={<CadastroProfessor />} /> {/* Rota para o cadastro de professor */}
                <Route path="/Listagem/Professor" element={<ListarProfessor />} /> {/* Rota para listar professores */}
                <Route path="/Cadastro/Exercicio" element={<CadastroExercicio />} /> {/* Rota para o cadastro de exercício */}
                <Route path="/Listagem/Exercicio" element={<ListarExercicio />} /> {/* Rota para listar exercícios */}
                <Route path="/Cadastro/Aparelho" element={<CadastroAparelho />} /> {/* Rota para o cadastro de aparelho */}
                <Route path="/Listagem/Aparelho" element={<ListarAparelho />} /> {/* Rota para listar aparelhos */}
                <Route path="/Imc" element={<Imc />} /> {/* Rota para listar aparelhos */}
                <Route path="/update/aluno" element={<UpdateAluno />} /> {/* Rota para listar aparelhos */}
                <Route path="/update/aparelho" element={<UpdateAparelho />} /> {/* Rota para listar aparelhos */}
                <Route path="/update/exercicio" element={<UpdateExercicio />} /> {/* Rota para listar aparelhos */}
                <Route path="/update/professor" element={<UpdateProfessor />} />
                <Route path="/card/aluno" element={<CardAluno />} />
                <Route path="/card/professor" element={<CardProfessor />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
