import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler
} from 'mdb-react-ui-kit';
import React, { useState } from 'react';

const Header = () => {
  const [showBasic, setShowBasic] = useState(false);
  return (
    <>
      <MDBNavbar expand='lg' light bgColor='primary'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/' className='text-white'>
            <span style={{ marginRight: '10px' }}>
              <MDBIcon fas icon='book-open' />
            </span>
            Contact
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls='navbar'
            aria-expanded='false'
            aria-label='Toggle navigation'
            className='text-white'
            onClick={() => setShowBasic(!showBasic)}>
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink href='/' className='nav-link text-white'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/addUser' className='nav-link text-white'>
                  Criar Usuário
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/about' className='nav-link text-white'>
                  Sobre
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
