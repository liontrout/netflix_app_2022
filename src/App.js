import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
import MainPage from "./routes/MainPage";
import DetailPage from "./routes/DetailPage";
import SearchPage from "./routes/SearchPage";
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
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>  
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
