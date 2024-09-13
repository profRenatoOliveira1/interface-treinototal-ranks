class AlunoRequests {
    constructor() {
        // Inicializa as rotas e o URL do servidor
        this.serverUrl = import.meta.env.VITE_API_URL;
        this.routeListarAluno = '/listar/aluno';
        this.routeCadastrarAluno = '/novo/aluno';
        this.routeDeletarAluno = '/remover/aluno';
        this.routeAtualizarAluno = '/update/aluno';
    }
    getAuthToken() {
        return localStorage.getItem('token');
    }
    async listarAlunos() { // Método assíncrono para listar alunos
        try {
            const token = this.getAuthToken();
            // Realiza uma requisição GET para obter a lista de alunos
            const response = await fetch(`${this.serverUrl}${this.routeListarAluno}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });
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
            const token = this.getAuthToken();
            // Realiza uma requisição POST para cadastrar um aluno
            const response = await fetch(`${this.serverUrl}${this.routeCadastrarAluno}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
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
            const token = this.getAuthToken();
            const response = await fetch(`${this.serverUrl}${this.routeDeletarAluno}?id_aluno=${idAluno}`, {
                method: 'DELETE',
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
    async atualizarAluno(aluno) {
        try {
            const token = this.getAuthToken();
            const response = await fetch(`${this.serverUrl}${this.routeAtualizarAluno}?id_aluno=${aluno.id_aluno}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(aluno)
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            return true;
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao atualizar aluno');
            return null;
        }
    }
}

// Exporta uma instância da classe AlunoRequests para ser utilizada em outras partes do código
export default new AlunoRequests();
