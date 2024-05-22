import React, { useState } from 'react';
import styles from './CadastroExercicio.module.css';
import ExerciciosRequests from '../../fetch/ExerciciosRequests';

// Componente funcional CadastroExercicio
function CadastroExercicio() {
    // Definição do estado inicial do formulário com useState
    const [formData, setFormData] = useState({
        id_aparelho: '',
        exercicio: '',
        carga: '',
        repeticoes: '',
        regiao_corpo_ativa: ''
    });

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Atualiza o estado com o novo valor do campo modificado
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página
        try {
            // Envia os dados do formulário para a API
            const response = await ExerciciosRequests.cadastrarExercicio(formData);
            console.log('Exercício cadastrado com sucesso:', response);
            // Mostra um alerta de sucesso para o usuário
            window.alert(formData.exercicio + ': foi cadastrado com sucesso');
            // Reseta os campos do formulário
            setFormData({
                id_aparelho: '',
                exercicio: '',
                carga: '',
                repeticoes: '',
                regiao_corpo_ativa: ''
            });
        } catch (error) {
            // Mostra um alerta de erro para o usuário em caso de falha
            console.error('Erro ao cadastrar exercício:', error);
            window.alert('Erro ao cadastrar exercício');
        }
    };

    // Renderização do formulário
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.h1}>Cadastro de Exercício</h1>
                <form onSubmit={handleSubmit}>
                    {/* Campo para id_aparelho */}
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            className={styles.formStyle}
                            placeholder="id_aparelho"
                            value={formData.id_aparelho}
                            onChange={handleChange}
                            name="id_aparelho"
                        />
                    </div>
                    {/* Campo para nome do exercício */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="exercicio"
                            value={formData.exercicio}
                            onChange={handleChange}
                            name="exercicio"
                        />
                    </div>
                    {/* Campo para carga */}
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            className={styles.formStyle}
                            placeholder="carga"
                            value={formData.carga}
                            onChange={handleChange}
                            name="carga"
                        />
                    </div>
                    {/* Campo para repetições */}
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            className={styles.formStyle}
                            placeholder="repeticoes"
                            value={formData.repeticoes}
                            onChange={handleChange}
                            name="repeticoes"
                        />
                    </div>
                    {/* Campo para região do corpo ativa */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="regiao_corpo_ativa"
                            value={formData.regiao_corpo_ativa}
                            onChange={handleChange}
                            name="regiao_corpo_ativa"
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

export default CadastroExercicio;
