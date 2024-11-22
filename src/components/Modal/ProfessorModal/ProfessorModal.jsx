import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProfessoresRequests from '../../../fetch/ProfessorRequests';

/**
 * Componente responsável por montar o modal do aluno
 * @returns web component
 */
function ProfessorModal({ show, handleClose, onSelectProfessor }) {
    /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [professores, setProfessores] = useState([]);

    /**
     * Define o estado inicial para o formulário de pesquisa
     */
    const [termoPesquisa, setTermoPesquisa] = useState('');

    /**
     * Busca lista de professores no servidor
     */
    useEffect(() => {
        const fetchProfessores = async () => {
            try {
                const professor = await ProfessoresRequests.listarProfessor();
                setProfessores(professor);
            } catch (error) {
                console.error('Erro ao buscar professores: ', error);
            }
        };

        if (show) {
            fetchProfessores();
        }
    }, [show]);

    /**
     * Controla o valor para filtrar os professores por parte do nome
     */
    const filtroProfessores = termoPesquisa
        ? professores.filter((professor) =>
            professor.nome.toLowerCase().includes(termoPesquisa.toLowerCase()))
        : professores;

    /**
    * Limpa o valor do filtro digitado pelo usuário
    */
    const limpaFiltro = () => {
        setTermoPesquisa('');
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{ backgroundColor: '#343A40', color: '#FFFFFF' }}>
                <Modal.Title>Lista de professores</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#343A40', color: '#FFFFFF' }}>
                <input
                    type="text"
                    placeholder="Buscar professor..."
                    className="form-control mb-3"
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                />

                {professores.length > 0 ? ( 
                    <table className="table table-striped">
                        <tbody>
                            {filtroProfessores.map((professor) => (
                                <tr key={professor.idProfessor}>
                                    <td hidden>{professor.idProfessor}</td>
                                    <td>{professor.nome}</td>
                                    <td>
                                        <Button
                                            style={{ backgroundColor: 'var(--cinzaAzulado)', color: 'var(--branco)', border: 'solid var(--amareloClaro)'  }}
                                            onClick={() => {onSelectProfessor(professor), limpaFiltro()}}
                                        >
                                            Selecionar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Carregando professores...</p>
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

export default ProfessorModal;
