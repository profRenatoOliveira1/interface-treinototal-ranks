class AparelhoRequests {
    /**
     * Inicializa as rotas e o URL do servidor.
     */
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL; // Obtém a URL base do servidor a partir das variáveis de ambiente
        this.routeListarAparelho = '/listar/aparelho'; // Rota para listar aparelhos
        this.routeCadastrarAparelho = '/novo/aparelho'; // Rota para cadastrar um novo aparelho
        this.routeDeletarAparelho = '/remover/aparelho'; // Rota para remover um aparelho
        this.routeUpdateAparelho = '/update/aparelho'; // Rota para atualizar os dados de um aparelho
    }

    /**
     * Método para obter o token de autenticação armazenado no localStorage.
     * @returns {string|null} O token de autenticação, ou null se não estiver presente.
     */
    getAuthToken() {
        return localStorage.getItem('token');
    }

    /**
     * Método assíncrono para listar aparelhos.
     * @returns {Promise<object|null>} A lista de aparelhos em formato JSON ou null em caso de erro.
     */
    async listarAparelho() {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição GET para obter a lista de aparelhos
            const response = await fetch(`${this.serverUrl}${this.routeListarAparelho}`, {
                headers: {
                    'x-access-token': `${token}` // Adiciona o token ao cabeçalho da requisição
                }
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao buscar aparelhos');
            }

            // Converte a resposta para JSON e a retorna
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
            return null; // Retorna null em caso de erro
        }
    }

    /**
     * Método assíncrono para cadastrar um aparelho.
     * @param {object} aparelho - O objeto contendo as informações do aparelho a ser cadastrado.
     * @returns {Promise<object|null>} Os dados do aparelho cadastrado em formato JSON ou null em caso de erro.
     */
    async cadastrarAparelho(aparelho) {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição POST para cadastrar um aparelho
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarAparelho}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                    'x-access-token': `${token}` // Adiciona o token ao cabeçalho da requisição
                },
                body: JSON.stringify(aparelho) // Converte o objeto aparelho para uma string JSON
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao cadastrar aparelho');
            }

            // Retorna os dados do aparelho cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
            return null; // Retorna null em caso de erro
        }
    }

    /**
     * Método assíncrono para deletar um aparelho.
     * @param {string} idAparelho - O ID do aparelho a ser removido.
     * @returns {Promise<boolean>} Verdadeiro se a deleção for bem-sucedida, falso em caso de erro.
     */
    async deletarAparelho(idAparelho) {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição DELETE para remover um aparelho
            const response = await fetch(`${this.serverUrl}${this.routeDeletarAparelho}?idAparelho=${idAparelho}`, {
                method: 'DELETE', // Informa o verbo a ser acessado
                headers: {
                    'x-access-token': `${token}` // Adiciona o token ao cabeçalho da requisição
                }
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao deletar aparelho');
            }

            return true; // Retorna verdadeiro se a deleção for bem-sucedida
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
            return false; // Retorna falso em caso de erro
        }
    }

    /**
     * Método assíncrono para atualizar os dados de um aparelho.
     * @param {object} aparelho - Objeto com as informações do aparelho.
     * @returns {Promise<boolean|null>} Verdadeiro se a atualização for bem-sucedida, nulo em caso de erro.
     */
    async atualizarAparelho(aparelho) {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição PUT para atualizar os dados de um aparelho
            const response = await fetch(`${this.serverUrl}${this.routeUpdateAparelho}?idAparelho=${aparelho.id_aparelho}`, {
                method: 'PUT', // Informa o verbo a ser acessado
                headers: {
                    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                    'x-access-token': `${token}` // Adiciona o token ao cabeçalho da requisição
                },
                body: JSON.stringify(aparelho) // Converte o objeto aparelho para uma string JSON
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }

            return true; // Retorna verdadeiro se a atualização for bem-sucedida
        } catch (error) {
            // Em caso de erro, exibe o erro no console e um alerta para o usuário
            console.error('Erro: ', error);
            window.alert('Erro ao atualizar aparelho');
            return null; // Retorna nulo se houve erro
        }
    }
}

// Exporta uma instância da classe AparelhoRequests para ser utilizada em outras partes do código
export default new AparelhoRequests();
