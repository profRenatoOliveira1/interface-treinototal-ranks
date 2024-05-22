// Importando estilos do módulo CSS local
import styles from './Navegacao.module.css';

// Importando componentes do React Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Importando a imagem do logo
import imagemLogo from '../../assets/imgLogoProSaude.png';

// Definindo o componente de navegação
function Navegacao() {
    return (
        // Componente Navbar do React Bootstrap, responsivo e expansível
        <Navbar collapseOnSelect expand="lg" className={styles.CtnNavbar}>
            <Container>
                {/* Marca do Navbar com link para a página inicial */}
                <Navbar.Brand href="/" className={styles.logoAtividade}>
                    {/* Inserindo a imagem do logo */}
                    <img src={imagemLogo} alt="Logo" className={styles.logoImage} />
                </Navbar.Brand>
                {/* Botão de toggle para o Navbar em telas menores */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {/* Componente de collapse do Navbar para agrupar links */}
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    {/* Lista de links de navegação */}
                    <Nav>
                        {/* Link para a página inicial */}
                        <Nav.Link href="/" className={styles.logoAtividade}>
                            Home
                        </Nav.Link>
                        {/* Dropdown para a seção Aluno */}
                        <NavDropdown title="Aluno" id="collapsible-nav-dropdown" className={styles.logoAtividade}>
                            {/* Links para as páginas de cadastro e listagem de alunos */}
                            <NavDropdown.Item href="/Cadastro/Aluno" className={styles.logoAtividade}>Cadastro</NavDropdown.Item>
                            <NavDropdown.Item href="/Listagem/Aluno" className={styles.logoAtividade}>Listagem</NavDropdown.Item>
                        </NavDropdown>
                        {/* Dropdown para a seção Professor */}
                        <NavDropdown title="Professor" id="collapsible-nav-dropdown" className={styles.logoAtividade}>
                            {/* Links para as páginas de cadastro e listagem de professores */}
                            <NavDropdown.Item href="/Cadastro/Professor" className={styles.logoAtividade}>Cadastro</NavDropdown.Item>
                            <NavDropdown.Item href="/Listagem/Professor" className={styles.logoAtividade}>Listagem</NavDropdown.Item>
                        </NavDropdown>
                        {/* Dropdown para a seção Exercício */}
                        <NavDropdown title="Exercicio" id="collapsible-nav-dropdown" className={styles.logoAtividade}>
                            {/* Links para as páginas de cadastro e listagem de exercícios */}
                            <NavDropdown.Item href="/Cadastro/Exercicio" className={styles.logoAtividade}>Cadastro</NavDropdown.Item>
                            <NavDropdown.Item href="/Listagem/Exercicio" className={styles.logoAtividade}>Listagem</NavDropdown.Item>
                        </NavDropdown>
                        {/* Dropdown para a seção Aparelho */}
                        <NavDropdown title="Aparelho" id="collapsible-nav-dropdown" className={styles.logoAtividade}>
                            {/* Links para as páginas de cadastro e listagem de aparelhos */}
                            <NavDropdown.Item href="/Cadastro/Aparelho" className={styles.logoAtividade}>Cadastro</NavDropdown.Item>
                            <NavDropdown.Item href="/Listagem/Aparelho" className={styles.logoAtividade}>Listagem</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

// Exporta o componente de navegação para ser utilizado em outras partes do código
export default Navegacao;
