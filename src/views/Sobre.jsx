import { Container, Row, Col, Card } from 'react-bootstrap';
const Sobre = () => {
  return (
    <>
      <Container className="my-5 d-flex justify-content-center">
        <Row>
          <Col>
            <Card className="p-4 text-center" style={{ boxShadow: "none" }}>
              <Card.Body>
                <Card.Title className="mb-3">Sobre o Educa Brasil</Card.Title>
                <Card.Text>
                  O Educa Brasil é um portal dedicado à educação, oferecendo recursos, conteúdos e oportunidades para alunos e educadores. Nossa missão é facilitar o aprendizado e promover o conhecimento para todos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Container>
    </>
  );
};

export default Sobre;
