import { Carousel } from 'react-bootstrap';

const InstituicaoCarrosel = () => {
  return (
    <Carousel>
    <Carousel.Item interval={1000}>
     <img src="https://templates.loguei.com/inst03curs/wp-content/uploads/2023/10/87047a82f1ae7036a8e27deff9965630.png" className="d-block w-100" alt="" style={{height: "527px"}} />
      <Carousel.Caption>
        <h3>Palestras de física</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={500}>
      <img src="https://www.estadao.com.br/resizer/v2/WKIK6RLMDNH5TAYANXVJBGFXQA.jpeg?quality=80&auth=71c1d86fe53f200cf786058c70aa7f2bf12b41ddac6132260faa511875cb5dd8&width=1075&height=527&focal=781,559" className="d-block w-100" alt="" style={{height: "527px"}} />
      <Carousel.Caption>
        <h3>Aulas de Culinaria</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
     <img src="https://www.estadao.com.br/resizer/v2/2FUAOFIF5JF4FLUFADTDGAOWCI.jpg?quality=80&auth=44b69a8aed03360a267f5bbde77731db439217891c3abf0acc48b1a95252cac5&width=1075&height=527&focal=726,507" className="d-block w-100" alt="" style={{height: "527px"}} />
      <Carousel.Caption>
        <h3>Novas Estruturas</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  );
};

export default InstituicaoCarrosel;
