import styles from './Navegacao.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import imagemLogo from '../../assets/imgLogoProSaude.png';

function Navegacao() {
    return (
        <Navbar collapseOnSelect expand="lg" className={styles.CtnNavbar}>
            <Container>
                <Navbar.Brand href="/" className={styles.logoAtividade}>
                    <img src={imagemLogo} alt="Logo" className={styles.logoImage} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/" className={styles.logoAtividade}>
                            Home
                        </Nav.Link>
                        <NavDropdown title="Aluno" id="collapsible-nav-dropdown" className={styles.logoAtividade}>
                            <NavDropdown.Item href="/Cadastro/Aluno" className={styles.logoAtividade}>Cadastro</NavDropdown.Item>
                            <NavDropdown.Item href="/Listagem/Aluno" className={styles.logoAtividade}>Listagem</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Professor"  id="collapsible-nav-dropdown" className={styles.logoAtividade}>
                            <NavDropdown.Item href="/Cadastro/Professor" className={styles.logoAtividade}>Cadastro</NavDropdown.Item>
                            <NavDropdown.Item href="/Listagem/Professor" className={styles.logoAtividade}>Listagem</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Exercicio" id="collapsible-nav-dropdown" className={styles.logoAtividade}>
                            <NavDropdown.Item href="/Cadastro/Exercicio" className={styles.logoAtividade}>Cadastro</NavDropdown.Item>
                            <NavDropdown.Item href="/Listagem/Exercicio" className={styles.logoAtividade}>Listagem</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Aparelho" id="collapsible-nav-dropdown" className={styles.logoAtividade}>
                            <NavDropdown.Item href="/Cadastro/Aparelho" className={styles.logoAtividade}>Cadastro</NavDropdown.Item>
                            <NavDropdown.Item href="/Listagem/Aparelho" className={styles.logoAtividade}>Listagem</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navegacao;
