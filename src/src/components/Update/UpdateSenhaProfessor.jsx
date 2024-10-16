// Importa o hook useState do React para gerenciar o estado local
import { useState } from "react";
// Importa as requisições para a API de professores
import ProfessoresRequests from "../../fetch/ProfessoresRequests";
// Importa os estilos CSS específicos para o componente
import style from '../styles/StyleCadastro.module.css';

// Componente funcional para atualizar a senha do professor
function UpdateSenhaProfessor() {
    // Estado inicial do formulário com as senhas do professor
    const [formSenha, setFormSenha] = useState({
        idProfessor: localStorage.getItem('id_professor'), // Obtém o ID do professor do localStorage
        senhaAtual: '', // Inicializa a senha atual como vazia
        novaSenha: '', // Inicializa a nova senha como vazia
        confirmarSenha: '' // Inicializa a confirmação da nova senha como vazia
    });

    console.log(formSenha.idProfessor); // Log do ID do professor para debug

    /**
     * Atualiza o estado do formulário conforme o preenchimento do usuário
     * @param {*} e evento de atualização
     */
    const handleChange = (e) => {
        const { name, value } = e.target; // Desestrutura o nome e valor do campo
        setFormSenha(prevState => ({
            ...prevState, // Mantém o estado anterior
            [name]: value // Atualiza o valor do campo correspondente
        }));
    };

    /**
     * Lida com o envio do formulário
     * @param {*} e evento de envio do formulário
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão de envio do formulário
        
        // Verifica se a nova senha e a confirmação são iguais
        if (formSenha.novaSenha === formSenha.confirmarSenha) {
            try {
                // Chama a função para atualizar a senha do professor na API
                const response = await ProfessoresRequests.UpdateSenhaProfessor(formSenha);
                if (response) {
                    console.log('Senha atualizada com sucesso', response); // Log para debug
                    window.alert('Senha atualizada com sucesso'); // Alerta de sucesso
                    window.location.reload(); // Recarrega a página
                }
            } catch (error) {
                console.error('Erro ao atualizar senha do professor:', error); // Log de erro
            }
        } else {
            // Alerta caso as senhas não conferem
            alert('As senhas não conferem.');
        }
    };

    return (
        <>
            <div className={style.section}>
                <h1 className={style.h1}>Atualizar senha</h1>

                <div className={style.container}>
                    <form onSubmit={handleSubmit}>
                        <div className={style.formGroup}>
                            <label className={style.labelForm}>Senha Atual</label>
                            <input
                                type="password"
                                name="senhaAtual" // Nome do campo para o estado
                                value={formSenha.senhaAtual} // Valor do campo
                                onChange={handleChange} // Função chamada ao mudar o valor
                                className={style.formStyle} // Classe de estilo para o input
                                placeholder="Informe a senha atual" // Placeholder do campo
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label className={style.labelForm}>Nova Senha</label>
                            <input
                                type="password"
                                name="novaSenha" // Nome do campo para o estado
                                value={formSenha.novaSenha} // Valor do campo
                                onChange={handleChange} // Função chamada ao mudar o valor
                                className={style.formStyle} // Classe de estilo para o input
                                placeholder="Informe a nova senha" // Placeholder do campo
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label className={style.labelForm}>Confirme Nova Senha</label>
                            <input
                                type="password"
                                name="confirmarSenha" // Nome do campo para o estado
                                value={formSenha.confirmarSenha} // Valor do campo
                                onChange={handleChange} // Função chamada ao mudar o valor
                                className={style.formStyle} // Classe de estilo para o input
                                placeholder="Confirme a nova senha" // Placeholder do campo
                            />
                        </div>

                        {/* Botão para enviar o formulário */}
                        <button type="submit" className={style.btn}>Atualizar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

// Exporta o componente UpdateSenhaProfessor para uso em outras partes do código
export default UpdateSenhaProfessor;
