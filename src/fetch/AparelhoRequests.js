import { SERVER_ROUTES } from '../appconfig';

class AparelhoRequests {
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarAparelho = SERVER_ROUTES.LISTAGEM_APARELHO;
        this.routeCadastrarAparelho = SERVER_ROUTES.CADASTRO_APARELHO;
        this.routeDeletarAparelho = SERVER_ROUTES.REMOVER_APARELHO;
        this.routeUpdateAparelho = SERVER_ROUTES.ATUALIZAR_APARELHO;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    async ListagemAparelhos() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarAparelho}`, {
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

    async cadastrarAparelho(aparelhoData) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarAparelho}`, {
                method: 'POST',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aparelhoData)
            });
            if (!response.ok) {
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error('Erro ao adicionar aparelho');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar aparelho:', error);
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            return null;
        }
    }

    async deletarAparelho(aparelhoId) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.routeDeletarAparelho}?idAparelho=${aparelhoId}`, {
                method: 'PUT',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error('Erro ao deletar aparelho');
            }
            return true;
        } catch (error) {
            console.error('Erro ao deletar aparelho:', error);
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            return false;
        }
    }

    async atualizarAparelho(aparelho) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.routeUpdateAparelho}?idAparelho=${aparelho.idAparelho}`, {
                method: 'PUT',
                headers: {
                    'x-access-token': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aparelho)
            });
            if (!response.ok) {
                console.info("Verifque se o servidor está ligado e se o token é válido.");
                throw new Error('Erro ao atualizar aparelho');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar aparelho:', error);
            console.info("Verifque se o servidor está ligado e se o token é válido.");
            return null;
        }
    }
}


export default new AparelhoRequests();
