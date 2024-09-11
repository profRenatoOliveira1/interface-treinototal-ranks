import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar o estado do componente
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import AparelhoRequests from '../../fetch/AparelhosRequests'; // Importa o módulo de requisições para a API
import { Route } from 'react-router-dom';

/**
    * Função `CadastroAparelho` responsável por definir o estado inicial do formulário de cadastro de aparelho,
    * utilizando o hook `useState`.
    * 
    * - Inicializa o estado `formData` com os campos `idAparelho`, `nomeAparelho`, e `musculoAtivado` vazios.
    * 
    * @constant {Object} formData - O estado que armazena os dados do formulário de cadastro de aparelho.
    * @function setFormData - Função para atualizar o estado `formData`.
    * 
    * Campos do estado `formData`:
    * @property {string} idAparelho - Identificador do aparelho (opcional).
    * @property {string} nomeAparelho - Nome do aparelho.
    * @property {string} musculoAtivado - Músculo ativado pelo aparelho.
*/
function CadastroAparelho() {
    // Define o estado inicial do formulário com todos os campos vazios
    const [formData, setFormData] = useState({
        idAparelho: '',        // Campo para o ID do aparelho (opcional, dependendo da implementação)
        nomeAparelho: '',       // Campo para o nome do aparelho
        musculoAtivado: ''      // Campo para o músculo ativado pelo aparelho
    });

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
        * Limpa os campos do formulário, redefinindo o estado `formData` para seus valores iniciais.
        * 
        * - Atualiza o estado `formData` com um novo objeto onde todos os campos são definidos como strings vazias.
        * - Essa função é útil para resetar o formulário após a submissão dos dados ou quando necessário.
        * 
        * @function clearForm
        * 
        * @example
        * // Chama a função para limpar o formulário
        * clearForm();
        * 
        * @constant {Object} formData - O estado do formulário que será redefinido.
        * @constant {string} formData.idAparelho - Campo para o identificador do aparelho, definido como string vazia.
        * @constant {string} formData.nomeAparelho - Campo para o nome do aparelho, definido como string vazia.
        * @constant {string} formData.musculoAtivado - Campo para o músculo ativado pelo aparelho, definido como string vazia.
    */
    const clearForm = () => {
        setFormData({
            idAparelho: '',
            nomeAparelho: '',
            musculoAtivado: ''
        });
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
            const response = await AparelhoRequests.cadastrarAparelho(formData);
            console.log('Aparelho cadastrado com sucesso:', response);
            clearForm();
            window.alert(formData.nomeAparelho + ': foi cadastrado com sucesso'); // Exibe uma mensagem de sucesso
        } catch (error) {
            console.error('Erro ao cadastrar aparelho:', error); // Exibe uma mensagem de erro no console
        }
    };

    //renderização do componente
    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Aparelho</h1> {/* Título da seção */}
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
                    {/* Botão para enviar o formulário */}
                    <button type="submit" className={styles.btn}>
                        Cadastrar
                    </button>
                    {/* Botão para acessar a respectiva lista */}
                    <a className={styles.btnListagem} style={{ textDecoration: "none", marginLeft: '5%' }} href="http://localhost:5173/Listagem/Aparelho">
                        Listagem
                    </a>
                </form>
            </div>
        </div>
    );
}

export default CadastroAparelho; // Exporta o componente CadastroAparelho para ser utilizado em outras partes da aplicação