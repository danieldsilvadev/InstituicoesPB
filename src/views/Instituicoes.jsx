import { MDBInput, MDBTooltip } from 'mdb-react-ui-kit';
import InstituicoesTable from '../components/InstituicoesTable';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Formik } from 'formik';
import useInstituicao from '../context/InstituicaoContext';
import { useState } from 'react';

const Instituicoes = () => {
  const {
    instituicoes,
    setInstituicoes,
    validationSchema,
  } = useInstituicao();

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const handleSubmit = (values) => {
    fetch('http://localhost:3000/instituicoes', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Propriedade cadastrada com sucesso!');
          setInstituicoes([...instituicoes, values]);
          setShow(false);
        } else {
          throw new Error('Erro ao cadastrar instituição');
        }
      })
      .catch(() => {
        toast.error('Problema no envio dos dados da propriedade!');
      })

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

      <InstituicoesTable />

      <Modal show={show} onHide={handleShow} size="lg" aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Cadastrar</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            NO_REGIAO: '',
            SG_UF: '',
            NO_MUNICIPIO: '',
            NO_MESORREGIAO: '',
            NO_MICRORREGIAO: '',
            NO_ENTIDADE: '',
            QT_MAT_BAS: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                {[
                  { label: 'Região', name: 'NO_REGIAO' },
                  { label: 'Estado', name: 'SG_UF' },
                  { label: 'Município', name: 'NO_MUNICIPIO' },
                  { label: 'MesoRegião', name: 'NO_MESORREGIAO' },
                  { label: 'MicroRegião', name: 'NO_MICRORREGIAO' },
                  { label: 'Instituição', name: 'NO_ENTIDADE' },
                  { label: 'Matrícula', name: 'QT_MAT_BAS' },
                ].map(({ label, name }) => (
                  <Form.Group className="mb-3" key={name}>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control type="text" name={name} onChange={handleChange} value={values[name]} />
                    {errors[name] && touched[name] && <div style={{ color: 'red' }}>{errors[name]}</div>}
                  </Form.Group>
                ))}
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
          )}
        </Formik>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Instituicoes;
