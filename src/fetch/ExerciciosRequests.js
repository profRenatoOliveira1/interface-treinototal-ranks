class ExerciciosRequests {
    constructor() {
        this.serverUrl = 'http://localhost:3000'; // Altere para a URL correta do seu backend
        this.routeListarExercicio = '/listar-exercicio';
        this.routeCadastrarExercicio = '/novo/exercicio';
    }

    async listarExercicio() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarExercicio}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar exercícios');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
            throw error; // Propaga o erro para o código que chama esta função
        }
    }

    async cadastrarExercicio(exercicio) {
        try {
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
            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
            throw error; // Propaga o erro para o código que chama esta função
        }
    }
}

export default new ExerciciosRequests();
