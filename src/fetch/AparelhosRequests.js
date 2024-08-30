class AparelhoRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarAparelho = '/listar/aparelho';
        this.routeCadastrarAparelho = '/novo/aparelho';
        this.routeDeletarAparelho = '/remover/aparelho';
        this.routeUpdateAparelho = '/update/aparelho';
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
    /**
 * Atualiza o registro de um aparelho no servidor
 * 
 * @param {*} aparelho animal Objeto com as informações do animal
 * @returns **verdadeiro (true)** caso o animal tenha sido deletado, **null (nulo)** caso tenha acontecido algum erro
 */
    async atualizarAparelho(aparelho) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeUpdateAparelho}?id_aparelho=${aparelho.id_aparelho}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(aparelho)
                });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            return true;
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao atualizar aparelho');
            return null;
        }
    }
}

// Exporta uma instância da classe AparelhoRequests para ser utilizada em outras partes do código
export default new AparelhoRequests();
