class ProfessoresRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarProfessor = '/listar-professor';
        this.routeCadastrarProfessor = '/novo/professor';
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
}

// Exporta uma instância da classe ProfessoresRequests para ser utilizada em outras partes do código
export default new ProfessoresRequests();
