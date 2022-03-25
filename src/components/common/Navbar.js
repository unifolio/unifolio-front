import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

const Navbar = () => {
  const { page } = useParams();
  const isLogin = () => {
    const accessToken = localStorage.getItem("unifolioAccess");
    if (!accessToken) return false;
    return true;
  };
  const signout = () => {
    localStorage.removeItem("unifolioAccess");
    window.location.href = "/";
  };

  return (
    <>
      <NavbarPosition className="Navbar">
        <NavbarLayout>
          <div className="header-left">
            <Link to="/" className="button landing">
              <img src={Logo} alt="logo" />
            </Link>
            <Link to="/finding" className="button home">
              조합 참여
            </Link>
            <Link to="/union/my-unions-manage" className="button manage">
              조합 관리
            </Link>
            <Link to="/union/new" className="button create">
              조합 만들기
            </Link>
          </div>
          <div className="header-right">
            <Link to="/profile" className="button my">
              마이페이지
            </Link>
            {isLogin() ? (
              <span className="button signout" onClick={signout}>
                로그아웃
              </span>
            ) : (
              <Link to="/signin" className="button signin">
                로그인
              </Link>
            )}
          </div>
        </NavbarLayout>
      </NavbarPosition>
      <Spacer />
    </>
  );
};

const NavbarPosition = styled.div`
  position: fixed;
  width: 100%;
  height: 4rem;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f2f2f2;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const NavbarLayout = styled.div`
  height: 100%;
  padding-left: 1rem;
  padding-right: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  @media (max-width: 1440px) {
    width: 100%;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
  }

  .header-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .button {
      margin-left: 1rem;
      color: #4e4e4e;
      cursor: pointer;
    }
  }

  .header-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .button {
      margin-left: 1rem;
      color: #4e4e4e;
      cursor: pointer;
    }
  }
`;

export default Navbar;
