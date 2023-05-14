import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Turn as Hamburger } from 'hamburger-react';

const Container = styled.div`
  position: relative;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  pointer-events: ${({ isOpen }) => (isOpen ? 'none' : 'auto')};

  .hamburger-menu {
    pointer-events: auto;
    padding-right: 2rem; 
  }
`;


const Logo = styled.a`
  color: black;
  margin: 0;
  text-decoration: none;
  font-size: 1.5rem;
  font-family: 'Times New Roman', Times, serif;
  pointer-events: auto;
`;

const SideMenuContainer = styled.nav`
  position: fixed;
  top: 0;
  right: -250px;
  width: 250px;
  background-color: #1e1e1e;
  overflow: auto;
  transition: all 0.3s;
  z-index: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  opacity: 0.9;

  &.open {
    right: 0;
  }

  &.close {
    right: -250px;
  }
`;

const MenuItem = styled.li`
  padding: 1rem ;
  border-bottom: 1px solid #333;

  &:first-child {
    border-top: 1px solid #333;
  }
`;

const MenuLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;

  &:hover {
    color: #ccc;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  font-family: 'Times New Roman', Times, serif;
`;


const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sideMenuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (isOpen && !sideMenuRef.current.contains(event.target) && event.target.getAttribute('class') !== 'hamburger-react') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Container>
      <Header isOpen={isOpen}>
        <Logo href="/">William Seddon-Quigley</Logo>
        <div className="hamburger-menu">
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            color={isOpen ? 'white' : 'black'}
            size={24}
          />
        </div>
      </Header>
      <SideMenuContainer ref={sideMenuRef} className={isOpen ? 'open' : 'close'}>
        <MenuList>
          <MenuItem>
            <MenuLink href="/">Home</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/about">About Me</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/contact">Contact</MenuLink>
          </MenuItem>
        </MenuList>
      </SideMenuContainer>
    </Container>
  );
};

export default SideMenu;
