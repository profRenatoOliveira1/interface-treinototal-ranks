import React, { useState, useEffect } from 'react'; // Importa React e o hook useState para gerenciar o estado do componente
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import ExercicioRequests from '../../fetch/ExercicioRequests'; // Importa o módulo de requisições para a API de Exercícios
import AparelhoRequests from '../../fetch/AparelhoRequests'; // Importa o módulo de requisições para a API de Aparelhos
import { SERVER_ROUTES } from '../../appconfig';

function CadastroExercicio() {

    /**
     * Define o estado inicial do formulário com todos os campos vazios.
     * Utiliza o hook `useState` para gerenciar o estado do formulário.
     * 
     * - Cada campo do objeto `exercicio` representa um atributo do exercício e é inicializado como uma string vazia.
     * 
     * @constant {Object} exercicio - O estado que contém as informações do formulário.
     * @function setexercicio - Função para atualizar o estado `exercicio`.
     * 
     * @param {Object} exercicio - Objeto contendo os dados do formulário, com os seguintes campos:
     * @param {string} exercicio.idAparelho - ID do aparelho associado ao exercício.
     * @param {string} exercicio.exercicio - Nome do exercício.
     * @param {string} exercicio.carga - Carga em kg do exercício.
     * @param {string} exercicio.repeticoes - Número de repetições do exercício.
     * @param {string} exercicio.regiaoCorpoAtivada - Região do corpo ativada pelo exercício.
     */
    const [exercicio, setexercicio] = useState({
        idAparelho: '',              // Campo para o ID do aparelho
        exercicio: '',               // Campo para o nome do exercício
        regiaoCorpoAtivada: ''         // Campo para a região do corpo ativada
    });

    /** 
     * Define o estado para armazenar a lista de aparelhos disponíveis.
     * 
     * - O estado `aparelhos` armazena os dados recebidos da API, que serão usados
     *   para preencher o campo de seleção de aparelhos no formulário.
     * 
     * @constant {Array} aparelhos - Estado que contém a lista de aparelhos.
     * @function setAparelhos - Função para atualizar o estado `aparelhos`.
     */
    const [aparelhos, setAparelhos] = useState([]);

    /**
     * Hook useEffect para buscar a lista de aparelhos quando o componente é montado.
     * 
     * - A função `fetchAparelhos` faz uma requisição assíncrona para a API, buscando
     *   a lista de aparelhos e atualizando o estado `aparelhos` com os dados recebidos.
     * - Caso haja um erro na requisição, ele é capturado e exibido no console.
     * 
     * @async
     * @function fetchAparelhos - Função que busca aparelhos da API.
     */
    useEffect(() => {
        const fetchAparelhos = async () => {
            try {
                const aparelhosData = await AparelhoRequests.ListagemAparelhos(); // Busca a lista de aparelhos da API
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
     * - Atualiza o estado `exercicio` mantendo os valores atuais e substituindo o valor do campo alterado.
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
        setexercicio(prevState => ({
            ...prevState, // Mantém os valores atuais do estado
            [name]: value // Atualiza o valor do campo específico
        }));
    };

    /**
     * Limpa os campos do formulário, redefinindo o estado `exercicio` para seus valores iniciais.
     * 
     * - Atualiza o estado `exercicio` para um objeto com todos os campos definidos como strings vazias.
     * - Esse método é útil para resetar o formulário após a submissão ou quando necessário.
     * 
     * @function clearForm
     * 
     * @example
     * // Chama a função para limpar o formulário
     * clearForm();
     */
    const clearForm = () => {
        setexercicio({
            idAparelho: '',
            exercicio: '',
            regiaoCorpoAtivada: ''
        });
    };

    /**
     * Lida com a submissão do formulário de forma assíncrona, evitando o recarregamento da página,
     * e envia os dados do formulário para a API.
     * 
     * - Previne o comportamento padrão do formulário, que seria o recarregamento da página.
     * - Envia os dados do formulário para a API usando a função `cadastrarExercicio` do módulo `ExerciciosRequests`.
     * - Exibe uma mensagem de sucesso ao usuário após a confirmação do cadastro.
     * - Em caso de erro durante a requisição, exibe uma mensagem de erro no console e na interface.
     * 
     * @async
     * @param {Object} e - O evento de submissão do formulário.
     * @param {EventTarget} e.target - O elemento que disparou o evento.
     * 
     * @throws {Error} Lança um erro se a requisição para cadastrar o exercício falhar.
     * 
     * @example
     * // Chama a função ao submeter o formulário
     * handleSubmit(event);
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        try {
            if (ExercicioRequests.cadastrarExercicio(exercicio)) {
                console.log('Exercício cadastrado com sucesso:'); // Confirmação de sucesso no console
                clearForm(); // Limpa o formulário após o cadastro
                window.alert(exercicio.exercicio + ': foi cadastrado com sucesso'); // Exibe uma mensagem de sucesso

                if (window.confirm(`Deseja ir para a listagem?`))
                    window.location.href = SERVER_ROUTES.LISTAGEM_EXERCICIO;
                else
                    window.location.reload();
            } else {
                console.log('Erro ao atualizar dados do exercício'); // Mensagem de erro no console
            }
        } catch (error) {
            console.error('Erro ao cadastrar exercício:', error); // Exibe uma mensagem de erro no console
            window.alert('Erro ao cadastrar exercício'); // Exibe uma mensagem de erro para o usuário
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Exercício</h1> {/* Título da seção */}
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para selecionar o aparelho */}
                    <div className={styles.formGroup}>
                        <select
                            className={styles.formStyle}
                            value={exercicio.idAparelho}
                            onChange={handleChange}
                            name="idAparelho"
                            required
                        >
                            <option value="">Selecione o Aparelho</option>
                            {aparelhos.map(aparelho => ( // Mapeia a lista de aparelhos para criar as opções do select
                                <option key={aparelho.idAparelho} value={aparelho.idAparelho}>
                                    {aparelho.nomeAparelho}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Campo para o nome do exercício */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Exercício"
                            value={exercicio.exercicio}
                            onChange={handleChange}
                            name="exercicio"
                            required
                        />
                    </div>
                    {/* Campo para a região do corpo ativada */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Região do corpo ativada"
                            value={exercicio.regiaoCorpoAtivada}
                            onChange={handleChange}
                            name="regiaoCorpoAtivada"
                            required
                        />
                    </div>
                    {/* Botão para enviar o formulário */}
                    <button type="submit" className={styles.btn}>
                        Cadastrar
                    </button>
                    {/* Botão para acessar a respectiva lista */}
                    <a className={styles.btnListagem} style={{ textDecoration: "none", marginLeft: '5%' }} href={SERVER_ROUTES.LISTAGEM_EXERCICIO}>
                        Listagem
                    </a>
                </form>
            </div>
        </div>
    );
}

// Exporta o componente para ser utilizado em outras partes da aplicação
export default CadastroExercicio; 