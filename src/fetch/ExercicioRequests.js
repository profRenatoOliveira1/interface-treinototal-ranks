import { SERVER_ROUTES } from '../appconfig';

class ExerciciosRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarExercicio = SERVER_ROUTES.LISTAGEM_EXERCICIO;
        this.routeCadastrarExercicio = SERVER_ROUTES.CADASTRO_EXERCICIO;
        this.routeDeletarExercicio = SERVER_ROUTES.REMOVER_EXERCICIO;
        this.routeAtualizarExercicio = SERVER_ROUTES.ATUALIZAR_EXERCICIO;
    }
    getAuthToken() {
        return localStorage.getItem('token');
    }
    async listarExercicio() { // Método assíncrono para listar exercícios
        try {
            const token = this.getAuthToken();
            // Realiza uma requisição GET para obter a lista de exercícios
            const response = await fetch(`${this.serverUrl}${this.routeListarExercicio}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            }); 
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
            const token = this.getAuthToken();
            // Realiza uma requisição POST para cadastrar um exercício
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarExercicio}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
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
            const token = this.getAuthToken();
            const response = await fetch(`${this.serverUrl}${this.routeDeletarExercicio}?idExercicio=${idExercicio}`, {
                // Informa o verbo a ser acessado
                method: 'PUT',
                headers: {
                    'x-access-token': `${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            return true;
        } catch (error) {
            console.error('Erro: ', error);
            return false;
        }
    }

    async atualizarExercicio(exercicio) {
        try {
            const token = this.getAuthToken();
            // Faz a requisição para o servidor, passando o endereço, a rota e a query com o ID do animal

            const response = await fetch(`${this.serverUrl}${this.routeAtualizarExercicio}?idExercicio=${exercicio.idExercicio}`, {
                // Informa o verbo a ser acessado
                method: 'PUT',
                // informa os cabeçalhos da requisição
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
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

// Exporta uma instância da classe ExerciciosRequests para ser utilizada em outras partes do código
export default new ExerciciosRequests();
