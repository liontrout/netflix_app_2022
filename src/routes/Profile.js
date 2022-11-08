import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from "../fbase";
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile({userObj}) {
  const navigate = useNavigate();

  const OnLogOutClick = () => {
    const ok = window.confirm("로그아웃 하시겠습니까?");
    if (ok) {
      authService.signOut();
      navigate('/');
    }
  }

  return (
    <>
      <div className="profile">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
          alt="Netflix logo"
          className='profile__logo'
          onClick={() => {window.location.href = "/netflix_app_2022"}}
        />
        <div className='profileForm'>
          <p className="profile__choice"></p>
          <div
            onClick={() => {navigate("/")}}
            className="profile__avatar"
          >
            <div className='profile__edge'>
              <img
                src="https://occ-0-993-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                alt="user logged"
                className='profile__img'
              />
            </div>
            <span className='profile__name'>{userObj.displayName}</span>
          </div>
          <button
            onClick={OnLogOutClick}
            className='profile__logout'
          >로그아웃</button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile;