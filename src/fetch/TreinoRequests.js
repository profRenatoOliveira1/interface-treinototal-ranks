/**
 * Classe para requisição de treino
 */
class TreinoRequests {

    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeCadastrarTreino = '/novo/treino';
        this.routeListarTreino = '/listar/treino';
    }

    /**
     * Recupera um token salvo no localStorage
     * @returns token armazenado
     */
    getAuthToken() {
        return localStorage.getItem('token');
    }

    /**
     * Lista todos os treinos cadastrados.
     * 
     * @returns {Promise<Object[]>} Um array de objetos com informações dos treinos, ou um erro caso não seja possível obter a lista
     */
    async listarTreinos(matricula) { // Método assíncrono para listar treino
        try {
            const token = this.getAuthToken();
            // Realiza uma requisição GET para obter a lista de treinos
            const response = await fetch(`${this.serverUrl}${this.routeListarTreino}?matricula=${matricula}`, {
                headers: {
                    'x-access-token': `${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar treino');
            }
            // Converte a resposta para JSON e a retorna
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
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
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarTreino}`, {
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