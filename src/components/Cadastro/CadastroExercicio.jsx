import React, { useState, useEffect } from 'react'; // Importa React e o hook useState para gerenciar o estado do componente
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import ExerciciosRequests from '../../fetch/ExerciciosRequests'; // Importa o módulo de requisições para a API de Exercícios
import AparelhoRequests from '../../fetch/AparelhosRequests'; // Importa o módulo de requisições para a API de Aparelhos


function CadastroExercicio() {

    /**
        * Define o estado inicial do formulário com todos os campos vazios.
        * Utiliza o hook `useState` para gerenciar o estado do formulário.
        * 
        * - Cada campo do objeto `formData` representa um atributo do exercício e é inicializado como uma string vazia.
        * 
        * @constant {Object} formData - O estado que contém as informações do formulário.
        * @function setFormData - Função para atualizar o estado `formData`.
        * 
        * @param {Object} formData - Objeto contendo os dados do formulário, com os seguintes campos:
        * @param {string} formData.idAparelho - ID do aparelho associado ao exercício.
        * @param {string} formData.exercicio - Nome do exercício.
        * @param {string} formData.carga - Carga em kg do exercício.
        * @param {string} formData.repeticoes - Número de repetições do exercício.
        * @param {string} formData.regiaoCorpoAtiva - Região do corpo ativada pelo exercício.
    */
    const [formData, setFormData] = useState({
        idAparelho: '',              // Campo para o ID do aparelho
        exercicio: '',               // Campo para o nome do exercício
        carga: '',                   // Campo para a carga em kg
        repeticoes: '',              // Campo para o número de repetições
        regiaoCorpoAtiva: ''         // Campo para a região do corpo ativada
    });

    // Define o estado inicial para a lista de aparelhos
    const [aparelhos, setAparelhos] = useState([]);

    // Hook useEffect para buscar a lista de aparelhos quando o componente é montado
    useEffect(() => {
        const fetchAparelhos = async () => {
            try {
                const aparelhosData = await AparelhoRequests.listarAparelho(); // Busca a lista de aparelhos da API
                if (aparelhosData) {
                    setAparelhos(aparelhosData); // Atualiza o estado com a lista de aparelhos
                }
            } catch (error) {
                console.error('Erro ao buscar aparelhos:', error); // Exibe uma mensagem de erro se a requisição falhar
            }
        };

        fetchAparelhos(); // Chama a função para buscar aparelhos
    }, []); // O array vazio garante que o efeito só seja executado uma vez, quando o componente é montado

    /**
        * Atualiza o estado do formulário com base nas alterações feitas pelo usuário em um campo de input.
        * 
        * - Obtém o nome e o valor do campo que foi alterado a partir do evento `e`.
        * - Atualiza o estado `formData` mantendo os valores atuais e substituindo o valor do campo alterado.
        * 
        * @function handleChange
        * 
        * @param {Object} e - O evento de mudança do input.
        * @param {string} e.target.name - O nome do campo de input que disparou o evento (usado como chave no estado).
        * @param {string} e.target.value - O valor atual do campo de input (usado para atualizar o valor no estado).
        * 
        * @example
        * // Chama a função quando o usuário altera um campo do formulário
        * handleChange({ target: { name: 'nomeAparelho', value: 'Novo Aparelho' } });
    */
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtém o nome e o valor do campo que foi alterado
        setFormData(prevState => ({
            ...prevState, // Mantém os valores atuais do estado
            [name]: value // Atualiza o valor do campo específico
        }));
    };

    /**
        * Lida com a submissão do formulário de forma assíncrona, evitando o recarregamento da página,
        * e envia os dados do formulário para a API.
        * 
        * - Previne o comportamento padrão do formulário, que seria o recarregamento da página.
        * - Envia os dados do formulário para a API usando a função `cadastrarAparelho` do módulo `AparelhoRequests`.
        * - Exibe uma mensagem de sucesso ao usuário após a confirmação do cadastro.
        * - Em caso de erro durante a requisição, exibe uma mensagem de erro no console.
        * 
        * @async
        * @param {Object} e - O evento de submissão do formulário.
        * @param {EventTarget} e.target - O elemento que disparou o evento.
        * 
        * @throws {Error} Lança um erro se a requisição para cadastrar o aparelho falhar.
        * 
        * @example
        * // Chama a função ao submeter o formulário
        * handleSubmit(event);
    */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        try {
            // Envia os dados do formulário para a API e aguarda a resposta     
            if (await ExerciciosRequests.cadastrarExercicio(formData)) {
                console.log('Exercício cadastrado com sucesso:');
                window.alert(formData.exercicio + ': foi cadastrado com sucesso');
                if (window.confirm(`Deseja ir para a listagem?`))
                    window.location.href = 'http://localhost:5173/Listagem/Exercicio';
                else
                    window.location.reload();
            } else {
                console.log('Erro ao atualizar dados do aparelho');
                window.alert('Erro ao cadastrar exercício'); // Exibe uma mensagem de erro para o usuário
                window.location.reload();
            }
        } catch (error) {
            window.alert('Erro ao cadastrar exercício'); // Exibe uma mensagem de erro para o usuário
            window.location.reload();
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Exercício</h1> {/* Título da seção */}
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para selecionar o aparelho */}
                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <select
                                className="form-control input"
                                value={formData.idAparelho}
                                onChange={handleChange}
                                name="idAparelho"
                                required
                            >
                                <option value="">Selecione o Aparelho</option>
                                {aparelhos.map((aparelho) => (
                                    <option key={aparelho.id_aparelho} value={aparelho.id_aparelho}>
                                        {aparelho.nome_aparelho}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="idAparelho">Aparelho</label>
                        </div>
                    </div>

                    {/* Campo para o nome do exercício */}
                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                type="text"
                                className="form-control input"
                                id="exercicio"
                                placeholder="Exercício"
                                value={formData.exercicio}
                                onChange={handleChange}
                                name="exercicio"
                                required
                            />
                            <label htmlFor="exercicio">Exercício</label>
                        </div>
                    </div>

                    {/* Campo para a carga */}
                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                type="number"
                                className="form-control input"
                                id="carga"
                                placeholder="Carga/Kg"
                                value={formData.carga}
                                onChange={handleChange}
                                name="carga"
                                required
                            />
                            <label htmlFor="carga">Carga/Kg</label>
                        </div>
                    </div>

                    {/* Campo para repetições */}
                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input" id={styles.flutuante}>
                            <input
                                type="number"
                                className="form-control input"
                                id="repeticoes"
                                placeholder="Repetições"
                                value={formData.repeticoes}
                                onChange={handleChange}
                                name="repeticoes"
                                required
                            />
                            <label htmlFor="repeticoes">Repetições</label>
                        </div>
                    </div>

                    {/* Campo para a região do corpo ativada */}
                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                type="text"
                                className="form-control input"
                                id="regiaoCorpoAtiva"
                                placeholder="Região do corpo ativada"
                                value={formData.regiaoCorpoAtiva}
                                onChange={handleChange}
                                name="regiaoCorpoAtiva"
                                required
                            />
                            <label htmlFor="regiaoCorpoAtiva">Região do Corpo Ativada</label>
                        </div>
                    </div>

                    {/* Botão para enviar o formulário */}
                    <button type="submit" className={styles.btn}>
                        Cadastro
                    </button>
                    {/* Botão para acessar a respectiva lista */}
                    <a className={styles.btnListagem} style={{ textDecoration: "none", marginLeft: '5%' }} href="http://localhost:5173/Listagem/Exercicio">
                        Exercícios
                    </a>
                </form>
            </div>
        </div>
    );
}

export default CadastroExercicio; // Exporta o componente para ser utilizado em outras partes da aplicação
