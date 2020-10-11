import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive.js';
import { Link } from 'react-router-dom';
import palette from "../../lib/styles/palette.js";

const NavbarPosition = styled.div`
  position:fixed;
  width: 100%;
  height: 4rem;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const NavbarLayout = styled(Responsive)`
  height:100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  background-color: ${palette.blue[0]};

  .logo{
    
  }
  .header-right {
    display: flex;
    justify-content:flex-end;

    .button {
      margin-left: 1rem;
      color: white;
    }
    
  }
`;

const Navbar = () => {
  
  return (
    <>
      <NavbarPosition className="Navbar">
        <NavbarLayout>
          <div className="logo">로고</div>
          <div className="header-right">
            <Link to="/" className="button landing">랜딩</Link>
            <Link to="/home" className="button home">홈</Link>
            <Link to="/my" className="button my">마이페이지</Link>
            <Link to="/signin" className="button signin">로그인</Link>
          </div>
        </NavbarLayout>
      </NavbarPosition>
      <Spacer />
    </>
  );
}

export default Navbar;
