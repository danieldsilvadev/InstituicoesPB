import { MDBInput, MDBTooltip } from 'mdb-react-ui-kit';
import PropriedadesTable from '../components/PropriedadesTable';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';

const Propriedades = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const [propriedadesDelete, setPropriedadesDelete] = useState([]);

  // Estado inicial com nomes corretos
  const [inputs, setInputs] = useState({
    NO_REGIAO: '',
    SG_UF: '',
    NO_MUNICIPIO: '',
    NO_MESORREGIAO: '',
    NO_MICRORREGIAO: '',
    NO_ENTIDADE: '',
    QT_MAT_BAS: '',
  });

  const handleChange = (event) => {
  const { name, value } = event.target;

  setInputs((prevState) => ({
    ...prevState,
    [name]: name === "QT_MAT_BAS" ? parseFloat(value) || "" : value
  }));
};


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Enviando dados:', inputs);

    fetch('http://localhost:3000/instituicoes', { 
      method: 'POST',
      mode: 'cors', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(inputs)
    })
    .then((response) => response.json())
    .then((novoItem) => {
      console.log('Cadastro realizado:', novoItem);

      // Fechar o modal apenas se o POST for bem-sucedido
      setShow(false);
    })
    .catch((error) => {
      console.error('Erro ao enviar os dados:', error);
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/instituicoes/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao excluir o item');
        }
        return response.json();
      })
      .then(() => {
        console.log(`Instituição com ID ${id} excluída com sucesso!`);

        // Atualizar a lista após a exclusão
        setPropriedadesDelete((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao excluir a instituição:', error);
      });
  };

  return (
    <>
      <div style={{ margin: '25px 15px' }}>
        <Row className='justify-content-between'>
          <Col className='col-auto'>
            <MDBInput label="Buscar" id="formControlSm" type="text" size="lg" style={{ width: '25rem' }} />
          </Col>
          <Col className='col-auto'>
            <MDBTooltip tag="span" wrapperClass="d-inline-block" title="Adicionar Propriedade">
              <Button style={{ marginLeft: 'auto' }} onClick={handleShow}>+</Button>
            </MDBTooltip>
          </Col>
        </Row>
      </div>

      <PropriedadesTable  propriedades={propriedadesDelete} handleDelete={handleDelete} />

      <Modal show={show} onHide={handleShow} size="lg" aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Cadastrar</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Região</Form.Label>
              <Form.Control type="text" name="NO_REGIAO" value={inputs.NO_REGIAO} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control type="text" name="SG_UF" value={inputs.SG_UF} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Município</Form.Label>
              <Form.Control type="text" name="NO_MUNICIPIO" value={inputs.NO_MUNICIPIO} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>MesoRegião</Form.Label>
              <Form.Control type="text" name="NO_MESORREGIAO" value={inputs.NO_MESORREGIAO} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>MicroRegião</Form.Label>
              <Form.Control type="text" name="NO_MICRORREGIAO" value={inputs.NO_MICRORREGIAO} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Instituição</Form.Label>
              <Form.Control type="text" name="NO_ENTIDADE" value={inputs.NO_ENTIDADE} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Matrícula</Form.Label>
              <Form.Control type="text" name="QT_MAT_BAS" value={inputs.QT_MAT_BAS} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow}>
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Propriedades;
