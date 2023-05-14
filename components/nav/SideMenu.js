import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Logo = styled.a`
  color: black;
  margin: 0;
  text-decoration: none;
  font-size: 2rem;
  padding-top: 1rem;
  font-family: 'Times New Roman', Times, serif;
`;

const SideMenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 20vw;
  height: 100%;
  z-index: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  opacity: 0.9;
`;

const MenuItem = styled.li`
  padding: 1rem;
  border-bottom: 1px solid #333;
  &:first-child {
    border-top: 1px solid #333;
  }
`;

const MenuLink = styled.a`
  color: black;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;

  &:hover {
    color: #ccc;
  }
`;

const MenuList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  flex-direction: column;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SideMenu = () => {
  return (
    <Container>
      <SideMenuContainer>
        <Logo href="/">William Seddon-Quigley</Logo>
        <MenuList>
          <MenuItem>
            <MenuLink href="/">Home</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink href="/collections">Collections</MenuLink>
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
