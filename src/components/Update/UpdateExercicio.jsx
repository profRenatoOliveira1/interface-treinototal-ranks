import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import ExercicioRequests from "../../fetch/ExercicioRequests";
import Navegacao from "../Navegacao/Navegacao";
import AparelhoRequests from "../../fetch/AparelhoRequests";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { SERVER_ROUTES } from '../../appconfig';

/**
    * Componente funcional para atualizar os dados de um exercício.
    * 
    * - Usa hooks do React (`useState`, `useEffect`, `useLocation`, `useNavigate`) para gerenciar o estado, 
    *   buscar dados e navegar entre páginas.
    * - Inicializa o estado com os dados do exercício recebidos da página anterior e faz uma requisição para 
    *   buscar a lista de aparelhos.
    * - Define funções para lidar com mudanças nos campos de entrada e envio do formulário.
    * - Inclui lógica para atualizar os dados do exercício e redirecionar o usuário após a atualização.
    * 
    * @function UpdateExercicio
    * @returns {JSX.Element} O componente de atualização do exercício.
*/
function UpdateExercicio() {
    // usado para navegar entre páginas (redirecionar)
    const [aparelhos, setAparelhos] = useState([]);
    const navigate = useNavigate();
    // usado para pegar os dados da página anterior (as informações do usuário que foram passadas pela componente Listaparelhos)
    const location = useLocation();
    // recupera as informações que vieram da página anterior e armazena na variável objExercicio
    const objExercicio = location.state.objeto;

    /**
        * Define o estado inicial do objeto `exercicio` com base nos dados do objeto `objExercicio`,
        * utilizando o hook `useState`.
        * 
        * - Cada campo do objeto `exercicio` é preenchido com os valores correspondentes de `objExercicio`.
        * - O identificador do aparelho e as demais propriedades são diretamente atribuídas do objeto `objExercicio`.
        * 
        * @constant {Object} exercicio - O estado que contém as informações do exercício.
        * @function setExercicio - Função para atualizar o estado `exercicio`.
        * 
        * @param {Object} objExercicio - Objeto contendo os dados iniciais do exercício, que são:
        * @param {number} objExercicio.idExercicio - Identificador do exercício.
        * @param {number} objExercicio.idAparelho - Identificador do aparelho associado ao exercício.
        * @param {string} objExercicio.exercicio - Nome ou descrição do exercício.
        * @param {number} objExercicio.carga - Carga utilizada no exercício (em Kg).
        * @param {number} objExercicio.repeticoes - Número de repetições do exercício.
        * @param {string} objExercicio.regiaoCorpoAtivada - Região do corpo ativada pelo exercício.
    */
    const [exercicio, setExercicio] = useState({
        idExercicio: objExercicio.idExercicio,
        idAparelho: objExercicio.idAparelho,
        exercicio: objExercicio.exercicio,
        regiaoCorpoAtivada: objExercicio.regiaoCorpoAtivada
    })

    /**
        * Efeito colateral que executa ao montar o componente.
        * Faz uma requisição assíncrona para buscar a lista de aparelhos e atualiza o estado.
        * 
        * @useEffect
        * 
        * - Chama a função `fetchAparelhos` ao montar o componente para buscar a lista de aparelhos
        *   e armazena a resposta no estado `aparelhos`.
        * - Lida com possíveis erros durante a requisição, exibindo no console.
     */
    useEffect(() => {
        const fetchAparelhos = async () => {
            try {
                const aparelhosData = await AparelhoRequests.ListagemAparelhos();
                if (aparelhosData) {
                    setAparelhos(aparelhosData); // Atualiza o estado com a lista de aparelhos
                }
            } catch (error) {
                console.error('Erro ao buscar aparelhos:', error);
            }
        };

        fetchAparelhos(); // Chama a função para buscar aparelhos
    }, []);

    /**
        * Atualiza o estado do objeto `exercicio` com base nas alterações feitas em um campo de formulário.
        * 
        * @param {Object} e - O evento disparado pela mudança no campo de input.
        * @param {HTMLInputElement} e.target - O elemento de input que disparou o evento.
        * @param {string} e.target.name - O nome do campo de input (usado como chave no estado).
        * @param {string} e.target.value - O valor atual do campo de input (usado para atualizar o valor no estado).
    */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setExercicio(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    /**
        * Lida com o envio do formulário de forma assíncrona, evitando o recarregamento da página,
        * atualiza os dados do exercício e redireciona o usuário após a atualização.
        * 
        * @async
        * @param {Object} e - O evento de submissão do formulário.
        * @param {EventTarget} e.target - O elemento que disparou o evento.
        * 
        * @catch {Error} Lança um erro se a requisição para atualizar o exercício falhar.
    */
    const handleSubmit = async (e) => {
        // evita o recarregamento da página
        e.preventDefault();
        // chama a função atualizarExercicio do arquivo ExercicioAPIService
        if (await ExercicioRequests.atualizarExercicio(exercicio)) {
            // se a função executou sem nenhum problema, é exibido um alerta confirmando a alteração para o usuário
            window.alert(`O exercício ${exercicio.exercicio} foi atualizado com sucesso.`);
            // redireciona o usuário para a página de listagem de exercicios
            navigate(SERVER_ROUTES.LISTAGEM_EXERCICIO, { replace: true });
        } else {
            // caso a funçao atualizarExercicio retorne algum erro, é exibido um log
            console.log('Erro ao atualizar dados do aparelho');
        }
    }

    return (
        <>
            <Navegacao />
            <div className={styles.section}>
                <h1 className={styles.h1}>Atualização de Exercício</h1>
                <div className={styles.container}>
                    <form onSubmit={handleSubmit}>
                        {/* Campo para selecionar o aparelho */}
                        <div className={styles.formGroup}>
                            <FloatingLabel controlId="floatingSelectAparelho" label="Selecione o Aparelho">
                                <Form.Select
                                    value={exercicio.idAparelho}
                                    onChange={handleChange}
                                    name="idAparelho"
                                    aria-label="Seleção de aparelho"
                                    className="input formGroup"
                                    required
                                >
                                    <option value="">Selecione um aparelho</option>
                                    {aparelhos.map((aparelho) => (
                                        <option key={aparelho.idAparelho} value={aparelho.idAparelho}>
                                            {aparelho.nomeAparelho}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </div>

                        {/* Campo para o nome do exercício */}
                        <div className={styles.formGroup}>
                            <div className="form-floating mb-3 input">
                                <input
                                    type="text"
                                    className="form-control input"
                                    id="exercicio"
                                    placeholder="Exercício"
                                    value={exercicio.exercicio}
                                    onChange={handleChange}
                                    name="exercicio"
                                    required
                                />
                                <label htmlFor="exercicio">Exercício</label>
                            </div>
                        </div>

                        {/* Campo para a região do corpo ativada */}
                        <div className={styles.formGroup}>
                            <div className="form-floating mb-3 input">
                                <input
                                    type="text"
                                    className="form-control input"
                                    id="regiaoCorpoAtivada"
                                    placeholder="Região do corpo ativada"
                                    value={exercicio.regiaoCorpoAtivada}
                                    onChange={handleChange}
                                    name="regiaoCorpoAtivada"
                                    required
                                />
                                <label htmlFor="regiaoCorpoAtivada">Região do Corpo Ativada</label>
                            </div>
                        </div>
                        {/* Botão para enviar o formulário */}
                        <button type="submit" className={styles.btn}>
                            Atualizar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

//exporta o componente UpdateExercicio para ser utilizado em outras partes da aplicação
export default UpdateExercicio;
