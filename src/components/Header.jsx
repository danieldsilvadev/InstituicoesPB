import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';
import { useState } from 'react';

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const brandStyle = {
    fontSize: "1.8rem",
    fontWeight: "bold",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "1.5px",
    background: "linear-gradient(90deg, #FFD700 0%, #004D40 50%, #1E3A8A 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  };

  return (
    <header>
      <MDBNavbar expand="lg " light bgColor="light" className='d-flex justify-content-around'>
        <MDBContainer fluid>
          <MDBNavbarBrand href="/" style={brandStyle}>EducaBrasil</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenNav(!openNav)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar open={openNav}>
            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink href="/">Home</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/instituicoes">Instituições</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/sobre">Sobre</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>

          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
};

export default Header;
