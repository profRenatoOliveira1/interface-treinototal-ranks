class ExerciciosRequests {
    constructor() {
        this.serverUrl = 'http://localhost:3000'; // Defina o URL do servidor aqui
        this.routeListarExercicio = '/listarExercicio';
        this.routeCadastrarExercicio = '/cadastrarExercicio';
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
        }
    }
}

export default new ExerciciosRequests();
