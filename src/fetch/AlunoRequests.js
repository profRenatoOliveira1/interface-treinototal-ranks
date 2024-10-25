class AlunoRequests {
    /**
     * Inicializa as rotas e o URL do servidor.
     */
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL; // Obtém a URL base do servidor a partir das variáveis de ambiente
        this.routeListarAluno = '/listar/aluno'; // Rota para listar alunos
        this.routeCadastrarAluno = '/novo/aluno'; // Rota para cadastrar um novo aluno
        this.routeDeletarAluno = '/remover/aluno'; // Rota para remover um aluno
        this.routeAtualizarAluno = '/update/aluno'; // Rota para atualizar os dados de um aluno
    }

    /**
     * Método para obter o token de autenticação armazenado no localStorage.
     * @returns {string|null} O token de autenticação, ou null se não estiver presente.
     */
    getAuthToken() {
        return localStorage.getItem('token');
    }

    /**
     * Método assíncrono para listar alunos.
     * @returns {Promise<object[]>} A lista de alunos em formato JSON ou lança um erro em caso de falha.
     */
    async listarAlunos() {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição GET para obter a lista de alunos
            const response = await fetch(`${this.serverUrl}${this.routeListarAluno}`, {
                headers: {
                    'x-access-token': `${token}` // Adiciona o token ao cabeçalho da requisição
                }
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao buscar alunos');
            }

            // Converte a resposta para JSON
            const data = await response.json();

            // Verifica se a resposta é um array JSON
            if (!Array.isArray(data)) {
                throw new Error('Resposta inválida: não é um array JSON');
            }

            // Retorna os dados dos alunos
            return data;
        } catch (error) {
            // Em caso de erro, exibe e relança o erro
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
     * Método assíncrono para cadastrar um aluno.
     * @param {object} aluno - O objeto contendo as informações do aluno a ser cadastrado.
     * @returns {Promise<object|null>} Os dados do aluno cadastrado em formato JSON ou lança um erro em caso de falha.
     */
    async cadastrarAluno(aluno) {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição POST para cadastrar um aluno
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarAluno}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                    'x-access-token': `${token}` // Adiciona o token ao cabeçalho da requisição
                },
                body: JSON.stringify(aluno) // Converte o objeto aluno para uma string JSON
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao cadastrar aluno');
            }

            // Se o cadastro for bem-sucedido, exibe uma mensagem no console
            console.log('Aluno cadastrado com sucesso!');

            // Retorna os dados do aluno cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe e relança o erro
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
     * Método assíncrono para deletar um aluno com base no seu ID.
     * @param {string} idAluno - O ID do aluno a ser removido.
     * @returns {Promise<boolean>} Verdadeiro se a operação foi bem-sucedida, falso em caso de erro.
     */
    async deletarAluno(idAluno) {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição DELETE para remover um aluno
            const response = await fetch(`${this.serverUrl}${this.routeDeletarAluno}?idAluno=${idAluno}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': `${token}` // Adiciona o token ao cabeçalho da requisição
                }
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }

            return true; // Retorna verdadeiro se a operação foi bem-sucedida
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
            return false; // Retorna falso se houve erro
        }
    }

    /**
     * Método assíncrono para atualizar os dados de um aluno.
     * @param {object} aluno - O objeto contendo as informações do aluno.
     * @returns {Promise<boolean|null>} Verdadeiro se a operação foi bem-sucedida, nulo em caso de erro.
     */
    async atualizarAluno(aluno) {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição PUT para atualizar os dados de um aluno
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarAluno}?idAluno=${aluno.id_aluno}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                    'x-access-token': `${token}` // Adiciona o token ao cabeçalho da requisição
                },
                body: JSON.stringify(aluno) // Converte o objeto aluno para uma string JSON
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }

            return true; // Retorna verdadeiro se a operação foi bem-sucedida
        } catch (error) {
            // Em caso de erro, exibe o erro no console e um alerta para o usuário
            console.error('Erro: ', error);
            window.alert('Erro ao atualizar aluno');
            return null; // Retorna nulo se houve erro
        }
    }
}

// Exporta uma instância da classe AlunoRequests para ser utilizada em outras partes do código
export default new AlunoRequests();
