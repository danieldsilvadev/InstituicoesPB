import { Row } from 'react-bootstrap';
import InstituicaoCard from './InstituicaoCard';
import propriedades from '../datasets/propriedades';

const InstituicoesCard = () => {
  let propriedadesData = [...propriedades];
  return (
    <>
      <Row>
        {propriedadesData.map(({ imagem, nome, descricao }, indice) => {
          return (
            <InstituicaoCard
              key={indice}
              imagem={imagem}
              nome={nome}
              descricao={descricao}
            />
          );
        })}
      </Row>
    </>
  );
};

export default InstituicoesCard;
