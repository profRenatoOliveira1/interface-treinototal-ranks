class ProfessoresRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL; // Atribui a URL base da API, obtida das variáveis de ambiente, à propriedade serverUrl
        this.routeListarProfessor = '/listar/professor'; // Define a rota para listar professores e atribui à propriedade routeListarProfessor
        this.routeCadastrarProfessor = '/novo/professor'; // Define a rota para cadastrar um novo professores e atribui à propriedade routeCadastrarProfessor
        this.routeDeletarProfessor = '/remover/professor'; // Define a rota para deletar um professores e atribui à propriedade routeDeletarProfessor
    }

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
}

// Exporta uma instância da classe ProfessoresRequests para ser utilizada em outras partes do código
export default new ProfessoresRequests();
