import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MainPage from "./components/Mainpage";
import Tasks from "./pages/Tasks";
import Category from "./pages/Category";
import "./index.css";


const App = () => (
  
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home/*" element={<MainPage />} />
        <Route path="/home/tasks" element={<Tasks />} />  
        <Route path="/home/category" element={<Category />} />  
      </Routes>
    </Router>
 
);

export default App;
