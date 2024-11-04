import { SERVER_ROUTES } from "../appconfig";

/**
 * Classe para lidar com autenticação
 */
class AuthRequests {
    
    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        // endereço do servidor
        this.serverUrl = import.meta.env.VITE_API_URL;
        // rota do servidor
        this.routeLogin = SERVER_ROUTES.LOGIN;
    }

    /**
     * Realiza a autenticação no servidor
     * @param {*} login - email e senha
     * @returns **true** caso sucesso, **false** caso erro
     */
    async login(login) {    
        try {
            // faz a requisição POST ao servidor
            const response = await fetch(`${this.serverUrl}${this.routeLogin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // passando as informações de login no corpo da requisição
                body: JSON.stringify(login)
            });
            
            // Verifica alguma falha na comunicação
            if (!response.ok) {
                console.error('Erro na autenticação: ', response.statusText);
                throw new Error('Falha no login');
            }
            // caso a requisição seja bem sucedida, armazena a resposta em uma constante
            const data = await response.json();
            console.log(data);

            // verifica se o atributo auth da resposta tem o valor TRUE, se tiver é porque a autenticação teve sucesso
            if (data.auth) {
                // persistem o token, o nome e o id do usuário no localStorage
                this.persistToken(data.token, data.professor.nome, data.professor.email, data.auth);
            }

            // retorna a resposta da requisição a quem chamou a função
            return true;
        } catch (error) {
            // lança um erro em caso de falha
            console.error('Erro: ', error);
            return false;
        }
    }

    /**
     * Persiste o token no localStorage
     * @param {*} token - token recebido do servidor
     * @param {*} email - nome usuário recebido do servidor
     * @param {*} idProfessor - idUsuario recebido do servidor
     */
    persistToken(token, nome, idProfessor, isAuth) {
        // adiciona o token no localStorage com o apelido de token
        localStorage.setItem('token', token);  // -> armazena o token no localStorage e coloca o 'apelido' de token
        // adiciona o nome de usuário no localStorage com o apelido de username
        localStorage.setItem('username', nome);  // -> armazena o username no localStorage e coloca o 'apelido' de username 
        // adiciona o id do usuário no localStorage com o apelido de idUsuario
        localStorage.setItem('idProfessor', idProfessor);  // -> armazena o idUsuario no localStorage e coloca o 'apelido' de idUsuario
        // adiciona o valor de autenticação no localStorage com o apelido de isAuth
        localStorage.setItem('isAuth', isAuth);  // -> armazena o estado da autenticação (true, false) no localStorage e coloca o 'apelido' de isAuth
    }

    /**
     * Remove as informações do localStorage
     */
    removeToken() {
        // remove o token do localStorage
        localStorage.removeItem('token');  // -> remove o 'apelido' de token do localStorage
        // remove o username do localStorage
        localStorage.removeItem('username');  // -> remove o 'apelido' de username do localStorage
        // remove o idUsuario do localStorage
        localStorage.removeItem('idProfessor');  // -> remove o 'apelido' de idUsuario do localStorage
        // remove o isAuth do localStorage
        localStorage.removeItem('isAuth');  // -> remove o 'apelido' de isAuth do localStorage
        // redireciona o usuário para a página de login
        window.location.href = '/login';
    }

    /**
     * Verifica a validade do token
     * @returns **true** caso token válido, **false** caso token inválido
     */
    checkTokenExpiry() {
        // recupera o valor do token no localStorage
        const token = localStorage.getItem('token');
        
        // verifica se o valor é diferente de vazio
        if (token) {
            // recupera a data de expiração do token
            const payload = JSON.parse(atob(token.split('.')[1]));
            // recupera a hora de expiração do token
            const expiry = payload.exp;
            // pega a data e hora atual
            const now = Math.floor(Date.now() / 1000);

            // verifica se o token está expirado
            if (expiry < now) {
                // invoca a função para remover o token do localStorage
                this.removeToken();
                // retorna false
                return false;
            }
            // caso o token não esteja expirado, retorna true
            return true;
        }
        // caso o token esteja vazio, retorna false
        return false;
    }
}

export default new AuthRequests();