// import logo from './logo.svg';
import './App.css';
import './style.css';
import Main from "./component/Main";
import CardList from "./component/CardList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Main/>}/>
        <Route path ="/card" element={<CardList/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
