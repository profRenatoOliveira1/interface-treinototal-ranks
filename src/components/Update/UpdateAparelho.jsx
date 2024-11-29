import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import AparelhoRequests from "../../fetch/AparelhoRequests"; // Importa o módulo de requisições para a API de Aparelhos
import Navegacao from "../Navegacao/Navegacao"
import { SERVER_ROUTES } from '../../appconfig';

/**
 * Componente funcional para atualizar os dados de um aparelho.
 * 
 * - Usa hooks do React (`useState`, `useLocation`, `useNavigate`) para gerenciar o estado e navegação.
 * - Inicializa o estado com os dados do aparelho recuperados da página anterior.
 * - Define funções para lidar com mudanças nos campos de entrada e envio do formulário.
 * - Inclui lógica para atualizar os dados do aparelho e redirecionar o usuário após a atualização.
 * 
 * @function UpdateAparelho
 * @returns {JSX.Element} O componente de atualização do aparelho.
 */
function UpdateAparelho() {
    // usado para navegar entre páginas (redirecionar)
    const navigate = useNavigate();
    // usado para pegar os dados da página anterior (as informações do usuário que foram passadas pela componente Listaparelhos)
    const location = useLocation();
    // recupera as informações que vieram da página anterior e armazena na variável objAparelho
    const objAparelho = location.state.objeto;

    /**
        * Define o estado inicial do objeto `aparelho` com base nos dados do objeto `objAparelho`,
        * utilizando o hook `useState`.
        * 
        * - Cada campo do objeto `aparelho` é preenchido com os valores correspondentes de `objAparelho`.
        * 
        * @constant {Object} aparelho - O estado que contém as informações do aparelho.
        * @function setAparelho - Função para atualizar o estado `aparelho`.
        * 
        * @param {Object} objAparelho - Objeto contendo os dados iniciais do aparelho, que são:
        * @param {number} objAparelho.id_aparelho - Identificador do aparelho.
        * @param {string} objAparelho.nome_aparelho - Nome do aparelho.
        * @param {string} objAparelho.musculo_ativado - Músculo ativado pelo aparelho.
    */
    const [aparelho, setAparelho] = useState({
        idAparelho: objAparelho.idAparelho,
        nomeAparelho: objAparelho.nomeAparelho,
        musculoAtivado: objAparelho.musculoAtivado
    })

    /**
        * Atualiza o estado do objeto `aparelho` com base nas alterações feitas em um campo de formulário.
        * 
        * @param {Object} e - O evento disparado pela mudança no campo de input.
        * @param {HTMLInputElement} e.target - O elemento de input que disparou o evento.
        * @param {string} e.target.name - O nome do campo de input (usado como chave no estado).
        * @param {string} e.target.value - O valor atual do campo de input (usado para atualizar o valor no estado).
    */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAparelho(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    /**
        * Lida com o envio do formulário de forma assíncrona, evitando o recarregamento da página,
        * atualiza os dados do aparelho e redireciona o usuário após a atualização.
        * 
        * @async
        * @param {Object} e - O evento de submissão do formulário.
        * @param {EventTarget} e.target - O elemento que disparou o evento.
        * 
        * @throws {Error} Lança um erro se a requisição para atualizar o aparelho falhar.
    */
    const handleSubmit = async (e) => {
        // evita o recarregamento da página
        e.preventDefault();
        // chama a função atualizarAparelho do arquivo aparelhoAPIService
        if (await AparelhoRequests.atualizarAparelho(aparelho)) {
            // se a função executou sem nenhum problema, é exibido um alerta confirmando a alteração para o usuário
            window.alert(`O aparelho ${aparelho.nomeAparelho} foi atualizado com sucesso.`);
            // redireciona o usuário para a página de listagem de aparelhos
            navigate(SERVER_ROUTES.LISTAGEM_APARELHO, { replace: true });
        } else {
            // caso a funçao atualizaraparelho retorne algum erro, é exibido um log
            console.log('Erro ao atualizar dados do aparelho');
        }
    }

    return (
        <>
            <Navegacao />
            <div className={styles.section}>
                <h1 className={styles.h1}>Atualização de Aparelho</h1>
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
                                    value={aparelho.nomeAparelho}
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
                                    value={aparelho.musculoAtivado}
                                    onChange={handleChange}
                                    name="musculoAtivado"
                                    required
                                />
                                <label htmlFor="labelMusculoAtivado">Músculo Ativado</label>
                            </div>
                        </div>
                        <button type="submit" className={styles.btn}>
                            Atualizar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

//exporta o componente UpdateAparelho para ser utilizado em outras partes da aplicação
export default UpdateAparelho;
