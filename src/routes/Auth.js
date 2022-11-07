import React from 'react'
import AuthForm from '../components/AuthForm';
import Footer from '../components/Footer';
import '../styles/Auth.css';

function Auth() {
  return (
    <>
      <div className='authContainer'>
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
            alt="Netflix logo"
            className='nav__logo'
          />
        </div>
        <AuthForm />
      </div>
      <Footer />
    </>
  )
}

export default Auth;