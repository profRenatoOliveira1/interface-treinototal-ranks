import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AlunoRequests from '../../../fetch/AlunoRequests';

/**
 * Componente responsável por montar o modal do aluno
 * @returns web component
 */
function AlunoModal({ show, handleClose, onSelectAluno }) {
    /**
     * Define o estado inicial do formulário com todos os campos vazios
     */
    const [alunos, setAlunos] = useState([]);

    /**
     * Define o estado inicial para o formulário de pesquisa
     */
    const [termoPesquisa, setTermoPesquisa] = useState('');

    /**
     * Busca lista de alunos no servidor
     */
    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const aluno = await AlunoRequests.listarAlunos();
                setAlunos(aluno);
            } catch (error) {
                console.error('Erro ao buscar alunos: ', error);
            }
        };

        if (show) {
            fetchAlunos();
        }
    }, [show]);

    /**
     * Controla o valor para filtrar os alunos por parte do nome, ou pela matrícula
     */
    const filtroAlunos = termoPesquisa 
        ? alunos.filter((aluno) => 
            aluno.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
            aluno.matricula.toString().includes(termoPesquisa)) 
        : alunos;
    
    /**
    * Limpa o valor do filtro digitado pelo usuário
    */
    const limpaFiltro = () => {
        setTermoPesquisa('');
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{ backgroundColor: '#343A40', color: '#FFFFFF' }}>
                <Modal.Title>Lista de alunos</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#343A40', color: '#FFFFFF' }}>
                <input
                    type="text"
                    placeholder="Buscar aluno..."
                    className="form-control mb-3"
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                />

                {alunos.length > 0 ? (
                    <table className="table table-striped">
                        <tbody>
                            {filtroAlunos.map((aluno) => (
                                <tr key={aluno.id_aluno}>
                                    <td hidden>{aluno.id_aluno}</td>
                                    <td>{aluno.matricula}</td>
                                    <td>{aluno.nome}</td>
                                    <td>
                                        <Button
                                            style={{ backgroundColor: 'var(--cinzaAzulado)', color: 'var(--branco)', border: 'solid var(--amareloClaro)'  }}
                                            onClick={() => {onSelectAluno(aluno), limpaFiltro()}}
                                        >
                                            Selecionar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Carregando alunos...</p>
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

export default AlunoModal;
