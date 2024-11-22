class ProfessoresRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarProfessor = '/listar/professores';
        this.routeCadastrarProfessor = '/novo/professor';
        this.routeDeletarProfessor = '/remover/professor';
        this.routeAtualizarProfessor = '/atualizar/professor';
    }
    getAuthToken() {
        return localStorage.getItem('token');
    }
    async listarProfessor() { // Método assíncrono para listar professores
        try {
            const token = this.getAuthToken();
            // Realiza uma requisição GET para obter a lista de professores
            const response = await fetch(`${this.serverUrl}${this.routeListarProfessor}`, {
                headers: {
                    'x-access-token': `${token}`,
                }
            });
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

    async cadastrarProfessor(professor) { // Método assíncrono para cadastrar um professor
        try {
            const token = this.getAuthToken();
            // Realiza uma requisição POST para cadastrar um professor
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarProfessor}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
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
    async deletarProfessor(idProfessor) {
        try {
            const token = this.getAuthToken();
            const response = await fetch(`${this.serverUrl}${this.routeDeletarProfessor}?idProfessor=${idProfessor}`, {
                // Informa o verbo a ser acessado
                method: 'PUT',
                headers: {
                    'x-access-token': `${token}`
                }
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
 * @param {*} professor animal Objeto com as informações do animal
 * @returns **verdadeiro (true)** caso o animal tenha sido deletado, **null (nulo)** caso tenha acontecido algum erro
 */
    async atualizarProfessor(professor) {
        try {
            const token = this.getAuthToken();
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarProfessor}?idProfessor=${professor.idProfessor}`, {
                // Informa o verbo a ser acessado
                method: 'PUT',
                // informa os cabeçalhos da requisição
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                // informa o corpo da requisição, contendo as informações do aluno
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

// Exporta uma instância da classe ProfessoresRequests para ser utilizada em outras partes do código
export default new ProfessoresRequests();
