import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/argentBankLogo.png';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
`;

const NavLinkLogo = styled(Link)`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #2c3e50;
`;

const NavLinkItem = styled(Link)`
  text-decoration: none;
  margin-right: 0.5rem;
  font-weight: bold;
  color: #2c3e50;

  &:hover {
    text-decoration: underline;
  }

  &:active {
    color: #42b983;
  }
`;

const Image = styled.img`
  max-width: 100%;
  width: 200px;
`;

const Title = styled.h1`
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important; /* 2 */
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important; /* 3 */
`;

const Icon = styled.i`
  margin-right: 0.5rem;
`;

export const NavigationBar = () => {
  return (
    <Nav>
      <NavLinkLogo to="/">
        <Image src={logo} alt="logo Argent Bank"></Image>
        <Title>Argent Bank</Title>
      </NavLinkLogo>
      <NavLinkItem to="/sign-in">
        <Icon className="fa fa-user-circle" />
        Sign In
      </NavLinkItem>
    </Nav>
  );
};
