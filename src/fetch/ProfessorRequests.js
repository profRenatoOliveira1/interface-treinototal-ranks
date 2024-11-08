import { SERVER_ROUTES } from "../appconfig";

class ProfessorRequests {
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarProfessores = SERVER_ROUTES.LISTAR_PROFESSORES;
        this.routeCadastrarProfessor = SERVER_ROUTES.CADASTRAR_PROFESSOR;
        this.routeRemoverProfessor = SERVER_ROUTES.REMOVER_PROFESSOR;
        this.routeAtualizarProfessor = SERVER_ROUTES.ATUALIZAR_PROFESSOR;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    async listarProfessores() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarProfessores}`, {
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

    async cadastrarProfessor(professorData) {
        const token = this.getToken();
        try {
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarProfessor}`, {
                method: 'POST',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(professorData)
            });
            if (!response.ok) {
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error('Erro ao adicionar professor');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar professor:', error);
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            return null;
        }
    }

    async deletarProfessor(idProfessor) {
        const token = this.getToken();
        try {
            const response = await fetch(`${this.serverUrl}${this.routeRemoverProfessor}?idProfessor=${idProfessor}`, {
                method: 'PUT',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error('Erro ao deletar professor');
            }
            return true;
        } catch (error) {
            console.error('Erro ao deletar professor:', error);
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            return false;
        }
    }

    async atualizarProfessor(professor) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarProfessor}?idProfessor=${professor.idProfessor}`, {
                method: 'PUT',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(professor)
            });
            if (!response.ok) {
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error('Erro ao atualizar professor');
            }
            return true;
        } catch (error) {
            console.error('Erro ao atualizar professor:', error);
            window.alert('Erro ao atualizar professor');
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            return null;
        }
    }
}

export default new ProfessorRequests();
