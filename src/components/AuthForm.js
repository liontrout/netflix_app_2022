import React, { useState } from 'react';
import { authService } from "../fbase";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = e => {
    // console.log(e.target.name);
    const {target: {name, value}} = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create newAccount
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        // login
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      // console.log(data); 회원가입을 마친 사용자 정보
    } catch (error) {
      // console.log(error);
      setError(error.message);
    }
  }

  const onSocialClick = (e) => {
    // console.log(e.target.name);
    const {target: {name}} = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();      
    }
    const data = signInWithPopup(authService, provider);
    // console.log(data);
  }

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div className='loginForm'>
      <form onSubmit={onSubmit} className='container'>
        <legend className='containerName'>로그인</legend>
        <input
          type="email"
          placeholder="이메일"
          required
          name="email"
          value={email}
          onChange={onChange}
          className='authInput'
        />
        <input
          type="password"
          placeholder="비밀번호"
          required
          name="password"
          value={password}
          onChange={onChange}
          className='authInput'
        />
        <input
          type="submit"
          value={
            newAccount ? "회원가입" : "로그인"
          }
          className='authInput authSubmit'
        />
        {error &&
          <span className='authError'>{error}</span>
        }
      </form>
      <span onClick={toggleAccount} className='authSwitch'>{newAccount ? "로그인" : "회원가입"}</span>
      <div className='authBtns'>
        <button onClick={onSocialClick} name="google" className='authBtn'>
          구글 계정으로 로그인 <i class="fa-brands fa-google"></i>
        </button>
      </div>
    </div>
  )
}

export default AuthForm;