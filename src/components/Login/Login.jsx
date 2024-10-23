import AuthRequests from "../../fetch/AuthRequests"; // Importa a função de autenticação
import { useState } from 'react'; // Importa o hook useState do React
import styles from '../styles/StyleLogin.module.css'; // Importa o arquivo CSS para estilos do componente

/**
 * Componente de Login.
 * 
 * Este componente permite ao usuário inserir suas credenciais de login (email e senha)
 * e autenticar-se na aplicação. Ele lida com a validação dos dados e exibe mensagens de erro,
 * caso a autenticação falhe.
 * 
 * @function Login
 * @returns {JSX.Element} O componente do formulário de login.
 */
function Login() {
    
    /**
     * Estado que armazena os dados do formulário de login.
     * 
     * @typedef {Object} formLogin
     * @property {string} email - O endereço de email inserido pelo usuário.
     * @property {string} password - A senha inserida pelo usuário.
     */
    const [formLogin, setFormLogin] = useState({
        email: '',  // Inicializa o email como uma string vazia
        password: '' // Inicializa a senha como uma string vazia
    });

    /**
     * Estado que armazena mensagens de erro para exibição ao usuário.
     * 
     * @typedef {string} errorMessage
     */
    const [errorMessage, setErrorMessage] = useState(''); // Inicializa sem mensagem de erro

    /**
     * Função para lidar com mudanças nos campos de input do formulário.
     * Atualiza o estado de `formLogin` conforme o usuário digita.
     * 
     * @param {Object} e - O evento de mudança (onChange) do input.
     */
    const handleChange = (e) => {
        const { name, value } = e.target; // Extrai o nome e valor do input que disparou o evento
        // Atualiza o estado `formLogin` mantendo os campos anteriores e alterando o campo correspondente
        setFormLogin(prevState => ({
            ...prevState, // Copia o estado anterior
            [name]: value // Atualiza o campo que está sendo modificado
        }));
    };

    /**
     * Função para lidar com o envio do formulário.
     * Impede o comportamento padrão de recarregar a página e tenta autenticar o usuário.
     * 
     * @param {Object} e - O evento de envio (onSubmit) do formulário.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o comportamento padrão do envio do formulário
        try {
            // Faz a requisição de login com os dados do formulário
            const response = await AuthRequests.login(formLogin);
            // Verifica se a autenticação foi bem-sucedida
            if (response.auth) {
                // Se a autenticação for bem-sucedida, persiste o token após um pequeno delay
                setTimeout(() => {
                    AuthRequests.persistToken(response.token); // Armazena o token
                }, 1000);
                // Redireciona o usuário para a página inicial após o login
                window.location.href = '/';
            } else {
                // Se a autenticação falhar, define uma mensagem de erro
                setErrorMessage('Autenticação falhou. Por favor, verifique suas credenciais.');
            }
        } catch (error) {
            // Caso ocorra um erro durante o processo de autenticação, exibe uma mensagem de erro genérica
            console.error('Erro ao tentar realizar login:', error);
            setErrorMessage('Usuário e/ou senha incorretos. Tente novamente.');
        }
    };

    return (
        <div className={styles.containerLogin}> {/* Container principal para o formulário de login */}
            <form className={styles.formLogin} onSubmit={handleSubmit}> {/* Formulário com evento de envio */}
                <h1 className={styles.h1}>Login</h1> {/* Título do formulário */}
                <div className={styles.divConteiner}> {/* Container para o campo de email */}
                    <p className={styles.p}>Email</p>
                    <input
                        type="text" // Campo de texto para o email
                        className={styles.inpuLogin} // Classe CSS para estilizar o input
                        placeholder="E-mail" // Placeholder do campo
                        value={formLogin.email} // Vincula o valor do campo ao estado `formLogin.email`
                        onChange={handleChange} // Chama `handleChange` ao modificar o valor
                        name="email" // Define o nome do input como "email"
                    />
                </div>
                <div className={styles.divConteiner}> {/* Container para o campo de senha */}
                    <p className={styles.p} style={{ margin: '-1%' }}>Senha</p>
                    <input
                        type="password" // Campo de senha
                        className={styles.inpuLogin} // Classe CSS para estilizar o input
                        placeholder="Senha" // Placeholder do campo
                        value={formLogin.password} // Vincula o valor do campo ao estado `formLogin.password`
                        onChange={handleChange} // Chama `handleChange` ao modificar o valor
                        name="password" // Define o nome do input como "password"
                    />
                </div>
                <button className={styles.buttonLogin} type="submit"> {/* Botão para enviar o formulário */}
                    Login
                </button>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} {/* Exibe mensagem de erro se houver */}
            </form>
        </div>
    );
}

// Exporta o componente Login
export default Login;
