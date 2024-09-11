import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import AparelhoRequests from "../../fetch/AparelhosRequests"; // Importa o módulo de requisições para a API de Aparelhos
import Navegacao from "../Navegacao/Navegacao"

function UpdateAparelho() {
    // usado para navegar entre páginas (redirecionar)
    const navigate = useNavigate();
    // usado para pegar os dados da página anterior (as informações do usuário que foram passadas pela componente Listaparelhos)
    const location = useLocation();
    // recupera as informações que vieram da página anterior e armazena na variável objAparelho
    const objAparelho = location.state.objeto;

    // Cria um estado para armazenar os dados do aparelho e já preenche com as informações recebidas da página anterior
    const [aparelho, setAparelho] = useState({
        id_aparelho: objAparelho.id_aparelho,
        nomeAparelho: objAparelho.nome_aparelho,
        musculoAtivado: objAparelho.musculo_ativado
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
            window.alert(`aparelho ${aparelho.nomeAparelho} atualizado com sucesso`);
            // redireciona o usuário para a página de listagem de aparelhos
            navigate(`/Listagem/aparelho`, { replace: true });
        } else {
            // caso a funçao atualizaraparelho retorne algum erro, é exibido um log
            console.log('Erro ao atualizar dados do aparelho');
        }
    }

    /**
        * Cria um objeto `Date` representando o momento atual e define a hora para o início do dia (meia-noite).
        * 
        * - Cria um novo objeto `Date` com a data e hora atuais.
        * - Define as horas, minutos, segundos e milissegundos para 0, representando o início do dia.
        * 
        * @constant {Date} hoje - O objeto `Date` representando o início do dia atual.
    */
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <>
            <Navegacao />
            <div className={styles.section}>
                <h1 className={styles.h1}>Atualização de Aparelho</h1>
                <div className={styles.container}>
                    <form onSubmit={handleSubmit}>
                        {/* Campo para o nome do aparelho */}
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                className={styles.formStyle}
                                placeholder="Nome do Aparelho"
                                value={aparelho.nomeAparelho} // Define o valor do input com base no estado
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
                                value={aparelho.musculoAtivado} // Define o valor do input com base no estado
                                onChange={handleChange} // Define a função de mudança para atualizar o estado
                                name="musculoAtivado" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
                                required
                            />
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
export default UpdateAparelho;//exporta o componente UpdateAparelho para ser utilizado em outras partes da aplicação
