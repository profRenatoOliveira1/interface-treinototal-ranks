class AparelhoRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL; // Atribui a URL base da API, obtida das variáveis de ambiente, à propriedade serverUrl
        this.routeListarAparelho = '/listar/aparelho'; // Define a rota para listar aparelhos e atribui à propriedade routeListarAparelho
        this.routeCadastrarAparelho = '/novo/aparelho'; // Define a rota para cadastrar um novo aparelho e atribui à propriedade routeCadastrarAparelho
        this.routeDeletarAparelho = '/remover/aparelho'; // Define a rota para deletar um aparelho e atribui à propriedade routeDeletarAparelho
    }

    async listarAparelho() { // Método assíncrono para listar aparelhos
        try {
            // Realiza uma requisição GET para obter a lista de aparelhos
            const response = await fetch(`${this.serverUrl}${this.routeListarAparelho}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar aparelhos');
            }
            // Converte a resposta para JSON e a retorna
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
            return null; // Retorna null em caso de erro
        }
    }

    async cadastrarAparelho(aparelho) { // Método assíncrono para cadastrar um aparelho
        try {
            // Realiza uma requisição POST para cadastrar um aparelho
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarAparelho}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aparelho)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar aparelho');
            }
            // Retorna os dados do aparelho cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe o erro no console
            console.error('Erro: ', error);
            return null; // Retorna null em caso de erro
        }
    }

    async deletarAparelho(idAparelho) { // Método assíncrono para deletar um aparelho
        try {
            const response = await fetch(`${this.serverUrl}${this.routeDeletarAparelho}?id_aparelho=${idAparelho}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar aparelho');
            }
            return true; // Retorna true se a deleção for bem-sucedida
        } catch (error) {
            console.error('Erro: ', error);
            return false; // Retorna false em caso de erro
        }
    }
}

// Exporta uma instância da classe AparelhoRequests para ser utilizada em outras partes do código
export default new AparelhoRequests();
