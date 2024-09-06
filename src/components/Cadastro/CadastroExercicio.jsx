import React, { useState, useEffect } from 'react'; // Importa React e o hook useState para gerenciar o estado do componente
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import ExerciciosRequests from '../../fetch/ExerciciosRequests'; // Importa o módulo de requisições para a API de Exercícios
import AparelhoRequests from '../../fetch/AparelhosRequests'; // Importa o módulo de requisições para a API de Aparelhos

/**
 * Componente funcional para o cadastro de exercícios
 */
function CadastroExercicio() {
    // Define o estado inicial do formulário com todos os campos vazios
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
     * Função para atualizar o estado do formulário conforme o usuário digita
     * @param {Object} e - O evento de mudança do input
     */
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtém o nome e o valor do campo que foi alterado
        setFormData(prevState => ({
            ...prevState, // Mantém os valores atuais do estado
            [name]: value // Atualiza o valor do campo específico
        }));
    };
    /**
     * Função para limpar os campos do formulário
     */
    const clearForm = () => {
        setFormData({
            idAparelho: '',
            exercicio: '',
            carga: '',
            repeticoes: '',
            regiaoCorpoAtiva: ''
        });
    };

    /**
     * Função para lidar com a submissão do formulário
     * @param {Object} e - O evento de submissão do formulário
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        try {
            const response = await ExerciciosRequests.cadastrarExercicio(formData); // Envia os dados do formulário para a API e aguarda a resposta
            console.log('Exercício cadastrado com sucesso:', response);
            clearForm();
            window.alert(formData.exercicio + ': foi cadastrado com sucesso'); // Exibe uma mensagem de sucesso
            setFormData({               // Reseta o estado do formulário após submissão bem-sucedida
                idAparelho: '',
                exercicio: '',
                carga: '',
                repeticoes: '',
                regiaoCorpoAtiva: ''
            });
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
                            value={formData.idAparelho}
                            onChange={handleChange}
                            name="idAparelho"
                            required
                        >
                            <option value="">Selecione o Aparelho</option>
                            {aparelhos.map(aparelho => ( // Mapeia a lista de aparelhos para criar as opções do select
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
                            value={formData.exercicio}
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
                            value={formData.carga}
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
                            value={formData.repeticoes}
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
                            value={formData.regiaoCorpoAtiva}
                            onChange={handleChange}
                            name="regiaoCorpoAtiva"
                            required
                        />
                    </div>
                    {/* Botão para enviar o formulário */}
                    <button type="submit" className={styles.btn}>
                        Cadastrar
                    </button>
                    {/* Botão para acessar a respectiva lista */}
                    <a className={styles.btnListagem} style={{ textDecoration: "none", marginLeft: '5%' }} href="http://localhost:5173/Listagem/Exercicio">
                        Listagem
                    </a>
                </form>
            </div>
        </div>
    );
}

export default CadastroExercicio; // Exporta o componente para ser utilizado em outras partes da aplicação
