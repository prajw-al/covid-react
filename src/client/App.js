import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Details from "./IndiaPage/details.js";
import DetailedOverView from "./WorldPage/detailedOverView.js";
import About from "./common/about";
class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<DetailedOverView/>} />
          <Route path="/world" element={<DetailedOverView/>} />
        {/* <Route path="/india" element={<Details/>} /> */}
          <Route path="/about" element={<About/>} />
        </Routes>
      </Router>
    );
  }
}
export default App;
