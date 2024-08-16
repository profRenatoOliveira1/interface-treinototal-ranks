class ExerciciosRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL; // Atribui a URL base da API, obtida das variáveis de ambiente, à propriedade serverUrl
        this.routeListarExercicio = '/listar/exercicio'; // Define a rota para listar exercícios e atribui à propriedade routeListarExercicios
        this.routeCadastrarExercicio = '/novo/exercicio'; // Define a rota para cadastrar um novo exercício e atribui à propriedade routeCadastrarExercicio
        this.routeDeletarExercicio = '/remover/exercicio'; // Define a rota para deletar um exercício e atribui à propriedade routeDeletarExercicio
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
    async deletarExercicio(id_exercicio) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeDeletarExercicio}?id_exercicio=${id_exercicio}`, {
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
}

// Exporta uma instância da classe ExerciciosRequests para ser utilizada em outras partes do código
export default new ExerciciosRequests();
