class AparelhoRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarAparelho = '/listar-aparelho';
        this.routeCadastrarAparelho = '/novo/aparelho';
        this.routeDeletarAparelho = '/remover/aparelho';
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

    async deletarAparelho(id_aparelho) { // Método assíncrono para deletar um aparelho
        try {
            const response = await fetch(`${this.serverUrl}${this.routeDeletarAparelho}?id_aparelho=${id_aparelho}`, {
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
