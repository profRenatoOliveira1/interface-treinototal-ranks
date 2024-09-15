import { useState } from "react";
import ProfessoresRequests from "../../fetch/ProfessoresRequests";
import style from '../styles/StyleCadastro.module.css';

function UpdateSenhaProfessor() {
    const [formSenha, setFormSenha] = useState({
        idProfessor: localStorage.getItem('id_professor'),
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
    });
    console.log(formSenha.idProfessor)
    /**
     * Atualiza o estado do formulário conforme o preenchimento do usuário
     * @param {*} e evento de atualização
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormSenha(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    /**
     * Lida com o envio do formulário
     * @param {*} e evento de atualização
     * @returns **true** caso cadastro sucesso, **false** caso erro no cadastro
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formSenha.novaSenha === formSenha.confirmarSenha) {
            try {
                const response = await ProfessoresRequests.UpdateSenhaProfessor(formSenha);
                if (response) {
                    console.log('Senha atualizada com sucesso', response);
                    window.alert('Senha atualizada com sucesso');
                    window.location.reload();
                }
            } catch (error) {
                console.error('Erro ao atualizra senha do professor:', error);
            }
        } else {
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
                                name="senhaAtual"
                                value={formSenha.senhaAtual}
                                onChange={handleChange}
                                className={style.formStyle}
                                placeholder="Informe a senha atual"
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label className={style.labelForm}>Nova Senha</label>
                            <input
                                type="password"
                                name="novaSenha"
                                value={formSenha.novaSenha}
                                onChange={handleChange}
                                className={style.formStyle}
                                placeholder="Informe a nova senha"
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label className={style.labelForm}>Confirme Nova Senha</label>
                            <input
                                type="password"
                                name="confirmarSenha"
                                value={formSenha.confirmarSenha}
                                onChange={handleChange}
                                className={style.formStyle}
                                placeholder="Confirme a nova senha"
                            />
                        </div>


                        <button type="submit" className={style.btn}>Atualizar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateSenhaProfessor;