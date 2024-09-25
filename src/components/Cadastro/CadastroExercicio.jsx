import React, { useState, useEffect } from 'react'; 
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import styles from '../styles/StyleCadastro.module.css'; 
import ExerciciosRequests from '../../fetch/ExerciciosRequests'; 
import AparelhoRequests from '../../fetch/AparelhosRequests';

function CadastroExercicio() {
    const [formData, setFormData] = useState({
        idAparelho: '',              
        exercicio: '',               
        carga: '',                   
        repeticoes: '',              
        regiaoCorpoAtiva: ''         
    });

    const [aparelhos, setAparelhos] = useState([]);

    useEffect(() => {
        const fetchAparelhos = async () => {
            try {
                const aparelhosData = await AparelhoRequests.listarAparelho(); 
                if (aparelhosData) {
                    setAparelhos(aparelhosData);
                }
            } catch (error) {
                console.error('Erro ao buscar aparelhos:', error);
            }
        };

        fetchAparelhos();
    }, []); 

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData(prevState => ({
            ...prevState, 
            [name]: value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            if (await ExerciciosRequests.cadastrarExercicio(formData)) {
                console.log('Exercício cadastrado com sucesso:');
                window.alert(formData.exercicio + ': foi cadastrado com sucesso');
                if (window.confirm(`Deseja ir para a listagem?`))
                    window.location.href = 'http://localhost:5173/Listagem/Exercicio';
                else
                    window.location.reload();
            } else {
                console.log('Erro ao atualizar dados do aparelho');
                window.alert('Erro ao cadastrar exercício');
                window.location.reload();
            }
        } catch (error) {
            window.alert('Erro ao cadastrar exercício');
            window.location.reload();
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Exercício</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para selecionar o aparelho com FloatingLabel */}
                    <div className={styles.formGroup}>
                        <FloatingLabel controlId="floatingSelectAparelho" label="Selecione o Aparelho">
                            <Form.Select
                                value={formData.idAparelho}
                                onChange={handleChange}
                                name="idAparelho"
                                aria-label="Seleção de aparelho"
                                className="input formGroup"
                                required
                            >
                                <option value="">Selecione um aparelho</option>
                                {aparelhos.map((aparelho) => (
                                    <option key={aparelho.id_aparelho} value={aparelho.id_aparelho}>
                                        {aparelho.nome_aparelho}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </div>

                    {/* Outros campos do formulário */}
                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                type="text"
                                className="form-control input"
                                id="exercicio"
                                placeholder="Exercício"
                                value={formData.exercicio}
                                onChange={handleChange}
                                name="exercicio"
                                required
                            />
                            <label htmlFor="exercicio">Exercício</label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                type="number"
                                className="form-control input"
                                id="carga"
                                placeholder="Carga/Kg"
                                value={formData.carga}
                                onChange={handleChange}
                                name="carga"
                                required
                            />
                            <label htmlFor="carga">Carga/Kg</label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                type="number"
                                className="form-control input"
                                id="repeticoes"
                                placeholder="Repetições"
                                value={formData.repeticoes}
                                onChange={handleChange}
                                name="repeticoes"
                                required
                            />
                            <label htmlFor="repeticoes">Repetições</label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                type="text"
                                className="form-control input"
                                id="regiaoCorpoAtiva"
                                placeholder="Região do corpo ativada"
                                value={formData.regiaoCorpoAtiva}
                                onChange={handleChange}
                                name="regiaoCorpoAtiva"
                                required
                            />
                            <label htmlFor="regiaoCorpoAtiva">Região do Corpo Ativada</label>
                        </div>
                    </div>

                    <button type="submit" className={styles.btn}>
                        Cadastro
                    </button>
                    <a className={styles.btnListagem} style={{ textDecoration: "none", marginLeft: '5%' }} href="http://localhost:5173/Listagem/Exercicio">
                        Exercícios
                    </a>
                </form>
            </div>
        </div>
    );
}

export default CadastroExercicio;
