import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Imc from './pages/imc/imc';
import Login from './pages/Login/Login';

import CadastroAluno from './pages/Aluno/AlunoCadastro';
import ListarAluno from './pages/Aluno/AlunoListagem';
import AtualizarAluno from './pages/Update/UpdateAluno';
import CardAluno from './pages/Aluno/AlunoCard';

import CadastroProfessor from './pages/Professor/ProfessorCadastro';
import ListarProfessor from './pages/Professor/ProfessorListagem';
import AtualizarProfessor from './pages/Update/UpdateProfessor';
import CardProfessor from './pages/Professor/ProfessorCard';

import CadastroExercicio from './pages/Exercicio/ExercicioCadastro';
import ListarExercicio from './pages/Exercicio/ExercicioListagem';
import AtualizarExercicio from './pages/Update/UpdateExercicio';

import CadastroAparelho from './pages/Aparelho/AparelhoCadastro';
import ListarAparelho from './pages/Aparelho/AparelhoListagem';
import AtualizarAparelho from './pages/Update/UpdateAparelho';

import ProtectedRoute from './components/Rotas/ProtectedRoutes';
import CadastroTreino from './pages/Treino/CriarTreino/CriarTreino';
import ListarTreino from './pages/Treino/FichaTreino/FichaTreino';

import { SERVER_ROUTES } from './appconfig';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* SERVER_ROUTES principais - acessíveis a todos */}
                <Route path={SERVER_ROUTES.HOME} element={<Home />} />
                <Route path={SERVER_ROUTES.IMC} element={<Imc />} />
                <Route path={SERVER_ROUTES.LOGIN} element={<Login />} />

                {/* SERVER_ROUTES protegidas - acessíveis apenas a professores */}
                <Route path={SERVER_ROUTES.CADASTRO_ALUNO} element={<ProtectedRoute element={CadastroAluno} />} />
                <Route path={SERVER_ROUTES.LISTAGEM_ALUNO} element={<ProtectedRoute element={ListarAluno} />} />
                <Route path={SERVER_ROUTES.ATUALIZAR_ALUNO} element={<ProtectedRoute element={AtualizarAluno} />} />
                <Route path={SERVER_ROUTES.CARD_ALUNO} element={<ProtectedRoute element={CardAluno} />} />

                <Route path={SERVER_ROUTES.CADASTRO_PROFESSOR} element={<ProtectedRoute element={CadastroProfessor} />} />
                <Route path={SERVER_ROUTES.LISTAGEM_PROFESSOR} element={<ProtectedRoute element={ListarProfessor} />} />
                <Route path={SERVER_ROUTES.ATUALIZAR_PROFESSOR} element={<ProtectedRoute element={AtualizarProfessor} />} />
                <Route path={SERVER_ROUTES.CARD_PROFESSOR} element={<ProtectedRoute element={CardProfessor} />} />

                <Route path={SERVER_ROUTES.CADASTRO_EXERCICIO} element={<ProtectedRoute element={CadastroExercicio} />} />
                <Route path={SERVER_ROUTES.LISTAGEM_EXERCICIO} element={<ProtectedRoute element={ListarExercicio} />} />
                <Route path={SERVER_ROUTES.ATUALIZAR_EXERCICIO} element={<ProtectedRoute element={AtualizarExercicio} />} />

                <Route path={SERVER_ROUTES.CADASTRO_APARELHO} element={<ProtectedRoute element={CadastroAparelho} />} />
                <Route path={SERVER_ROUTES.LISTAGEM_APARELHO} element={<ProtectedRoute element={ListarAparelho} />} />
                <Route path={SERVER_ROUTES.ATUALIZAR_APARELHO} element={<ProtectedRoute element={AtualizarAparelho} />} />

                <Route path={SERVER_ROUTES.CADASTRO_TREINO} element={<ProtectedRoute element={CadastroTreino} />} />
                <Route path={SERVER_ROUTES.LISTAGEM_TREINO} element={<ProtectedRoute element={ListarTreino} />} />

                {/* Página de acesso negado */}
                <Route path={SERVER_ROUTES.NAO_AUTORIZADO} element={<h1>Acesso negado</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
