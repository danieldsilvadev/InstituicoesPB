import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { toast } from 'react-toastify';
import useInstituicao from '../context/InstituicaoContext';

const InstituicoesTable = () => {
  let { instituicoes, setInstituicoes } = useInstituicao();
  const [paginaAtual, setPaginaAtual] = useState(1);

  const itemsPorPag = 20;
  const pagParaVer = 10;

  const getInstituicoes = (event) => {
    fetch('http://localhost:3000/instituicoes')
      .then((response) => response.json())
      .then((data) => {
        setInstituicoes([...data]);
      })
      .catch((error) => {
        console.log('Deu erro!');
      });
  };

  useEffect(getInstituicoes, []);


  const handleDelete = (id) => {
    fetch(`http://localhost:3000/instituicoes/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao excluir o item');
        }
        return response.text(); // DELETE geralmente não retorna JSON
      })
      .then(() => {
        toast.success(`Instituição com ID ${id} excluída com sucesso!`);
        
        // Atualiza a tabela removendo a instituição da lista
        setInstituicoes((prevInstituicoes) => prevInstituicoes.filter((item) => item.id !== id));
      })
      .catch((error) => {
        toast.error(`Erro ao excluir a instituição: ${error.message}`);
      });
  };
  


  const totalPaginas = Math.ceil(instituicoes.length / itemsPorPag);
  const iFinal = paginaAtual * itemsPorPag;
  const iPrimeiro = iFinal - itemsPorPag;
  const itemAtual = instituicoes.slice(iPrimeiro, iFinal);

  const paginas = (pagNum) => setPaginaAtual(pagNum);

  const primeiraPag = Math.max(1, paginaAtual - Math.floor(pagParaVer / 2));
  const ultimaPag = Math.min(totalPaginas, primeiraPag + pagParaVer - 1);

  return (
    <>
      <MDBTable hover style={{ textAlign: 'center' }}>
        <MDBTableHead>
          <tr>
            <th scope="col">Região</th>
            <th scope="col">Estado</th>
            <th scope="col">Município</th>
            <th scope="col">MesoRegião</th>
            <th scope="col">MicroRegião</th>
            <th scope="col">Instituição</th>
            <th scope="col">Matrículas</th>
            <th scope="col">Ações</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody style={{ fontSize: '11px', fontWeight: 'lighter' }}>
          {itemAtual.map((instituicoes, i) => (
            <tr key={i}>
              <td>{instituicoes.NO_REGIAO}</td>
              <td>{instituicoes.SG_UF}</td>
              <td>{instituicoes.NO_MUNICIPIO}</td>
              <td>{instituicoes.NO_MESORREGIAO}</td>
              <td>{instituicoes.NO_MICRORREGIAO}</td>
              <td>{instituicoes.NO_ENTIDADE}</td>
              <td>{instituicoes.QT_MAT_BAS}</td>
              <td>
                <MDBBtn floating tag="a" className="mx-2">
                  <MDBIcon fas icon="pen" />
                </MDBBtn>
                <MDBBtn floating tag="a" className="mx-2" color="danger" onClick={() => handleDelete(instituicoes.id)}>
                  <MDBIcon fas icon="trash-alt" />
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <Pagination className="d-flex justify-content-center mt-3">
        <Pagination.Prev onClick={() => paginas(paginaAtual - 1)} disabled={paginaAtual === 1} />

        {primeiraPag > 1 && (
          <>
            <Pagination.Item onClick={() => paginas(1)}>1</Pagination.Item>
            {primeiraPag > 2 && <Pagination.Ellipsis />}
          </>
        )}

        {Array.from({ length: ultimaPag - primeiraPag + 1 }, (_, i) => primeiraPag + i).map((page) => (
          <Pagination.Item key={page} active={page === paginaAtual} onClick={() => paginas(page)}>
            {page}
          </Pagination.Item>
        ))}

        {ultimaPag < totalPaginas && (
          <>
            {ultimaPag < totalPaginas - 1 && <Pagination.Ellipsis />}
            <Pagination.Item onClick={() => paginas(totalPaginas)}>{totalPaginas}</Pagination.Item>
          </>
        )}

        <Pagination.Next onClick={() => paginas(paginaAtual + 1)} disabled={paginaAtual === totalPaginas} />
      </Pagination>

    </>
  );
};

export default InstituicoesTable;
