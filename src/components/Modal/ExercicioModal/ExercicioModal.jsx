import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ExercicioRequests from '../../../fetch/ExercicioRequests';

/**
 * Componente responsável por montar o modal do exercício
 * @returns web component
 */
function ExercicioModal({ show, handleClose, onSelectExercicio }) {
    /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [exercicios, setExercicios] = useState([]);

    /**
     * Define o estado inicial para o formulário de pesquisa
     */
    const [termoPesquisa, setTermoPesquisa] = useState('');

    /**
     * Busca lista de exercícios no servidor
     */
    useEffect(() => {
        const fetchExercicios = async () => {
            try {
                const exercicios = await ExercicioRequests.listarExercicio();
                setExercicios(exercicios);
            } catch (error) {
                console.error('Erro ao buscar exercícios: ', error);
            }
        };

        if (show) {
            fetchExercicios();
        }
    }, [show]);

    /**
     * Controla o valor para filtrar os professores por parte do nome
     */
    const filtroExercicios = termoPesquisa
        ? exercicios.filter((exercicio) =>
            exercicio.exercicio.toLowerCase().includes(termoPesquisa.toLowerCase()))
        : exercicios;

    /**
    * Limpa o valor do filtro digitado pelo usuário
    */
    const limpaFiltro = () => {
        setTermoPesquisa('');
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{ backgroundColor: '#343A40', color: '#FFFFFF' }}>
                <Modal.Title>Lista de Exercícios</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#343A40', color: '#FFFFFF' }}>
                <input
                    type="text"
                    placeholder="Buscar professor..."
                    className="form-control mb-3"
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                />

                {exercicios.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th hidden>ID</th>
                                <th>Exercício</th>
                                <th colSpan={2}>Região ativada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtroExercicios.map((exercicio) => (
                                <tr key={exercicio.id_exercicio}>
                                    <td hidden>{exercicio.id_exercicio}</td>
                                    <td>{exercicio.exercicio}</td>
                                    <td>{exercicio.regiao_corpo_ativada}</td>
                                    <td>
                                        <Button
                                            style={{ backgroundColor: 'var(--amareloClaro)', color: 'var(--branco)' }}
                                            onClick={() => {onSelectExercicio(exercicio), limpaFiltro()}}
                                        >
                                            Selecionar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Carregando exercícios...</p>
                )}
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#343A40', color: '#FFFFFF' }}>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ExercicioModal;
