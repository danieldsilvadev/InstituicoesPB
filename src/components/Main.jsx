import { Container, Image } from 'react-bootstrap';
import PropriedadesCard from './PropriedadesCard';

const Main = () => {
  return (
    <main>
      <Image src="https://templates.loguei.com/inst03curs/wp-content/uploads/2023/10/87047a82f1ae7036a8e27deff9965630.png" fluid />;
      <h2 style={{marginBottom: '25px'}} className='d-flex justify-content-center'>Novidades</h2>
      <Container fluid className="mt-2">
        {/* Propriedades */}
        <PropriedadesCard />
      </Container>
    </main>
  );
};

export default Main;
