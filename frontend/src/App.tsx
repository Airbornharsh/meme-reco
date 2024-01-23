import { BrowserRouter } from "react-router-dom";
import RoutesContainer from "./Routes";

const App = () => {
  return (
    <BrowserRouter>
      <RoutesContainer />
    </BrowserRouter>
  );
};

export default App;
