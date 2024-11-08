import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FaTrash } from "react-icons/fa";
import AlunoModal from '../Modal/AlunoModal/AlunoModal';
import ProfessorModal from '../Modal/ProfessorModal/ProfessorModal';
import ExercicioModal from '../Modal/ExercicioModal/ExercicioModal';
import TreinoRequests from '../../fetch/TreinoRequests';
import styles from '../styles/CadastroTreino.module.css';

/**
 * Componente responsável por montar o formulário de cadastro do treino
 * @returns web component
 */
function CadastroTreino() {
    /**
     * Controla o estado de exibição dos modais
     */
    const [showAlunoModal, setShowAlunoModal] = useState(false);
    const [showProfessorModal, setShowProfessorModal] = useState(false);
    const [showExercicioModal, setShowExercicioModal] = useState(false);

    /**
     * Controla os valores selecionados das entidades
     */
    const [selectedAluno, setSelectedAluno] = useState(null);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [selectedExercicios, setSelectedExercicios] = useState([]);

    /**
     * Atualiza o estado do modal Aluno
     * @returns **true** habilita o modal, **false** desabilita o modal
     */
    const handleShowAlunoModal = () => setShowAlunoModal(true);
    const handleCloseAlunoModal = () => setShowAlunoModal(false);

    /**
     * Atualiza o estado do modal Professor
     * @returns **true** habilita o modal, **false** desabilita o modal
     */
    const handleShowProfessorModal = () => setShowProfessorModal(true);
    const handleCloseProfessorModal = () => setShowProfessorModal(false);

    /**
     * Atualiza o estado do modal Exercício
     * @returns **true** habilita o modal, **false** desabilita o modal
     */
    const handleShowExercicioModal = () => setShowExercicioModal(true);
    const handleCloseExercicioModal = () => setShowExercicioModal(false);

    /**
     * Atualiza o estado do aluno selecionado modal
     * @param {*} aluno selecionado
     */
    const handleSelectAluno = (aluno) => {
        setSelectedAluno(aluno);
        handleCloseAlunoModal();
    };

    /**
     * Atualiza o estado do professor selecionado modal
     * @param {*} professor selecionado
     */
    const handleSelectProfessor = (professor) => {
        setSelectedProfessor(professor);
        handleCloseProfessorModal();
    };

    /**
     * Atualiza o estado do exercício selecionado modal
     * @param {*} exercicio selecionado
     */
    const handleSelectExercicio = (exercicio) => {
        setSelectedExercicios([...selectedExercicios, {
            idExercicio: exercicio.idExercicio,
            nome: exercicio.exercicio,
            repeticoes: '',
            carga: '',
            series: ''
        }]);
        handleCloseExercicioModal();
    };

    /**
     * Atualiza o estado do formulário conforme o preenchimento do usuário
     * @param {*} e evento de atualização
     */
    const handleInputChange = (index, field, value) => {
        const newSelectedExercicios = [...selectedExercicios];
        newSelectedExercicios[index][field] = value;
        setSelectedExercicios(newSelectedExercicios);
    };

    /**
     * Remove o exercício da lista
     * @param {*} index índice da lista
     */
    const handleRemoveExercicio = (index) => {
        const newSelectedExercicios = selectedExercicios.filter((_, i) => i !== index);
        setSelectedExercicios(newSelectedExercicios);
    };

    /**
     * Lida com o envio do formulário
     * @param {*} e evento de atualização
     * @returns **true** caso cadastro sucesso, **false** caso erro no cadastro
     */
    const cadastrar = async () => {
        const treino = {
            idAluno: selectedAluno.idAluno,
            idProfessor: selectedProfessor.idProfessor,
            exercicios: selectedExercicios
        };

        try {
            const result = await TreinoRequests.cadastrarTreino(treino);
            if (result) {
                alert('Treino cadastrado com sucesso!');
                location.reload();
            }
        } catch (error) {
            alert('Erro ao cadastrar treino!');
        }
    };

    return (
        <div className={styles.cadastroTreino}>
            <div className={styles.header}>
                <h1 className={styles.h1}>Cadastro Treino</h1>
            </div>

            <div className={styles.selections}>
                <div style={{ width: '25%'}}>
                    <Button variant="outline-light" onClick={handleShowAlunoModal} className={styles.botaoSelecao}>
                        Escolher Aluno
                    </Button>
                    <div className={styles.selected}>{selectedAluno?.nome}</div>
                </div>

                <div style={{ width: '30%', margin: 'auto auto'}}>
                    <Button variant="outline-light" onClick={handleShowProfessorModal} className={styles.botaoSelecao}>
                        Escolher Professor
                    </Button>
                    <div className={styles.selected}>{selectedProfessor?.nome}</div>
                </div>

                <div style={{ width: '20%'}}>
                    <Button variant="outline-light" onClick={handleShowExercicioModal} className={styles.botaoSelecao}>
                        Escolher Exercício
                    </Button>
                </div>
            </div>

            {selectedExercicios.length > 0 && (
                <Table  className={styles.table}>
                    <thead>
                        <tr>
                            <th>Exercício</th>
                            <th style={{ width: '10%'}}>Repetições</th>
                            <th style={{ width: '10%'}}>Carga</th>
                            <th style={{ width: '10%'}}>Séries</th>
                            <th style={{ width: '10%'}}>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedExercicios.map((exercicio, index) => (
                            <tr key={index}>
                                <td>{exercicio.nome}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercicio.repeticoes}
                                        onChange={(e) => handleInputChange(index, 'repeticoes', e.target.value)}
                                        className={styles.input}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercicio.carga}
                                        onChange={(e) => handleInputChange(index, 'carga', e.target.value)}
                                        className={styles.input}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercicio.series}
                                        onChange={(e) => handleInputChange(index, 'series', e.target.value)}
                                        className={styles.input}
                                    />
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemoveExercicio(index)} className={styles.removeButton}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <button onClick={cadastrar} className={styles.btn}>
                        Cadastrar
            </button>
            <AlunoModal
                show={showAlunoModal}
                handleClose={handleCloseAlunoModal}
                onSelectAluno={handleSelectAluno}
            />

            <ProfessorModal 
                show={showProfessorModal}
                handleClose={handleCloseProfessorModal}
                onSelectProfessor={handleSelectProfessor}
            />

            <ExercicioModal 
                show={showExercicioModal}
                handleClose={handleCloseExercicioModal}
                onSelectExercicio={handleSelectExercicio}
            />
        </div>
    );
}

export default CadastroTreino;
