//pages//
import AddTask from "./components/pages/AddTask";
import AllTasks from "./components/pages/AllTasks";

//layouts
import NavBar from "./components/layouts/NavBar";
import Footer from "./components/layouts/Footer";


import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'


function App() {
  return (
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<AllTasks />} />
          <Route path="/addTask" element={<AddTask />} />
        </Routes>
        
      </Router>
  );
}

export default App;
