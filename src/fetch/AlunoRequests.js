class AlunoRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL;  // Atribui a URL base da API, obtida das variáveis de ambiente, à propriedade serverUrl
        this.routeListarAluno = '/listar/aluno';  // Define a rota para listar alunos e atribui à propriedade routeListarAluno
        this.routeCadastrarAluno = '/novo/aluno';  // Define a rota para cadastrar um novo aluno e atribui à propriedade routeCadastrarAluno
        this.routeDeletarAluno = '/remover/aluno';  // Define a rota para deletar um aluno e atribui à propriedade routeDeletarAluno
    }

    async listarAlunos() { // Método assíncrono para listar alunos
        try {
            // Realiza uma requisição GET para obter a lista de alunos
            const response = await fetch(`${this.serverUrl}${this.routeListarAluno}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar alunos');
            }
            // Converte a resposta para JSON
            const data = await response.json();
            // Verifica se a resposta é um array JSON
            if (!Array.isArray(data)) {
                throw new Error('Resposta inválida: não é um array JSON');
            }
            // Retorna os dados
            return data;
        } catch (error) {
            // Em caso de erro, exibe e relança o erro
            console.error('Erro: ', error);
            throw error;
        }
    }

    async cadastrarAluno(aluno) { // Método assíncrono para cadastrar um aluno
        try {
            // Realiza uma requisição POST para cadastrar um aluno
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarAluno}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar aluno');
            }

            // Se o cadastro for bem-sucedido, exibe uma mensagem no console
            console.log('Aluno cadastrado com sucesso!');

            // Retorna os dados do aluno cadastrado
            return await response.json();
        } catch (error) {
            // Em caso de erro, exibe e relança o erro
            console.error('Erro: ', error);
            throw error;
        }
    }
    async deletarAluno(idAluno) {  // Define um método assíncrono chamado deletarAluno, que recebe um id_aluno como parâmetro
        try {
            const response = await fetch(`${this.serverUrl}${this.routeDeletarAluno}?id_aluno=${idAluno}`, {  // Faz uma requisição HTTP do tipo DELETE para a URL gerada dinamicamente
                method: 'DELETE'  // Define o método HTTP como DELETE
            });
            if (!response.ok) {  // Verifica se a resposta da requisição não foi bem-sucedida
                throw new Error('Erro ao enviar formulário');  // Lança um erro se a resposta não for OK
            }
            return true;  // Retorna true se a exclusão for bem-sucedida
        } catch (error) {  // Captura qualquer erro que ocorrer durante a execução do bloco try
            console.error('Erro: ', error);  // Loga o erro no console para fins de depuração
            return false;  // Retorna false se ocorrer um erro
        }
    }
}

// Exporta uma instância da classe AlunoRequests para ser utilizada em outras partes do código
export default new AlunoRequests();
