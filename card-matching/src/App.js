// import logo from './logo.svg';
import './App.css';
import './style.css';
import Main from "./component/Main";
import CardList from "./component/CardList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameOver from './component/GameOver';
import Result from './component/Result';


function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Main/>}/>
        <Route path ="/card" element={<CardList/>}/>
        <Route path ="/gameover" element={<GameOver/>}/>
        <Route path ="/result" element={<Result/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
