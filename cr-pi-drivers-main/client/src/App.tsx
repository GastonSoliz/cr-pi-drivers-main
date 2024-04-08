import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import Home from "./views/Home/Home";
import Form from "./views/Form/Form";
import Detail from "./views/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import Edit from "./views/Edit/Edit";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
