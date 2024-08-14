import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import ExerciciosRequests from '../../fetch/ExerciciosRequests'; // Importa o módulo de requisições para a API de Exercícios
import AparelhoRequests from '../../fetch/AparelhosRequests'; // Importa o módulo de requisições para a API de Aparelhos

/**
 * Componente funcional para o cadastro de exercícios
 */
function CadastroExercicio() {
    // Define o estado inicial do formulário com todos os campos vazios
    const [formData, setFormData] = useState({
        id_aparelho: '',
        exercicio: '',
        carga: '',
        repeticoes: '',
        regiao_corpo_ativa: ''
    });

    // Define o estado inicial para a lista de aparelhos
    const [aparelhos, setAparelhos] = useState([]);

    // Hook useEffect para buscar a lista de aparelhos quando o componente é montado
    useEffect(() => {
        const fetchAparelhos = async () => {
            try {
                const aparelhosData = await AparelhoRequests.listarAparelho();
                if (aparelhosData) {
                    console.log(aparelhosData);
                    setAparelhos(aparelhosData); // Atualiza o estado com a lista de aparelhos
                }
            } catch (error) {
                console.error('Erro ao buscar aparelhos:', error);
            }
        };

        fetchAparelhos(); // Chama a função para buscar aparelhos
    }, []);

    /**
     * Função para atualizar o estado do formulário conforme o usuário digita
     * @param {Object} e - O evento de mudança do input
     */

    const handleChange = (e) => {
        const { name, value } = e.target; // Obtém o nome e o valor do campo que foi alterado
        console.log(name, value);
        setFormData(prevState => ({
            ...prevState, // Mantém os valores atuais do estado
            [name]: value // Atualiza o valor do campo específico
        }));
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
            window.alert(formData.exercicio + ': foi cadastrado com sucesso'); // Exibe uma mensagem de sucesso
            setFormData({
                id_aparelho: '',
                exercicio: '',
                carga: '',
                repeticoes: '',
                regiao_corpo_ativa: ''
            }); // Reseta o estado do formulário após submissão bem-sucedida
        } catch (error) {
            console.error('Erro ao cadastrar exercício:', error);
            window.alert('Erro ao cadastrar exercício');
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Exercício</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para selecionar o aparelho */}
                    <div className={styles.formGroup}>
                        <select
                            className={styles.formStyle}
                            value={formData.id_aparelho}
                            onChange={handleChange}
                            name="id_aparelho"
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
                            value={formData.regiao_corpo_ativa}
                            onChange={handleChange}
                            name="regiao_corpo_ativa"
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
    );
}

export default CadastroExercicio; // Exporta o componente para ser utilizado em outras partes da aplicação
