class ProfessoresRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarProfessor = '/listar/professor';
        this.routeCadastrarProfessor = '/novo/professor';
        this.routeDeletarProfessor = '/remover/professor';
        this.routeAtualizarProfessor = '/update/professor';
    }

    /**
        * Requisita a lista de professores.
        * 
        * @async
        * @return {Array|undefined} Retorna um array de objetos representando os professores, ou `undefined` se ocorrer um erro
        * 
        * @throws {Error} Lança um erro se a requisição falhar.
     */
    async listarProfessor() { // Método assíncrono para listar professores
        try {
            // Realiza uma requisição GET para obter a lista de professores
            const response = await fetch(`${this.serverUrl}${this.routeListarProfessor}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar professores');
            }
            // Converte a resposta para JSON e a retorna
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
        }
    }

    /**
        * Cadastra um novo professor no sistema.
        * 
        * @async
        * @param {*} professor - Objeto contendo as informações do professor a ser cadastrado.
        * @return Retorna o objeto JSON com os dados do professor cadastrado, ou `undefined` se ocorrer um erro.
        * 
        * @throw {Error} Lança um erro se a requisição falhar.
     */
    async cadastrarProfessor(professor) { // Método assíncrono para cadastrar um professor
        try {
            // Realiza uma requisição POST para cadastrar um professor
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarProfessor}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(professor)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar professor');
            }
            // Retorna os dados do professor cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
        }
    }

    /**
        * Deleta um professor do sistema.
        * 
        * @param {*} idProfessor  Objeto com as informações do professor.
        * @return **verdadeiro (true)** caso o professor tenha sido deletado, **null (nulo)** caso tenha acontecido algum erro.
     */
    async deletarProfessor(idProfessor) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeDeletarProfessor}?id_professor=${idProfessor}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar professor');
            }
            return true;
        } catch (error) {
            console.error('Erro: ', error);
            return false; // Retorna false em caso de erro
        }
    }

    /**
        * Atualiza o registro de um professor no servidor
        * 
        * @param {*} professor  Objeto com as informações do professor
        * @return **verdadeiro (true)** caso o professor tenha sido atualizado, **null (nulo)** caso tenha acontecido algum erro
     */
    async atualizarProfessor(professor) {
        try {

            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarProfessor}?id_professor=${professor.id_professor}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(professor)
                });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            return true;
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao atualizar professor');
            return null;
        }
    }

}

export default new ProfessoresRequests();// Exporta uma instância da classe ProfessoresRequests para ser utilizada em outras partes do código