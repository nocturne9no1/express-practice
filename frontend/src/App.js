import { Main, NewArticle } from "./screen/index.js";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './scss/app.scss';

axios.create({baseURL: "http://localhost:3001/"})

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/new-article" element={<NewArticle />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
