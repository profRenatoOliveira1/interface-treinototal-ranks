import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar o estado do componente
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import AparelhoRequests from '../../fetch/AparelhosRequests'; // Importa o módulo de requisições para a API
import { Route } from 'react-router-dom';

/**
 * Componente funcional para o cadastro de aparelhos
 */
function CadastroAparelho() {
    // Define o estado inicial do formulário com todos os campos vazios
    const [formData, setFormData] = useState({
        idAparelho: '',
        nomeAparelho: '',
        musculoAtivado: ''
    });

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

    const clearForm = () => {
        setFormData({
            idAparelho: '',
            nomeAparelho: '',
            musculoAtivado: ''
        });
    };

    /**
     * Função para lidar com a submissão do formulário
     * @param {Object} e - O evento de submissão do formulário
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        try {
            // Envia os dados do formulário para a API e aguarda a resposta
            const response = await AparelhoRequests.cadastrarAparelho(formData);
            console.log('Aparelho cadastrado com sucesso:', response);
            clearForm();
            window.alert(formData.nomeAparelho + ': foi cadastrado com sucesso'); // Exibe uma mensagem de sucesso
        } catch (error) {
            console.error('Erro ao cadastrar aparelho:', error); // Exibe uma mensagem de erro
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Aparelho</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para o nome do aparelho */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Nome"
                            value={formData.nomeAparelho} // Define o valor do input com base no estado
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="nomeAparelho" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
                            required
                        />
                    </div>
                    {/* Campo para o músculo ativado */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Músculo Ativado"
                            value={formData.musculoAtivado} // Define o valor do input com base no estado
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="musculoAtivado" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
                            required
                        />
                    </div>
                    <button type="submit" className={styles.btn}>
                        Cadastrar
                    </button>
                    <a style={{ textDecoration: "none", marginLeft: '5%' }} href="http://localhost:5173/Listagem/Aparelho" className={styles.btn}>
                        Listagem
                    </a>
                </form>
            </div>
        </div>
    );
}

export default CadastroAparelho; // Exporta o componente para ser utilizado em outras partes da aplicação
