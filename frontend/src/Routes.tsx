import { Route, Routes } from "react-router-dom";
import Friend from "./pages/Friend";
import Home from "./pages/Home";

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Friend />} />
    </Routes>
  );
};

export default RoutesContainer;
