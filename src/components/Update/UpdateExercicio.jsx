import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import ExerciciosRequests from "../../fetch/ExerciciosRequests";
import Navegacao from "../Navegacao/Navegacao";
import AparelhosRequests from "../../fetch/AparelhosRequests";
function UpdateExercicio() {
    // usado para navegar entre páginas (redirecionar)
    const [aparelhos, setAparelhos] = useState([]);

    const navigate = useNavigate();
    // usado para pegar os dados da página anterior (as informações do usuário que foram passadas pela componente Listaparelhos)
    const location = useLocation();
    // recupera as informações que vieram da página anterior e armazena na variável objExercicio
    const objExercicio = location.state.objeto;

    // Cria um estado para armazenar os dados do aparelho e já preenche com as informações recebidas da página anterior
    const [exercicio, setExercicio] = useState({
        // Não pode colocar camel case em ids, caso coloque vai dar erro, falando que coluna não existe. Deve ficar igual ao banco de dados.
        id_exercicio: objExercicio.id_exercicio,
        idAparelho: objExercicio.id_aparelho,
        exercicio: objExercicio.exercicio,
        carga: objExercicio.carga,
        repeticoes: objExercicio.repeticoes,
        regiaoCorpoAtiva: objExercicio.regiao_corpo_ativa
    })

    useEffect(() => {
        const fetchAparelhos = async () => {
            try {
                const aparelhosData = await AparelhosRequests.listarAparelho();
                if (aparelhosData) {
                    setAparelhos(aparelhosData); // Atualiza o estado com a lista de aparelhos
                }
            } catch (error) {
                console.error('Erro ao buscar aparelhos:', error);
            }
        };

        fetchAparelhos(); // Chama a função para buscar aparelhos
    }, []);

    // Função para atualizar os valores conforme os inputs do formulário são preenchidos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setExercicio(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Função para atualizar os dados do aparelho no banco de dados
    const handleSubmit = async (e) => {
        // evita o recarregamento da página
        e.preventDefault();
        // chama a função atualizarAparelho do arquivo aparelhoAPIService
        if (await ExerciciosRequests.atualizarExercicio(exercicio)) {
            // se a função executou sem nenhum problema, é exibido um alerta confirmando a alteração para o usuário
            window.alert(`exercicio ${exercicio.exercicio} atualizado com sucesso`);
            // redireciona o usuário para a página de listagem de aparelhos
            navigate(`/Listagem/exercicio`, { replace: true });
        } else {
            // caso a funçao atualizaraparelho retorne algum erro, é exibido um log
            console.log('Erro ao atualizar dados do aparelho');
        }
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <>
            <Navegacao />
            <div className={styles.section}>
                <h1 className={styles.h1}>Atualização de Exercício</h1>
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
                                {aparelhos.map(aparelho => (
                                    <option key={aparelho.id_aparelho} value={aparelho.id_aparelho}>
                                        {aparelho.nome_aparelho}
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
                        {/* Campo para a carga */}
                        <div className={styles.formGroup}>
                            <input
                                type="number"
                                className={styles.formStyle}
                                placeholder="Carga/Kg"
                                value={exercicio.carga}
                                onChange={handleChange}
                                name="carga"
                                required
                            />
                        </div>
                        {/* Campo para repetições */}
                        <div className={styles.formGroup}>
                            <input
                                type="number"
                                className={styles.formStyle}
                                placeholder="Repetições"
                                value={exercicio.repeticoes}
                                onChange={handleChange}
                                name="repeticoes"
                                required
                            />
                        </div>
                        {/* Campo para a região do corpo ativada */}
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                className={styles.formStyle}
                                placeholder="Região do corpo ativada"
                                value={exercicio.regiaoCorpoAtiva}
                                onChange={handleChange}
                                name="regiaoCorpoAtiva"
                                required
                            />
                        </div>
                        {/* Botão para enviar o formulário */}
                        <button type="submit" className={styles.btn}>
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default UpdateExercicio;//exporta o componente UpdateExercicio para ser utilizado em outras partes da aplicação
