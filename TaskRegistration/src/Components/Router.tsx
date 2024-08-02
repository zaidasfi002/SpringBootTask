import { Route, Routes } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import Home from "./Home";

const Router: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegistrationForm />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </>
  );
};

export default Router;
