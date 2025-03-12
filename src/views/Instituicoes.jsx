import { MDBInput, MDBTooltip } from 'mdb-react-ui-kit';
import InstituicoesTable from '../components/InstituicoesTable';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from "yup";


const Instituicoes = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const validationSchema = Yup.object({
    NO_REGIAO: Yup.string().matches(/^[A-Za-zÀ-ÿ\s]+$/, "Apenas letras").required("Região é obrigatória"),
    SG_UF: Yup.string().matches(/^[A-Za-z]{2}$/, "UF deve ter 2 letras").required("Estado é obrigatório"),
    NO_MESORREGIAO: Yup.string().required("Mesorregião é obrigatória"),
    NO_MICRORREGIAO: Yup.string().required("Microrregião é obrigatória"),
    NO_MUNICIPIO: Yup.string().matches(/^[A-Za-zÀ-ÿ\s]+$/, "Apenas letras").required("Município é obrigatório"),
    NO_ENTIDADE: Yup.string().matches(/^[A-Za-zÀ-ÿ\s]+$/, "Apenas letras").required("Instituição é obrigatória"),
    QT_MAT_BAS: Yup.number().typeError("Deve ser um número").positive("Deve ser positivo").required("Obrigatório"),
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Aguarda a validação do schema antes de enviar
      await validationSchema.validate(inputs, { abortEarly: false });
  
      console.log("Enviando dados:", inputs);
  
      fetch("http://localhost:3000/instituicoes", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })
        .then((response) => response.json())
        .then(() => {
          toast.success("Instituição cadastrada com sucesso")
          setShow(false);
          setInputs({ NO_REGIAO: "", SG_UF: "", NO_MUNICIPIO: "", NO_MESORREGIAO: "", NO_MICRORREGIAO: "", NO_ENTIDADE: "", QT_MAT_BAS: "" });
          setErrors({});
        })
        .catch((error) => {
          toast.error("Erro ao enviar os dados:", error);
        });
  
    } catch (error) {
      const novosErros = {};
      error.inner.forEach(err => {
        novosErros[err.path] = err.message;
      });
  
      setErrors(novosErros);
    }
  };
  
  const [errors, setErrors] = useState({});

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
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Região</Form.Label>
              <Form.Control type="text" name="NO_REGIAO" value={inputs.NO_REGIAO} onChange={handleChange} placeholder={errors.NO_REGIAO || "Digite a região"} 
    style={{ borderColor: errors.NO_REGIAO ? "red" : "" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control type="text" name="SG_UF" value={inputs.SG_UF} onChange={handleChange} placeholder={errors.SG_UF || "Digite o estado"} 
    style={{ borderColor: errors.SG_UF ? "red" : "" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Município</Form.Label>
              <Form.Control type="text" name="NO_MUNICIPIO" value={inputs.NO_MUNICIPIO} onChange={handleChange} placeholder={errors.NO_MUNICIPIO || "Digite o município"} 
    style={{ borderColor: errors.NO_MUNICIPIO ? "red" : "" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>MesoRegião</Form.Label>
              <Form.Control type="text" name="NO_MESORREGIAO" value={inputs.NO_MESORREGIAO} onChange={handleChange} placeholder={errors.NO_MESORREGIAO || "Digite a mesoregião"} 
    style={{ borderColor: errors.NO_MESORREGIAO ? "red" : "" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>MicroRegião</Form.Label>
              <Form.Control type="text" name="NO_MICRORREGIAO" value={inputs.NO_MICRORREGIAO} onChange={handleChange} placeholder={errors.NO_MICRORREGIAO || "Digite a microregião"} 
    style={{ borderColor: errors.NO_MICRORREGIAO ? "red" : "" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Instituição</Form.Label>
              <Form.Control type="text" name="NO_ENTIDADE" value={inputs.NO_ENTIDADE} onChange={handleChange} placeholder={errors.NO_ENTIDADE || "Digite a instituição"} 
    style={{ borderColor: errors.NO_ENTIDADE ? "red" : "" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Matrícula</Form.Label>
              <Form.Control type="text" name="QT_MAT_BAS" value={inputs.QT_MAT_BAS} onChange={handleChange} placeholder={errors.QT_MAT_BAS || "Digite o num de matrículas"} 
    style={{ borderColor: errors.QT_MAT_BAS ? "red" : "" }} />
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
      <ToastContainer />
    </>
  );
};

export default Instituicoes;
