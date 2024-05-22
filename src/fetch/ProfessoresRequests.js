class ProfessoresRequests {
    constructor() {
        this.serverUrl = 'http://localhost:3000'; 
        this.routeListarProfessor = '/listar-professor';
        this.routeCadastrarProfessor = '/novo/professor';
    }

    async listarProfessor() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarProfessor}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar professores');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
        }
    }

    async cadastrarProfessor(professor) {
        try {
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
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
        }
    }
}

export default new ProfessoresRequests();
