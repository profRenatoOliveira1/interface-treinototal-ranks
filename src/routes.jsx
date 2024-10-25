import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa componentes do React Router

// Componentes
import Home from './pages/Home/Home'; // Importa o componente Home
import Imc from './pages/imc/imc'; // Importa o componente ListarProfessor
import Login from './pages/Login/Login'; // Importa o componente UpadateAluno
import ProtectedRoutes from './components/Rotas/ProtectedRoutes'; // componente responsável pela proteção das rotas

// Aluno
import CadastroAluno from './pages/Aluno/AlunoCadastro'; // Importa o componente CadastroAluno
import ListarAluno from './pages/Aluno/AlunoListagem'; // Importa o componente ListarAluno
import UpdateAluno from './pages/Update/UpdateAluno'; // Importa o componente UpadateAluno
import CardAluno from './pages/Aluno/AlunoCard'; // Importa o componente AlunoCard

// Aparelho
import CadastroAparelho from './pages/Aparelho/AparelhoCadastro'; // Importa o componente CadastroAparelho
import ListarAparelho from './pages/Aparelho/AparelhoListagem'; // Importa o componente ListarAparelho
import UpdateAparelho from './pages/Update/UpdateAparelho'; // Importa o componente UpadateApareho

// Exercício
import CadastroExercicio from './pages/Exercicio/ExercicioCadastro'; // Importa o componente CadastroExercicio
import ListarExercicio from './pages/Exercicio/ExercicioListagem'; // Importa o componente ListarExercicio
import UpdateExercicio from './pages/Update/UpdateExercicio'; // Importa o componente UpadateExercicio

//Professor
import CadastroProfessor from './pages/Professor/ProfessorCadastro'; // Importa o componente CadastroProfessor
import ListarProfessor from './pages/Professor/ProfessorListagem'; // Importa o componente ListarProfessor
import UpdateProfessor from './pages/Update/UpdateProfessor'; // Importa o componente UpadateProfessor
import CardProfessor from './pages/Professor/ProfessorCard'; // Importa o componente CardProfessor
import ProfessorAtualizarSenha from './pages/Professor/ProfessorAtulizarSenha'; // Importa o componente AtualizarSenha

// Componente de roteamento da aplicação
export default function AppRouter() {
    return (
        <BrowserRouter> {/* Componente de navegação de rotas */}
            <Routes> {/* Componente de rotas */}

                {/* Componentes */}
                <Route path="/" element={<Home />} /> {/* Rota para a página inicial */}
                <Route path="/Imc" element={<Imc />} /> {/* Rota para o cálculo de imc */}
                <Route path="/Login" element={<Login />} /> {/* Rota para realizar o login do usuário */}
                {/* Aluno */}
                <Route path="/Cadastro/Aluno" element={<ProtectedRoutes element={CadastroAluno} />} /> {/* Rota para o cadastro de aluno */}
                <Route path="/Listagem/Aluno" element={<ProtectedRoutes element={ListarAluno} />} /> {/* Rota para listagem de alunos */}
                <Route path="/Update/Aluno" element={<ProtectedRoutes element={UpdateAluno} />} /> {/* Rota para Atualizar Aluno */}
                <Route path="/Card/Aluno" element={<ProtectedRoutes element={CardAluno} />} /> {/* Rota para listar aparelhos */}

                {/* Aparelho */}
                <Route path="/Cadastro/Aparelho" element={<ProtectedRoutes element={CadastroAparelho} />} /> {/* Rota para o cadastro de aparelho */}
                <Route path="/Listagem/Aparelho" element={<ProtectedRoutes element={ListarAparelho} />} /> {/* Rota para listagem de  aparelhos */}
                <Route path="/Update/Aparelho" element={<ProtectedRoutes element={UpdateAparelho} />} /> {/* Rota para Atualizar o Aparelho */}

                {/* Exercício */}
                <Route path="/Cadastro/Exercicio" element={<ProtectedRoutes element={CadastroExercicio} />} /> {/* Rota para o cadastro de exercício */}
                <Route path="/Listagem/Exercicio" element={<ProtectedRoutes element={ListarExercicio} />} /> {/* Rota para listagem de exercícios */}
                <Route path="/Update/Exericio" element={<ProtectedRoutes element={UpdateExercicio} />} /> {/* Rota para  Atualizar o Exercício */}

                {/* Professor */}
                <Route path="/Cadastro/Professor" element={<ProtectedRoutes element={CadastroProfessor} />} /> {/* Rota para o cadastro de professor */}
                <Route path="/Listagem/Professor" element={<ProtectedRoutes element={ListarProfessor} />} /> {/* Rota para listagem de professores */}
                <Route path="/Update/Professor" element={<ProtectedRoutes element={UpdateProfessor} />} /> {/* Rota para Atualizar o Professor */}
                <Route path="/Card/Professor" element={<ProtectedRoutes element={CardProfessor} />} /> {/* Rota para Card Professor */}
                <Route path="/Atualizar/Senha/Professor" element={<ProtectedRoutes element={ProfessorAtualizarSenha} />} /> {/* Rota para o Professor Atualizar a Senha */}

            </Routes>
        </BrowserRouter>
    );
}   
