class AlunoRequests {
    constructor() {
        this.serverUrl = 'http://localhost:3000'; 
        this.routeListarAluno = '/listarAluno';
        this.routeCadastrarAluno = '/cadastrarAluno';
    }

    async listarAluno() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarAluno}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar alunos');
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error('Resposta inválida: não é um array JSON');
            }
            return data;
        } catch (error) {
            console.error('Erro: ', error);
            throw error;
        }
    }

    async cadastrarAluno(aluno) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarAluno}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar aluno');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
            throw error;
        }
    }
}

export default new AlunoRequests();
