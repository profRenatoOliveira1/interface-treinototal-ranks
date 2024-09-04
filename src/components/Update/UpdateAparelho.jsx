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

    // Função para atualizar os valores conforme os inputs do formulário são preenchidos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAparelho(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Função para atualizar os dados do aparelho no banco de dados
    const handleSubmit = async (e) => {
        // evita o recarregamento da página
        console.table(aparelho);
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

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <>
            <Navegacao />
            <div className={styles.section}>
                <h1 className={styles.h1}>Atualizar de Aparelho</h1>
                <div className={styles.container}>
                    <form onSubmit={handleSubmit}>
                        {/* Campo para o nome do aparelho */}
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                className={styles.formStyle}
                                placeholder="Nome"
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
                            enviar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default UpdateAparelho;//exporta o componente UpdateAparelho para ser utilizado em outras partes da aplicação
