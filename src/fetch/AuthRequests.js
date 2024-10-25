class AuthRequests {
    /**
     * Inicializa a URL do servidor e a rota de login.
     */
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL; // Obtém a URL base do servidor a partir das variáveis de ambiente
        this.routeLogin = '/login'; // Rota para autenticação de login
    }

    /**
     * Método assíncrono para realizar o login.
     * @param {object} login - O objeto contendo as informações de login.
     * @returns {Promise<object>} Os dados recebidos após o login em formato JSON.
     * @throws {Error} Lança um erro se a autenticação falhar.
     */
    async login(login) {
        try {
            // Realiza uma requisição POST para autenticar o usuário
            const response = await fetch(`${this.serverUrl}${this.routeLogin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
                },
                body: JSON.stringify(login) // Converte o objeto login para uma string JSON
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                console.log('Erro na autenticação'); // Log de erro para autenticação
                throw new Error('Falha no login'); // Lança um erro se a autenticação falhar
            }

            // Converte a resposta para JSON
            const data = await response.json();
            console.log('Login bem-sucedido, dados recebidos:', data); // Log de dados recebidos após o login

            // Verifica se a autenticação foi bem-sucedida
            if (data.auth) {
                console.log('Chamando persistToken com:', data.token, data.professor.nome); // Log para persistir o token
                this.persistToken(data.token, data.professor.nome, data.auth); // Persiste o token, nome do professor e status de autenticação
            }

            return data; // Retorna os dados recebidos após o login
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
            throw error; // Relança o erro para ser tratado em outro lugar
        }
    }

    /**
     * Método para persistir o token de autenticação no localStorage.
     * @param {string} token - O token de autenticação a ser armazenado.
     * @param {string} username - O nome de usuário a ser armazenado.
     * @param {boolean} isAuth - O status de autenticação a ser armazenado.
     */
    persistToken(token, username, isAuth) {
        localStorage.setItem('token', token); // Armazena o token
        localStorage.setItem('username', username); // Armazena o nome de usuário
        localStorage.setItem('isAuth', isAuth); // Armazena o status de autenticação
    }

    /**
     * Método para remover o token de autenticação do localStorage.
     */
    removeToken() {
        localStorage.removeItem('token'); // Remove o token
        localStorage.removeItem('username'); // Remove o nome de usuário
        localStorage.removeItem('isAuth'); // Remove o status de autenticação
        window.location.href = '/'; // Redireciona para a página inicial
    }

    /**
     * Método para verificar a expiração do token.
     * @returns {boolean} Verdadeiro se o token ainda for válido, falso caso contrário.
     */
    checkTokenExpiry() {
        const token = localStorage.getItem('token'); // Obtém o token do localStorage
        if (token) {
            // Decodifica o payload do token JWT
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp; // Obtém a data de expiração do token
            const now = Math.floor(Date.now() / 1000); // Obtém o tempo atual em segundos

            // Verifica se o token expirou
            if (expiry < now) {
                this.removeToken(); // Remove o token se estiver expirado
                return false; // Retorna falso se o token expirou
            }
            return true; // Retorna verdadeiro se o token ainda for válido
        }
        return false; // Retorna falso se não houver token
    }
}

// Exporta uma instância da classe AuthRequests para ser utilizada em outras partes do código
export default new AuthRequests();
