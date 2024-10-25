class ProfessoresRequests {
    /**
     * Construtor da classe ProfessoresRequests.
     * Inicializa as rotas e o URL do servidor.
     */
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL; // Obtém a URL base do servidor a partir das variáveis de ambiente
        this.routeListarProfessor = '/listar/professor'; // Rota para listar professores
        this.routeCadastrarProfessor = '/novo/professor'; // Rota para cadastrar um novo professor
        this.routeDeletarProfessor = '/remover/professor'; // Rota para deletar um professor
        this.routeAtualizarProfessor = '/update/professor'; // Rota para atualizar um professor
        this.routeAtualizarSenhaProfessor = '/update/senha/professor'; // Rota para atualizar a senha de um professor
    }

    /**
     * Método para obter o token de autenticação armazenado no localStorage.
     * @returns {string|null} O token de autenticação, ou null se não estiver presente.
     */
    getAuthToken() {
        return localStorage.getItem('token'); // Retorna o token do localStorage
    }

    /**
     * Método assíncrono para listar professores.
     * @returns {Promise<Object[]>|null} Retorna a lista de professores ou null em caso de erro.
     */
    async listarProfessor() {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição GET para obter a lista de professores
            const response = await fetch(`${this.serverUrl}${this.routeListarProfessor}`, {
                headers: {
                    'x-access-token': `${token}`, // Adiciona o token no cabeçalho da requisição
                }
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao buscar professores'); // Lança um erro se a busca falhar
            }
            // Converte a resposta para JSON e a retorna
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
            return null; // Retorna nulo em caso de erro
        }
    }

    /**
     * Método assíncrono para cadastrar um professor.
     * @param {Object} professor Objeto com os dados do professor a ser cadastrado.
     * @returns {Promise<Object>|null} Retorna os dados do professor cadastrado ou null em caso de erro.
     */
    async cadastrarProfessor(professor) {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição POST para cadastrar um professor
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarProfessor}`, {
                method: 'POST', // Define o método como POST
                headers: {
                    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                    'x-access-token': `${token}` // Adiciona o token no cabeçalho da requisição
                },
                body: JSON.stringify(professor) // Converte o objeto professor para uma string JSON
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao cadastrar professor'); // Lança um erro se o cadastro falhar
            }
            // Retorna os dados do professor cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
            return null; // Retorna nulo em caso de erro
        }
    }

    /**
     * Método assíncrono para deletar um professor.
     * @param {string} idProfessor ID do professor a ser deletado.
     * @returns {Promise<boolean>} Retorna verdadeiro se a deleção for bem-sucedida, ou falso em caso de erro.
     */
    async deletarProfessor(idProfessor) {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Realiza uma requisição DELETE para remover o professor
            const response = await fetch(`${this.serverUrl}${this.routeDeletarProfessor}?idProfessor=${idProfessor}`, {
                method: 'DELETE', // Define o método como DELETE
                headers: {
                    'x-access-token': `${token}` // Adiciona o token no cabeçalho da requisição
                }
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao deletar professor'); // Lança um erro se a deleção falhar
            }
            return true; // Retorna verdadeiro se a deleção for bem-sucedida
        } catch (error) {
            console.error('Erro: ', error); // Loga o erro no console
            return false; // Retorna falso em caso de erro
        }
    }

    /**
     * Método assíncrono para atualizar o registro de um professor no servidor.
     * @param {Object} professor Objeto com as informações do professor a ser atualizado.
     * @returns {Promise<boolean|null>} Retorna verdadeiro se a atualização for bem-sucedida, ou nulo em caso de erro.
     */
    async atualizarProfessor(professor) {
        try {
            const token = this.getAuthToken(); // Obtém o token de autenticação
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do professor
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarProfessor}?idProfessor=${professor.idProfessor}`, {
                method: 'PUT', // Define o método como PUT
                headers: {
                    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                    'x-access-token': `${token}` // Adiciona o token no cabeçalho da requisição
                },
                body: JSON.stringify(professor) // Converte o objeto professor para uma string JSON
            });

            // Verifica se a resposta não foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário'); // Lança um erro se a atualização falhar
            }
            return true; // Retorna verdadeiro se a atualização for bem-sucedida
        } catch (error) {
            console.error('Erro: ', error); // Loga o erro no console
            window.alert('Erro ao atualizar professor'); // Exibe um alerta de erro
            return null; // Retorna nulo em caso de erro
        }
    }

    /**
     * Método assíncrono para atualizar a senha do professor.
     * @param {Object} professor Objeto com as informações do professor cuja senha será atualizada.
     * @returns {Promise<boolean|null>} Retorna verdadeiro se a senha for atualizada, ou nulo em caso de erro.
     */
    // async UpdateSenhaProfessor(professor) {
    //     try {
    //         const token = this.getAuthToken(); // Obtém o token de autenticação
    //         // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do professor
    //         const response = await fetch(`${this.serverUrl}${this.routeAtualizarSenhaProfessor}?idProfessor=${professor.idProfessor}`, {
    //             method: 'PUT', // Define o método como PUT
    //             headers: {
    //                 'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
    //                 'x-access-token': `${token}` // Adiciona o token no cabeçalho da requisição
    //             },
    //             body: JSON.stringify(professor) // Converte o objeto professor para uma string JSON
    //         });

    //         // Para os alunos engraçadinhos não trocarem a senha do usuário admin
    //         if(response.status === 403) {
    //             console.error('Não é possível alterar a senha do administrador');
    //             alert('Não é possível alterar a senha do administrador');
    //             return null; // Retorna nulo se não for permitido alterar a senha do administrador
    //         }

    //         // Verifica se a resposta não foi bem-sucedida
    //         if (!response.ok) {
    //             throw new Error('Erro ao enviar formulário'); // Lança um erro se a atualização falhar
    //         }
    //         return true; // Retorna verdadeiro se a atualização da senha for bem-sucedida
    //     } catch (error) {
    //         console.error('Erro: ', error); // Loga o erro no console
    //         window.alert('Erro ao atualizar senha do professor'); // Exibe um alerta de erro
    //         return null; // Retorna nulo em caso de erro
    //     }
    // }
}

// Exporta uma instância da classe ProfessoresRequests para ser utilizada em outras partes do código
export default new ProfessoresRequests();
