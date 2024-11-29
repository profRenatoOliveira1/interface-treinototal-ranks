import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar o estado do componente
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import AparelhoRequests from '../../fetch/AparelhoRequests'; // Importa o módulo de requisições para a API
import { SERVER_ROUTES } from '../../appconfig';

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
            if (await AparelhoRequests.cadastrarAparelho(formData)) {
                console.log('Aparelho cadastrado com sucesso:');
                window.alert(formData.nomeAparelho + ': foi cadastrado com sucesso');
                if (window.confirm(`Deseja ir para a listagem?`)) 
                    window.location.href = SERVER_ROUTES.LISTAGEM_APARELHO;
                else
                    window.location.reload();
            } else {
                window.alert('Erro ao cadastrar aparelho'); // Exibe uma mensagem de erro para o usuário
                window.location.reload();
            }
        } catch (error) {
            window.alert('Erro ao cadastrar aparelho'); // Exibe uma mensagem de erro para o usuário
            window.location.reload();
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
                        <div className="form-floating mb-3 input">
                            <input
                                className="form-control input"
                                id="labelNomeAparelho"
                                type="text"
                                placeholder="Nome do aparelho"
                                value={formData.nomeAparelho}
                                onChange={handleChange}
                                name="nomeAparelho"
                                required
                            />
                            <label htmlFor="labelNomeAparelho">Nome do aparelho</label>
                        </div>
                    </div>
                    {/* Campo para o músculo ativado */}
                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                className="form-control input"
                                id="labelMusculoAtivado"
                                type="text"
                                placeholder="Músculo Ativado"
                                value={formData.musculoAtivado}
                                onChange={handleChange}
                                name="musculoAtivado"
                                required
                            />
                            <label htmlFor="labelMusculoAtivado">Músculo Ativado</label>
                        </div>
                    </div>
                    {/* Botão para enviar o formulário */}
                    <button type="submit" className={styles.btn}>
                        Cadastro
                    </button>
                    {/* Botão para acessar a respectiva lista */}
                    <a className={styles.btnListagem} style={{ textDecoration: "none", marginLeft: '5%' }} href={SERVER_ROUTES.LISTAGEM_APARELHO}>
                        Aparelhos
                    </a>
                </form>
            </div>
        </div>
    );
}

// Exporta o componente CadastroAparelho para ser utilizado em outras partes da aplicação
export default CadastroAparelho; 