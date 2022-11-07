import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from "../fbase";
import '../styles/Nav.css';

function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // console.log("window.scrollY", window.scrollY);
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    }
  }, []);
  
  const onChange = e => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
    if (e.target.value === "") {
      navigate("/");
    }
  };

  const enter = e => {
    if (window.event.keyCode === 13) {
      navigate(`/search?q=${e.target.value}`);
    }
  }

  const OnLogOutClick = () => {
    const ok = window.confirm("로그아웃 하시겠습니까?");
    if (ok) {
      authService.signOut();
      navigate('/');
      window.location.reload();
    }
  }

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
        alt="Netflix logo"
        className='nav__logo'
        onClick={() => {
          // navigate("/");
          // window.location.reload();
          window.location.href = "/netflix_app_2022"
        }}
      />
      <input
        type="search"
        value={searchValue}
        onChange={onChange}
        onKeyUp={enter}
        placeholder="영화를 검색해주세요."
        className="nav__input"
      />
      <img
        src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
        alt="user logged"
        className='nav__avatar'
        onClick={OnLogOutClick}
      />
    </nav>
  )
}

export default Nav;