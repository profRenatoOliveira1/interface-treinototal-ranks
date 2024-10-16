import React, { useState, useEffect } from 'react'; // Importa React e os hooks useState e useEffect
import Container from 'react-bootstrap/Container'; // Importa o componente Container do Bootstrap
import Nav from 'react-bootstrap/Nav'; // Importa o componente Nav do Bootstrap
import Navbar from 'react-bootstrap/Navbar'; // Importa o componente Navbar do Bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown'; // Importa o componente NavDropdown do Bootstrap
import Button from 'react-bootstrap/Button'; // Importa o componente Button do Bootstrap
import styles from './Navegacao.module.css'; // Importa os estilos CSS específicos do componente
import imagemLogo from '../../assets/imgLogoProSaude.png'; // Importa a imagem do logo
import AuthRequests from '../../fetch/AuthRequests'; // Importa funções relacionadas à autenticação
import { MdLogout } from "react-icons/md"; // Importa o ícone de logout do pacote react-icons

/**
 * Componente Navegacao
 * 
 * Este componente renderiza uma barra de navegação responsiva com links
 * e menus baseados na autenticação do usuário. Quando autenticado, o usuário
 * vê opções adicionais e pode fazer logout. Quando não autenticado, é exibido
 * um botão para login.
 * 
 * @function Navegacao
 * @returns {JSX.Element} Componente visual da barra de navegação
 */
function Navegacao() {
    // Estado que define se o usuário está autenticado e armazena o nome do usuário
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    const [vizualizacaoAparelho, setVizualizacaoAparelho] = useState(false);
    const [vizualizacaoAluno, setVizualizacaoAluno] = useState(false);
    const [vizualizacaoExercicio, setVizualizacaoExercicio] = useState(false);
    const [vizualizacaoProfessor, setVizualizacaoProfessor] = useState(false);
    const [vizualizacaoLogin, setVizualizacaoLogin] = useState(false);

    /**
     * useEffect que é executado ao carregar o componente.
     * Verifica se o token de autenticação existe e se ainda está válido,
     * atualizando o estado do componente com base nisso.
     */
    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtém o token do localStorage
        const storedUsername = localStorage.getItem('username'); // Obtém o nome de usuário do localStorage
        if (token && AuthRequests.checkTokenExpiry()) { // Verifica se o token é válido e ainda não expirou
            setIsAuthenticated(true); // Define o usuário como autenticado
            setUsername(storedUsername); // Armazena o nome de usuário no estado
        } else {
            setIsAuthenticated(false); // Define o usuário como não autenticado
        }
    }, []);

    /**
     * Função para redirecionar o usuário para a página de login.
     */
    const handleLogin = () => {
        window.location.href = '/login'; // Redireciona para a página de login
    };

    /**
     * Função para realizar o logout do usuário, removendo o token de autenticação
     * e redirecionando para a página inicial.
     */
    const handleLogout = () => {
        AuthRequests.removeToken(); // Remove o token do localStorage
        setIsAuthenticated(false); // Atualiza o estado para não autenticado
        window.location.href = '/'; // Redireciona para a página inicial
    };

    return (
        <Navbar collapseOnSelect expand="lg" className={styles.CtnNavbar}> {/* Barra de navegação com colapso em telas pequenas */}
            <Container>
                {/* Logo da aplicação, redirecionando para o Instagram */}
                <Navbar.Brand href="https://www.instagram.com/dev.rank.s" target="_blank" className={styles.logoAtividade}>
                    <img src={imagemLogo} alt="Logo" className={styles.logoImage} style={{ justifyContent: 'start' }} /> {/* Imagem do logo */}
                </Navbar.Brand>
                {/* Botão para expandir a barra de navegação em telas menores */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ backgroundColor: '#ffeba7' }} />
                {/* Itens da barra de navegação que serão exibidos ou escondidos com base no tamanho da tela */}
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/" className={styles.navbar}>Home</Nav.Link> {/* Link para a página inicial */}
                        {isAuthenticated ? (
                            <>
                                {/* Links e menus exibidos apenas quando o usuário está autenticado */}
                                <Nav.Link href="/imc" className={styles.navbar}>IMC</Nav.Link>
                                <NavDropdown
                                    title="Aluno"
                                    id="collapsible-nav-dropdown"
                                    className={styles.navbar}
                                    show={vizualizacaoAluno}
                                    onMouseEnter={() => setVizualizacaoAluno(true)}
                                    onMouseLeave={() => setVizualizacaoAluno(false)}
                                >
                                    <NavDropdown.Item href="/Cadastro/Aluno" className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href="/Listagem/Aluno" className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown
                                    title="Professor"
                                    id="collapsible-nav-dropdown"
                                    className={styles.navbar}
                                    show={vizualizacaoProfessor}
                                    onMouseEnter={() => setVizualizacaoProfessor(true)}
                                    onMouseLeave={() => setVizualizacaoProfessor(false)}
                                >
                                    <NavDropdown.Item href="/Cadastro/Professor" className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href="/Listagem/Professor" className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown
                                    title="Exercício"
                                    id="collapsible-nav-dropdown"
                                    className={styles.navbar}
                                    show={vizualizacaoExercicio}
                                    onMouseEnter={() => setVizualizacaoExercicio(true)}
                                    onMouseLeave={() => setVizualizacaoExercicio(false)}
                                >
                                    <NavDropdown.Item href="/Cadastro/Exercicio" className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href="/Listagem/Exercicio" className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown
                                    title="Aparelho"
                                    id="collapsible-nav-dropdown"
                                    className={styles.navbar}
                                    show={vizualizacaoAparelho}
                                    onMouseEnter={() => setVizualizacaoAparelho(true)}
                                    onMouseLeave={() => setVizualizacaoAparelho(false)}
                                >
                                    <NavDropdown.Item href="/Cadastro/Aparelho" className={styles.navDropdown}>Cadastro</NavDropdown.Item>
                                    <NavDropdown.Item href="/Listagem/Aparelho" className={styles.navDropdown}>Listagem</NavDropdown.Item>
                                </NavDropdown>
                                
                                {/* Menu dropdown para o usuário autenticado com opção de atualizar senha e fazer logout */}
                                <NavDropdown title={`Olá ${username.split(' ')[0]}`} id="collapsible-nav-dropdown" className={styles.navbar}
                                show={vizualizacaoLogin}
                                onMouseEnter={() => setVizualizacaoLogin(true)}
                                onMouseLeave={() => setVizualizacaoLogin(false)}
                                >
                                    <NavDropdown.Item onClick={handleLogout} className={styles.navDropdown}>
                                        <MdLogout /> Sair
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            // Botão de login exibido quando o usuário não está autenticado
                            <Button onClick={handleLogin} className={styles.loginbutton} variant="primary">Login</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

// Exporta o componente Navegacao para uso em outros arquivos
export default Navegacao;
