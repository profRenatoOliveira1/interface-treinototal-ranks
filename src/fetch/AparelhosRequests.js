class AparelhoRequests {
    constructor() {
        this.serverUrl = 'http://localhost:3000'; // Defina o URL do servidor aqui
        this.routeListarAparelho = '/listarAparelho';
        this.routeCadastrarAparelho = '/cadastrarAparelho';
    }

    async listarAparelho() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarAparelho}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar aparelhos');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
        }
    }

    async cadastrarAparelho(aparelho) {
        try {
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
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
        }
    }
}

export default new AparelhoRequests();
