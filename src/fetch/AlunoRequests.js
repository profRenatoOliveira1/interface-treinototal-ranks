class AlunoRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor a partir das variáveis de ambiente
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarAluno = '/listar/aluno'; // Rota para listar alunos
        this.routeCadastrarAluno = '/novo/aluno'; // Rota para cadastrar um novo aluno
        this.routeDeletarAluno = '/remover/aluno'; // Rota para deletar um aluno
        this.routeAtualizarAluno = '/update/aluno'; // Rota para atualizar informações de um aluno
    }

    /**
        * Requisita a lista de alunos.
        * 
        * @async
        * @return {Array|undefined} Retorna um array de objetos representando os alunos, ou `undefined` se ocorrer um erro
        * 
        * @throws {Error} Lança um erro se a requisição falhar.
     */
    async listarAlunos() {
        try {
            // Faz uma requisição GET para obter a lista de alunos
            const response = await fetch(`${this.serverUrl}${this.routeListarAluno}`);

            // Verifica se a resposta é bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao buscar alunos');
            }

            // Converte a resposta para JSON
            const data = await response.json();

            // Verifica se os dados retornados são um array
            if (!Array.isArray(data)) {
                throw new Error('Resposta inválida: não é um array JSON');
            }

            // Retorna os dados dos alunos
            return data;
        } catch (error) {
            // Em caso de erro, exibe no console e relança o erro
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
        * Cadastra um novo aluno no sistema.
        * 
        * @async
        * @param {*} aluno - Objeto contendo as informações do aluno a ser cadastrado.
        * @return Retorna o objeto JSON com os dados do aluno cadastrado, ou `undefined` se ocorrer um erro.
        * 
        * @throw {Error} Lança um erro se a requisição falhar.
     */
    async cadastrarAluno(aluno) {
        try {
            // Faz uma requisição POST para cadastrar o aluno
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarAluno}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno) // Converte os dados do aluno para JSON
            });

            // Verifica se a resposta é bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao cadastrar aluno');
            }

            // Exibe uma mensagem de sucesso no console
            console.log('Aluno cadastrado com sucesso!');

            // Retorna os dados do aluno cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe no console e relança o erro
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
        * Deleta um aluno do sistema.
        * 
        * @param {*} idAluno  Objeto com as informações do aluno.
        * @return **verdadeiro (true)** caso o aluno tenha sido deletado, **null (nulo)** caso tenha acontecido algum erro.
     */
    async deletarAluno(idAluno) {
        try {
            // Faz uma requisição DELETE para deletar o aluno
            const response = await fetch(`${this.serverUrl}${this.routeDeletarAluno}?id_aluno=${idAluno}`, {
                method: 'DELETE' // Define o método HTTP como DELETE
            });

            // Verifica se a resposta é bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }

            // Retorna true se a exclusão foi bem-sucedida
            return true;
        } catch (error) {
            // Em caso de erro, exibe no console e retorna false
            console.error('Erro: ', error);
            return false;
        }
    }

    /**
        * Atualiza o registro de um aluno no servidor
        * 
        * @param {*} aluno  Objeto com as informações do aluno
        * @return **verdadeiro (true)** caso o aluno tenha sido atualizado, **null (nulo)** caso tenha acontecido algum erro
     */
    async atualizarAluno(aluno) {
        try {
            // Faz uma requisição PUT para atualizar o aluno
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarAluno}?id_aluno=${aluno.id_aluno}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aluno) // Converte os dados atualizados do aluno para JSON
            });

            // Verifica se a resposta é bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }

            // Retorna true se a atualização foi bem-sucedida
            return true;
        } catch (error) {
            // Em caso de erro, exibe no console, mostra um alerta e retorna null
            console.error('Erro: ', error);
            window.alert('Erro ao atualizar aluno');
            return null;
        }
    }
}

export default new AlunoRequests();// Exporta uma instância da classe AlunoRequests para ser utilizada em outras partes do código