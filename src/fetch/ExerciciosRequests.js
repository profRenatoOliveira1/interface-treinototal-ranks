class ExerciciosRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarExercicio = '/listar/exercicio';
        this.routeCadastrarExercicio = '/novo/exercicio';
        this.routeDeletarExercicio = '/remover/exercicio';
        this.routeAtualizarExercicio = '/update/exercicio';
    }

    async listarExercicio() { // Método assíncrono para listar exercícios
        try {
            // Realiza uma requisição GET para obter a lista de exercícios
            const response = await fetch(`${this.serverUrl}${this.routeListarExercicio}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar exercícios');
            }
            // Converte a resposta para JSON e a retorna
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe e propaga o erro para o código que chama esta função
            console.error('Erro: ', error);
            throw error;
        }
    }

    async cadastrarExercicio(exercicio) { // Método assíncrono para cadastrar um exercício
        try {
            // Realiza uma requisição POST para cadastrar um exercício
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarExercicio}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exercicio)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar exercício');
            }
            // Retorna os dados do exercício cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe e propaga o erro para o código que chama esta função
            console.error('Erro: ', error);
            throw error;
        }
    }

    async deletarExercicio(idExercicio) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeDeletarExercicio}?id_exercicio=${idExercicio}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            return true;
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao deletar Exercicio');
            return false;
        }
    }

    async atualizarExercicio(exercicio) {
        try {
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal

            const response = await fetch(`${this.serverUrl}${this.routeAtualizarExercicio}?id_exercicio=${exercicio.id_exercicio}`,
                {
                    // Informa o verbo a ser acessado
                    method: 'PUT',
                    // informa os cabeçalhos da requisição
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // informa o corpo da requisição, contendo as informações do aluno
                    body: JSON.stringify(exercicio)
                });
            // Verifica se a resposta não foi bem sucedida ...
            if (!response.ok) {
                // ... lança um erro
                throw new Error('Erro ao enviar formulário');
            }
            // retorna true caso a resposta seja bem sucedida
            return true;
        } catch (error) {
            // caso ocorra algum erro na comunicação
            console.error('Erro: ', error);
            window.alert('Erro ao atualizar Exercicio');
            return null;
        }
    }
}

export default new ExerciciosRequests();// Exporta uma instância da classe ExerciciosRequests para ser utilizada em outras partes do código