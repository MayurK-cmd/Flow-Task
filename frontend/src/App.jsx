import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MainPage from "./components/Mainpage";
import "./index.css";


const App = () => (
  
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<MainPage />} />
      </Routes>
    </Router>
 
);

export default App;
