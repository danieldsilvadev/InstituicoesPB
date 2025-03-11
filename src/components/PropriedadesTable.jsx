import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PropriedadesTable = ({propriedadesDelete, handleDelete }) => {
  const [propriedades, setPropriedades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; 
  const pagesToShow = 10; 

  useEffect(() => {
    fetch('http://localhost:3000/instituicoes')
      .then((response) => response.json())
      .then((data) => setPropriedades(data))
      .catch(() => console.log('Erro ao carregar os dados.'));
  }, []);

  
  const totalPaginas = Math.ceil(propriedades.length / itemsPerPage);
  const iFinal = currentPage * itemsPerPage;
  const iPrimeiro = iFinal - itemsPerPage;
  const itemAtual = propriedades.slice(iPrimeiro, iFinal);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Definir o range de páginas a serem exibidas
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPaginas, startPage + pagesToShow - 1);

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
          {itemAtual.map((propriedade, i) => (
            <tr key={i}>
              <td>{propriedade.NO_REGIAO}</td>
              <td>{propriedade.SG_UF}</td>
              <td>{propriedade.NO_MUNICIPIO}</td>
              <td>{propriedade.NO_MESORREGIAO}</td>
              <td>{propriedade.NO_MICRORREGIAO}</td>
              <td>{propriedade.NO_ENTIDADE}</td>
              <td>{propriedade.QT_MAT_BAS}</td>
              <td>
                <MDBBtn floating tag="a" className="mx-2">
                  <MDBIcon fas icon="pen" />
                </MDBBtn>
                <MDBBtn floating tag="a" className="mx-2" color="danger" onClick={() => handleDelete(propriedade.id)}>
                  <MDBIcon fas icon="trash-alt" />
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {/* Paginação estilizada */}
      <Pagination className="d-flex justify-content-center mt-3">
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />

        {startPage > 1 && (
          <>
            <Pagination.Item onClick={() => paginate(1)}>1</Pagination.Item>
            {startPage > 2 && <Pagination.Ellipsis />}
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <Pagination.Item key={page} active={page === currentPage} onClick={() => paginate(page)}>
            {page}
          </Pagination.Item>
        ))}

        {endPage < totalPaginas && (
          <>
            {endPage < totalPaginas - 1 && <Pagination.Ellipsis />}
            <Pagination.Item onClick={() => paginate(totalPaginas)}>{totalPaginas}</Pagination.Item>
          </>
        )}

        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPaginas} />
      </Pagination>
    </>
  );
};

export default PropriedadesTable;
