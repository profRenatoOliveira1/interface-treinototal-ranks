import { SERVER_ROUTES } from "../appconfig";

/**
 * Classe para requisição de treino
 */
class TreinoRequests {

    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        this.serverURL = import.meta.env.VITE_API_URL;
        this.routeCadastrarTreino = SERVER_ROUTES.CADASTRAR_TREINO;
        this.routeListarTreino = SERVER_ROUTES.LISTAR_TREINO;
    }

    /**
     * Recupera um token salvo no localStorage
     * @returns token armazenado
     */
    getAuthToken() {
        return localStorage.getItem('token');
    }

    /**
     * Faz a busca dos alunos no servidor
     * @param {*} tipoBusca nome ou matrícula
     * @param {*} valorBusca valor inserido pelo usuário
     * @returns ficha de treino
     */
    async listarTreino(tipoBusca, valorBusca) {
        try {
            const token = this.getAuthToken();
            let url = `${this.serverURL}`;
            let headers = {
                'x-access-token': `${token}`
            };
            if (tipoBusca === 'matricula') {
                url += `${this.routeListarTreino}?matricula=${valorBusca}`;
            } else {
                url += `${this.routeListarTreino}?nome_aluno=${valorBusca}`;
            }
            const response = await fetch(url, { headers });
            if (!response.ok) {
                throw new Error('Erro ao buscar treinos');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
        }
    }

    /**
     * Cadastra uma ficha de treino
     * @param {*} treino 
     * @returns **true** caso sucesso, **false** caso erro
     */
    async cadastrarTreino(treino) {
        try {
            const token = this.getAuthToken();
            const response = await fetch(`${this.serverURL}${this.routeCadastrarTreino}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(treino)
            });

            if (!response.ok) {
                throw new Error('Não foi possível cadastrar o treino');
            }

            console.log('Treino cadastrado com sucesso');

            return true;
        } catch (error) {
            // Em caso de erro, exibe e relança o erro
            console.error('Erro: ', error);
            throw error;
        }
    }
}

export default new TreinoRequests();