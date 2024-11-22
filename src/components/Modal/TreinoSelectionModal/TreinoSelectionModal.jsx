import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

function TreinoSelectionModal({ show, treinos, onSelect, onClose }) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton style={{ backgroundColor: '#343A40', color: '#FFFFFF' }}>
                <Modal.Title>Selecione um Treino</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#343A40', color: '#FFFFFF' }}>
                <ListGroup>
                    {treinos.map((treino, index) => (
                        <ListGroup.Item 
                            key={treino.id_treino} 
                            action 
                            onClick={() => onSelect(treino)}
                        >
                            {`Treino ${index + 1} - Professor: ${treino.professor.nome_professor}`}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#343A40', color: '#FFFFFF' }}>
                <Button variant="secondary" onClick={onClose}>
                    
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TreinoSelectionModal;