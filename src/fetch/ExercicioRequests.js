import { SERVER_ROUTES } from "../appconfig";

class ExercicioRequests {
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarExercicios = SERVER_ROUTES.LISTAR_EXERCICIOS;
        this.routeCadastrarExercicio = SERVER_ROUTES.CADASTRAR_EXERCICIO;
        this.routeRemoverExercicio = SERVER_ROUTES.REMOVER_EXERCICIO;
        this.routeAtualizarExercicio = SERVER_ROUTES.ATUALIZAR_EXERCICIO;
    }
    getToken() {
        return localStorage.getItem('token');
    }

    async listarExercicios() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarExercicios}`, {
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

    async cadastrarExercicio(exercicioData) {
        const token = localStorage.getItem('token');
        try {
            console.log('Dados do exercício:', exercicioData); // Verifique os dados aqui

            const response = await fetch(`${this.serverUrl}${this.routeCadastrarExercicio}`, {
                method: 'POST',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exercicioData),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Captura a resposta do erro
                console.error('Erro do servidor:', errorText); // Mostra o erro do servidor
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error('Erro ao adicionar exercício');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar exercício:', error);
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            throw error;
        }
    }

    async deletarExercicio(exercicioId) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.routeRemoverExercicio}?idExercicio=${exercicioId}`, {
                method: 'PUT',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error('Erro ao deletar exercício');
            }
            return true;
        } catch (error) {
            console.error('Erro ao deletar exercício:', error);
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            return false;
        }
    }

    async atualizarExercicio(exercicio) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarExercicio}?idExercicio=${exercicio.idExercicio}`, {
                method: 'PUT',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exercicio)
            });
            if (!response.ok) {
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error('Erro ao atualizar exercício');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar exercício:', error);
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            return null;
        }
    }
}

export default new ExercicioRequests();
