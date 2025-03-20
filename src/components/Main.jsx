import { Carousel, Container } from 'react-bootstrap';
import InstituicoesCard from './InstituicoesCard';
import InstituicaoCarrosel from './InstituicaoCarrosel';

const Main = () => {
  return (
    <main>
      <InstituicaoCarrosel></InstituicaoCarrosel>
      <h2 style={{marginBottom: '25px', marginTop: '10px'}} className='d-flex justify-content-center'>Novidades</h2>
      <Container fluid className="mt-2">
        {/* Propriedades */}
        <InstituicoesCard />
      </Container>
    </main>
  );
};

export default Main;
