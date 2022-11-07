import { useState, useEffect } from "react";
import { authService } from "./fbase";
import { onAuthStateChanged } from "firebase/auth";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
import MainPage from "./routes/MainPage";
import DetailPage from "./routes/DetailPage";
import SearchPage from "./routes/SearchPage";
import Auth from "./routes/Auth";
import "./styles/App.css";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      // console.log(user);
      if (user) {
        // signed in
        setIsLoggedIn(user);
        setUserObj(user);
        // const uid = user.uid;
      } else {
        // signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <div className="app">
          <Routes>
            {isLoggedIn ? (
              <Route path="/" element={<Layout userObj={userObj} />}>
                <Route index element={<MainPage userObj={userObj} />} />
                <Route path=":movieId" element={<DetailPage userObj={userObj} />} />
                <Route path="search" element={<SearchPage userObj={userObj} />} />
              </Route>
            ) : (
              <Route path='/' element={<Auth />} />
            )}
          </Routes>
        </div>
      ) : "initializing..."}
    </>
  );
}

export default App;
