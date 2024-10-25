class ExerciciosRequests {
    /**
     * Inicializa as rotas e o URL do servidor.
     */
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL; // Obtém a URL base do servidor a partir das variáveis de ambiente
        this.routeListarExercicio = '/listar/exercicio'; // Rota para listar exercícios
        this.routeCadastrarExercicio = '/novo/exercicio'; // Rota para cadastrar um novo exercício
        this.routeDeletarExercicio = '/remover/exercicio'; // Rota para deletar um exercício
        this.routeAtualizarExercicio = '/update/exercicio'; // Rota para atualizar um exercício
    }

    /**
     * Obtém o token de autenticação armazenado no localStorage.
     * @returns {string} O token de autenticação.
     */
    getAuthToken() {
        return localStorage.getItem('token'); // Retorna o token do localStorage
    }

    /**
     * Método assíncrono para listar exercícios.
     * @returns {Promise<object[]>} A lista de exercícios em formato JSON.
     * @throws {Error} Lança um erro se a busca falhar.
     */
    async listarExercicio() {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição GET para obter a lista de exercícios
            const response = await fetch(`${this.serverUrl}${this.routeListarExercicio}`, {
                headers: {
                    'x-access-token': `${token}` // Adiciona o token no cabeçalho da requisição
                }
            }); 

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao buscar exercícios'); // Lança um erro se a busca falhar
            }
            // Converte a resposta para JSON e a retorna
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console e relança para tratamento posterior
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
     * Método assíncrono para cadastrar um exercício.
     * @param {object} exercicio - O objeto contendo as informações do exercício.
     * @returns {Promise<object>} Os dados do exercício cadastrado em formato JSON.
     * @throws {Error} Lança um erro se o cadastro falhar.
     */
    async cadastrarExercicio(exercicio) {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição POST para cadastrar um exercício
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarExercicio}`, {
                method: 'POST', // Define o método como POST
                headers: {
                    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                    'x-access-token': `${token}` // Adiciona o token no cabeçalho da requisição
                },
                body: JSON.stringify(exercicio) // Converte o objeto exercício para uma string JSON
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao cadastrar exercício'); // Lança um erro se o cadastro falhar
            }
            // Retorna os dados do exercício cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console e relança para tratamento posterior
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
     * Método assíncrono para deletar um exercício.
     * @param {number} idExercicio - O ID do exercício a ser deletado.
     * @returns {Promise<boolean>} Verdadeiro se a deleção for bem-sucedida, falso em caso de erro.
     */
    async deletarExercicio(idExercicio) {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição DELETE para remover o exercício
            const response = await fetch(`${this.serverUrl}${this.routeDeletarExercicio}?idExercicio=${idExercicio}`, {
                method: 'DELETE', // Define o método como DELETE
                headers: {
                    'x-access-token': `${token}` // Adiciona o token no cabeçalho da requisição
                }
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário'); // Lança um erro se a deleção falhar
            }
            return true; // Retorna verdadeiro se a deleção for bem-sucedida
        } catch (error) {
            console.error('Erro: ', error); // Loga o erro no console
            return false; // Retorna falso em caso de erro
        }
    }

    /**
     * Método assíncrono para atualizar um exercício.
     * @param {object} exercicio - O objeto contendo as informações do exercício.
     * @returns {Promise<boolean|null>} Verdadeiro se a atualização for bem-sucedida, nulo em caso de erro.
     * @throws {Error} Lança um erro se a atualização falhar.
     */
    async atualizarExercicio(exercicio) {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do exercício
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarExercicio}?idExercicio=${exercicio.id_exercicio}`, {
                method: 'PUT', // Define o método como PUT
                headers: {
                    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                    'x-access-token': `${token}` // Adiciona o token no cabeçalho da requisição
                },
                body: JSON.stringify(exercicio) // Converte o objeto exercício para uma string JSON
            });

            // Verifica se a resposta não foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário'); // Lança um erro se a atualização falhar
            }
            return true; // Retorna verdadeiro se a atualização for bem-sucedida
        } catch (error) {
            console.error('Erro: ', error); // Loga o erro no console
            window.alert('Erro ao atualizar Exercicio'); // Exibe um alerta de erro
            return null; // Retorna nulo em caso de erro
        }
    }
}

// Exporta uma instância da classe ExerciciosRequests para ser utilizada em outras partes do código
export default new ExerciciosRequests();
