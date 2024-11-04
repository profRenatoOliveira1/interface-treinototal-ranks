import { SERVER_ROUTES } from "../appconfig";

class AlunoRequests {
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarAlunos = SERVER_ROUTES.LISTAR_ALUNOS;
        this.routeCadastrarAluno = SERVER_ROUTES.CADASTRAR_ALUNO;
        this.routeRemoverAluno = SERVER_ROUTES.REMOVER_ALUNO;
        this.routeAtualizarAluno = SERVER_ROUTES.ATUALIZAR_ALUNO;
    }
    
    getToken() {
        return localStorage.getItem('authToken');
    }

    async listarAlunos() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarAlunos}`, {
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error('Erro ao buscar dados dos professores');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar dados dos professores:', error);
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            return null;
        }
    }

    async cadastrarAluno(aluno) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarAluno}`, {
                method: 'POST',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro na resposta:', errorData);
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error(`Erro ao adicionar aluno: ${errorData.message || response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar aluno:', error);
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            return null;
        }
    }

    async deletarAluno(idAluno) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeRemoverAluno}?idAluno=${idAluno}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error('Erro ao deletar aluno');
            }
            return true;
        } catch (error) {
            console.error('Erro ao deletar aluno:', error);
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            return false;
        }
    }

    async atualizarAluno(aluno) {
        console.log(aluno);
        try {
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarAluno}?idAluno=${aluno.idAluno}`, {
                method: 'PUT',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno)
            });
            if (!response.ok) {
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error('Erro ao atualizar aluno');
            }
            return true;
        } catch (error) {
            console.error('Erro ao atualizar aluno:', error);
            window.alert('Erro ao atualizar aluno');
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            return null;
        }
    }
}

export default new AlunoRequests();
