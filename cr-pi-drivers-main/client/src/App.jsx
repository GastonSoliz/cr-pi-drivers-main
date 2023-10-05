import { useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import Home from "./views/Home/Home";
import Form from "./views/Form/Form";
import Detail from "./views/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import { useDispatch } from "react-redux";

function App() {
  const [drivers, setDrivers] = useState([]);

  const dispatch = useDispatch();
  // const [currentPage, setCurrentPage] = useState(1);
  // const driversPerPage = 3;

  // const startIndex = (currentPage - 1) * driversPerPage;
  // const endIndex = startIndex + driversPerPage;

  // const currentDrivers = drivers.slice(startIndex, endIndex);
  // const totalPages = Math.ceil(drivers.length / driversPerPage);

  // function pageHandler(pageNumber) {
  //   setCurrentPage = pageNumber;
  // }

  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
